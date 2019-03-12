var LocalStrategy = require('passport-local').Strategy;



module.exports = function (app, passport) {
    const { User } = require('../app/models/user')(app.locals.db);


    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // LOCAL LOGIN =============================================================
    passport.use('local-login', new LocalStrategy({
        
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
        function (req, email, password, done) {
            req.logout();
            if (email)
                email = email.toLowerCase(); 

           
            process.nextTick(function () {
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err){
                        return done(err);
                    }    
                    
                    if (!user){
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }
                    if (!user.validPassword(password)){
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    
                    else {
                        return done(null, user);
                    }
                });
            });

        }));


    // LOCAL SIGNUP ============================================================

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        typeField: 'type',
        passReqToCallback: true 
    },
        function (req, email, password, done) {
            req.logout();
            if (email)
                email = email.toLowerCase(); 

            // 
            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err){
                            return done(err);
                        }
                        if (user) {                //I changed line 73 from req.flash to console.log
                            return done(null, false, console.log('signupMessage', 'That email is already taken.'));
                        } else {
                            var newUser = new User();

                            newUser.local.email = email;
                            newUser.type = req.body.type;
                            newUser.local.password = newUser.generateHash(password);
                            //newUser.firstName = req.body.firstName
                            newUser.save(function (err) {
                                if (err){
                                    return done(err);
                                }
                                console.log(req);
                                return done(null, newUser);
                            });
                        }

                    });
                } else if (!req.user.local.email) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err){
                            return done(err);
                        }
                        if (user) {
                            return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        } else {
                            var user = req.user;
                            user.local.email = email;
                            user.type = req.body.type
                            user.local.password = user.generateHash(password);
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }
                    });
                } else {
                    return done(null, req.user);
                }

            });

        }));

};
