'use strict';


var mongoose = require('mongoose').set('debug', true),
    errorHandler = require('./errors.server.controller'),
    Email = mongoose.model('Email'),
    async = require("async"),
    http = require("http"),
    nodemailer = require("nodemailer");
    // co = require('co');
// mongoose.Promise = require('bluebird');


/*
 * When a person requests for a quote, it is information will be p
 * pushed to the mongoDB database
 */
exports.addToQueue = function(res) {
    var entry = {
        'name': res.data.quote.owner_name,
        'model': res.data.quote.model,
        'price': res.data.annual_premium,
        'created': new Date()
    };
    // First, find the emailAddress in the mongo database.
    // If it is found, update the contents so that it has one more element in the array
    // Else creaet a new array with new content
    Email.findOne({
            emailAddress: res.data.quote.broker_email
        }, function(err, obj) {
            if (!err) {
                if (obj !== null) {
                    var array = obj.emails;
                    array.push(entry);
                    Email.update({
                            emailAddress: res.data.quote.broker_email
                        }, {
                            $set: {
                                emails: array
                            }
                        },
                        function(err, obj) {
                            console.log(obj);
                        });
                } else {
                    var email = new Email({
                        emailAddress: res.data.quote.broker_email,
                        emails: [entry]
                    });
                    email.save(function(err, obj) {
                        console.log(obj);
                    });
                }
            }
        }
    )
}
/*
 * getEmails fetches all the emails in the database.
 * Put all the unique email addresses in listOfEmails
 * Then put contents in a json file with email address attached to it
 */
var getEmails = function() {
    var listOfEmails = [];
    var contents = {};
    return Email.find({}).exec().then(function(emails) {
        emails.forEach(function(email) {
            listOfEmails.push(email.emailAddress);
            contents[email.emailAddress] = email.emails;
        });
        return {
            listOfEmails: listOfEmails,
            contents: contents
        };
    });
}

/*
 * constructContent designs how the body of the email would look like
 */
var constructContent = function(Email) {
    var arrayOfText = [];
    return getEmails().then(function(result) {
        var contents = result.contents,
            body = contents[Email],
            i = 0;
        arrayOfText.push('Xavier Quote Summary:');
        body.forEach(function(item) {
            i++;
            arrayOfText.push(`Quote ${i}: ${item.name}, ${item.model}, ${item.price}, ${item.created}`);
        });
        return arrayOfText.join('\r\n');
    })
}

/*
 * When an email is succesfully sent, the document with that emailAddress will be
 * deleted
 */
var deleteDocument = function(emailAddress) {
    return Email.remove({
        emailAddress: emailAddress
    }).exec().then(function(result) {
        console.log("deleted");
    });
}

exports.sendEmail = function() {

    // Will store email sent successfully.
    var success_email = [];
    // Will store email whose sending is failed.
    var failure_email = [];

    var transporter;

    function massMailer() {
        var self = this;
        transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "username",
                pass: "password"
            }
        });
        self.invokeOperation();
    };

    /* Invoking email sending operation at once */

    massMailer.prototype.invokeOperation = function() {
        var self = this;
        getEmails().then(function(result) {
            var listofemails = result.listOfEmails;
            async.each(listofemails, self.SendEmail, function() {
                console.log(success_email);
                console.log(failure_email);
            });
        });

    }

    /*
     * This function will be called by multiple instance.
     * Each instance will contain one email ID
     * After successfull email operation, it will be pushed in failed or success array.
     */

    massMailer.prototype.SendEmail = function(Email, callback) {
        console.log("Sending email to " + Email);
        var status = false;

        // waterfall will go one after another
        // So first email will be sent
        // Callback will jump us to next function
        // in that we will update DB
        // Once done that instance is done.
        // Once every instance is done final callback will be called.

        async.waterfall([
            function(callback) {
                constructContent(Email).then(function(result) {
                    var mailOptions = {
                        from: 'email',
                        to: Email,
                        subject: 'Xavier Quote Summary',
                        text: result
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error)
                            failure_email.push(Email);
                        } else {
                            status = true;
                            success_email.push(Email);
                            deleteDocument(Email);
                        }
                        callback(null, status, Email);
                    });
                });

            },
            function(statusCode, Email, callback) {
                console.log("Will update DB here for " + Email + " with " + statusCode);
                callback();
            }
        ], function() {
            //When everything is done return back to caller.
            callback();
        });
    }

    new massMailer(); //lets begin
}
