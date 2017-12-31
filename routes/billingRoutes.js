const keys = require('../config/keys');
//taking token and exchanging for an actual charge
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

    app.post('/api/stripe', requireLogin, async (req, res) => {

        //console.log('REQ=========',req.body.id);
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        //console.log('CHARGE=========', charge);

        //access current user model with req.user from passport as middleware
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });




};