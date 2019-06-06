const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false});

const {Review} = require('./models');
const {User} = require('../users/models');

router.use(bodyParser.json());

// GET BY BUSNAME
router.get('/api/reviews/:bus_name', (req, res) => {
  return Review
    .find({bus_name: req.params.bus_name})
    .then(function(review) {
     	res.json(review.map(review => review.serialize()));
    })
    .catch(function(err) {
     	console.error(err);
     	res.status(500).json({ error: 'something went terribly wrong' });
    });
});

// GET REVIEWS BY USERNAME
router.get('/api/myreviews/:username', (req, res) => {
  console.log(req.params.username);
  return Review
    .find({created_by: req.params.username})
    .then(function(review) {
     	res.json(review.map(review => review.serialize()));
    })
    .catch(function(err) {
     	console.error(err);
     	res.status(500).json({ error: 'something went terribly wrong' });
    });
});

// CREATE BY BUS_NAME
router.post('/api/reviews', (req, res) => {
	const requiredFields = ['bus_name', 'delivery', 'order_date', 'estimate_date'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`;
			console.error(message);
			return res.sendStatus(400).send(message);
		}
	}
	Review
		.create({
		    date_created: Date.now(),
			bus_name: req.body.name,
			delivery: req.body.delivery,
			order_date: req.body.order_date,
			estimate_date: req.body.estimate_date,
			arrive: req.body.arrive,
			arrive_date: req.body.arrive_date,
		    created_by: req.body.user
		})
		.then(function(review) {
			res.sendStatus(201).json(review.serialize())
		})
		.catch(function(err) {
			console.error(err);
			res.status(500).json({ message: 'Internal server error' });
		});
	
});


module.exports = {router};