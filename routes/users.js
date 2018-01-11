var express = require('express');
const bodyParser = require('body-parser');
var User = require('../database/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
//var flash = require('express-flash');

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.route('/').get(authenticate.verifyUser, function(req, res, next) {
  if(req.user.admin === true){
    User.find({})
    .then((users) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
    }
    else{
      res.statusCode = 403;
      res.setHeader('Content-Type','application/json');
      res.json({status : "You are not allowed!", success : false});
    }
});

router.post('/signup', function(req,res,next){
    let err = 0;
    let user =  User.findOne({ email: req.body.email});
    if(user){
      err = -1;
    }
    if(err < 0){
      return res.json({err, msg:"Email exists"});
    }
    else{
          //register new user
          User.register(new User({username: req.body.username}), req.body.password,
          (err,user) =>{
            if(err){
              res.statusCode = 500;
              res.setHeader('Content-Type','application/json');
              res.json({err : err});
            }
            else{
              if(req.body.firstname){
                user.firstname = req.body.firstname;
              }
              if(req.body.lastname){
                user.lastname = req.body.lastname;
              }
              if(req.body.email){
                user.email = req.body.email;
              }
              user.save((err, user) => {
                  if(err){
                    res.statusCode = 500;
                    res.setHeader('Content-Type','application/json');
                    res.json({err : err, success: false});
                    return;
                  }

                    passport.authenticate('local')(req, res , () =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({ success:true , status : 'Registration Successful!'});
                });
              });

            }
        });
    }
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.status(401).json({
              err: info,
               success: false,
          });
      }
      req.logIn(user, function (err) {
          if (err) {
              return res.status(500).json({
                  err: 'Could not log in user',
                   success: false
              });
          }

          var token = authenticate.getToken({_id : req.user._id});
          res.status(200).json({
              status: 'Login successful!',
              success: true,
              token: token,
              user_id : req.user._id,
              name : req.user.firstname +' '+ req.user.lastname,
              admin: req.user.admin,
              email: req.user.email

          });

      });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
  });

router.post('/forgot', function(req, res, next) {
   async.waterfall([
     function(done) {
       crypto.randomBytes(20, function(err, buf) {
         var token = buf.toString('hex');
         done(err, token);
       });
     },
     function(token, done) {
       User.findOne({ email: req.body.email }, function(err, user) {
         if (!user) {
          //req.flash('error', 'No account with that email address exists.');
           // res.statusCode = 403;
           // res.setHeader('Content-Type','application/json');
           // res.json({error : err , success: false});
           return res.redirect('/forgot');
         }

         user.resetPasswordToken = token;
         user.resetPasswordExpires = Date.now() + 900000; // 15 mins

         user.save(function(err) {
           done(err, token, user);
         });

       });

    },
     function(token, user, done) {
       var smtpTransport = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
           user: 'motorbikeforum@gmail.com',
           pass: 'xxxxxxx'
         }
       });
       var mailOptions = {
         to: user.email,
         from: 'motorbikeforum@gmail.com',
         subject: 'Motorbike Forum Password Reset',
         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
           'https://motorbikeforum.herokuapp.com/reset/' + token + '\n\n' +
           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
       };
       smtpTransport.sendMail(mailOptions, function(err) {
         //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
         res.statusCode = 200;
         res.setHeader('Content-Type','application/json');
         res.json({status:"An e-mail has been sent to " + user.email + "with further instructions." , success: true});
         done(err, 'done');
       });
   }
   ], function(err) {
     if (err) return next(err);
     // res.statusCode = 404;
     // res.setHeader('Content-Type','application/json');
     // res.json({error : err , success: false});
     res.redirect('/forgot');
   });
 });

router.get('/reset/:token', function(req, res) {
   User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
     if (!user) {
       //req.flash('error', 'Password reset token is invalid or has expired.');
       // res.statusCode = 401;
       // res.setHeader('Content-Type','application/json');
       // res.json({ error: 'Password reset token is invalid or has expired.'});
       return res.redirect('/forgot');
     }
      res.render('reset', {token: req.params.token});
   });
 });

var temp_username, temp_password, temp_firstname, temp_lastname, temp_email;

 router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
         // req.flash('error', 'Password reset token is invalid or has expired.');
          res.statusCode = 401;
          res.setHeader('Content-Type','application/json');
          res.json({ error: 'Password reset token is invalid or has expired.'});
          //return res.redirect('back');
        }
        console.log(req.body.password);

        user.setPassword(req.body.password , (err) =>{
                if(!err){
                    //user.save();
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function(err) {
                      req.logIn(user, function(err) {
                        done(err, user);
                      });
                    });

                }
                else {
                       console.log(err);
                   }
        });

      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'motorbikeforum@gmail.com',
          pass: 'xxxxxxx'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'motorbikeforum@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        //req.flash('success', 'Success! Your password has been changed.');
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success : true});
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});
module.exports = router;
