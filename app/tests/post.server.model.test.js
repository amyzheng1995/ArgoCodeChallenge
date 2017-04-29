// 'use strict';
//
// /**
//  * Module dependencies.
//  */
// var should = require('should'),
// 	mongoose = require('mongoose'),
// 	User = mongoose.model('User'),
// 	Post = mongoose.model('Post');
//
// /**
//  * Globals
//  */
// var user, post;
//
// /**
//  * Unit tests
//  */
// describe('Post Model Unit Tests:', function() {
// 	beforeEach(function(done) {
// 		user = new User({
// 			firstName: 'Full',
// 			lastName: 'Name',
// 			displayName: 'Full Name',
// 			email: 'test@test.com',
// 			username: 'username',
// 			password: 'password'
// 		});
//
// 		user.save(function() {
// 			post = new Post({
// 				// Add model fields
// 				// ...
// 			});
//
// 			done();
// 		});
// 	});
//
// 	describe('Method Save', function() {
// 		it('should be able to save without problems', function(done) {
// 			return post.save(function(err) {
// 				should.not.exist(err);
// 				done();
// 			});
// 		});
// 	});
//
// 	afterEach(function(done) {
// 		Post.remove().exec();
// 		User.remove().exec();
//
// 		done();
// 	});
// });

'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post');

/**
 * Unit tests
 */
describe('Post Model', function() {

    describe('Saving', function() {
        it('saves new record', function(done) {
            var Post = new Post({
                name: 'Beverages',
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            Post.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

        it('throws validation error when name is empty', function(done) {
            var Post = new Post({
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            Post.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('name cannot be blank');
                done();
            });
        });

        it('throws validation error when name longer than 15 chars', function(done) {
            var Post = new Post({
                name: 'Grains/Cereals/Chocolates'
            });

            Post.save(function(err, saved) {
                should.exist(err);
                err.errors.name.message.should.equal('name must be 15 chars in length or less');
                done();
            });
        });

        it('throws validation error for duplicate Post name', function(done) {
            var Post = new Post({
                name: 'Beverages'
            });

            Post.save(function(err) {
                should.not.exist(err);

                var duplicate = new Post({
                    name: 'Beverages'
                });

                duplicate.save(function(err) {
                    err.err.indexOf('$name').should.not.equal(-1);
                    err.err.indexOf('duplicate key error').should.not.equal(-1);
                    should.exist(err);
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        // NB this deletes ALL categories (but is run against a test database)
        Post.remove().exec();
        done();
    });
});
