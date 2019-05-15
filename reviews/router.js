const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false});
// var mongoose = require('mongoose');


const {Review} = require('./models');
const {User} = require('../users/models');

router.use(bodyParser.json());

// GET BY BUSNAME
router.get('/api/reviews/:bus_name', (req, res) => {
  return Review
    .find({bus_name: req.params.bus_name}).populate('created_by')
    // Im trying to say that if the review is empty, dont send anything...
    // .then (function(review) {
    //     if (review === "") {
    //      res.status(404)        // HTTP status 404: NotFound
    //       .send('Not found').end();
    //     }
    //     else {
    //       return res.json(review);
    //     }
    // })
    .then(function(review) {
     	res.json(review.map(review => review.serialize()));
    })
    .catch(function(err) {
     	console.error(err);
     	res.status(500).json({ error: 'something went terribly wrong' });
    });
});

// GET BY ITEM ID
// router.get('/:id', jwtAuth, (req, res) => {
//   return Produce
//     .find({username: req.params.username, ObjectId: req.params._id})
//     .then(function(produce) {
//      	res.json(produce.map(produce => produce.serialize()));
//     })
//     .catch(function(err) {
//      	console.error(err);
//      	res.status(500).json({ error: 'something went terribly wrong' });
//     });
// });

// CREATE BY SEASON
router.post('/api/reviews', (req, res) => {
	const requiredFields = ['bus_name', 'delivery', 'order_date', 'estimate_date'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	Review
		.create({
		    date_created: Date.now(),
			bus_name: req.body.bus_name,
			delivery: req.body.delivery,
			order_date: req.body.order_date,
			estimate_date: req.body.estimate_date,
			arrive: req.body.arrive,
			arrive_date: req.body.arrive_date,
		    created_by: req.body.user
		})
		.then(function(review) {
			res.status(201).json(review.serialize())
		})
		.catch(function(err) {
			console.error(err);
			res.status(500).json({ message: 'Internal server error' });
		});
	
});

// // DELETE
// router.delete('/:id', jwtAuth, (req, res) => {
// 	Produce
// 		.findByIdAndRemove(req.params.id)
// 		.then(() => {
// 			res.status(204).end();
// 		})
// 		.catch(function(err) {
// 			res.status(500).json({error: 'Internal server error'});
// 		});	
// });

// // PUT
// router.put('/:id', jwtAuth, (req, res) =>  {
// 	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
// 		return res.status(400).json({error: 'Request path id and request body id must match'
// 		});
// 	}
// 	const toUpdate = {};
// 	const updateableFields = ['germinateIndoors', 'seedOrPlant', 'plantBy', 'datePlanted'];
  	
//   	updateableFields.forEach(field => {
// 	    if (field in req.body) {
// 	      toUpdate[field] = req.body[field];
// 	    }
//  	});
  	
//   	Produce
//   	    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
// 	    .then(produce => res.status(204).end())
// 	    .catch(err => res.status(500).json({ message: 'Internal server error' }));
// });


module.exports = {router};