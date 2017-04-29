# ArgoCodeChallenge

To run this project locally, you need to have MongoDB running in the background. Then run the following commands:

##### Install dependencies
```
npm install
```

##### Run Single Page App
```
npm start
```

In order to send emails, sender's username and password in emails.server.controller.js need to be updated.
```
transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "username",
        pass: "password"
    }
});
```
```
var mailOptions = {
    from: 'email',
    to: Email,
    subject: 'Xavier Quote Summary',
    text: result
};
```
script.sh is the script to compute quote metrics from the usage logs.

##### To run script.sh
```
./script.sh
```
