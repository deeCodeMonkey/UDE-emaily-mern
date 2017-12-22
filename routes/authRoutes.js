const passport = require('passport');
const path = require("path");

module.exports = (app) => {

    //GoogleStrategy has internal idenitifier for auth with 'google'
    //forward user to google to authenticate and send scope of access
    app.get('/auth/google',
        passport.authenticate(
            'google',
            {
                //state access to user info
                scope: ['profile', 'email']
            })
    );

    //GoogleStrategy will see there is a code for access
    //returns tokens and scope data from Google
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys')
        }
    );

    app.get("/api/current_user", (req, res) => {
        //res.sendFile(path.join(__dirname, "../index.html"));
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        //logout function from passport, kills cookie
        req.logout();
        res.redirect('/')
    });

};