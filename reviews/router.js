const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false});

const {Review} = require('./models');

router.use(bodyParser.json());

// GET BY BUSNAME
router.get('/api/reviews', jwtAuth, (req, res) => {
  return Review
    .find({bus_name: req.data})
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

// // CREATE BY SEASON
// router.post('api/reviews', jwtAuth, (req, res) => {
// 	const requiredFields = ['season', 'name', 'plantBy', 'username'];
// 	for (let i = 0; i < requiredFields.length; i++) {
// 		const field = requiredFields[i];
// 		if (!(field in req.body)) {
// 			const message = `Missing ${field} in request body`;
// 			console.error(message);
// 			return res.status(400).send(message);
// 		}
// 	}
// 	Produce
// 	    .create({
// 	    	season: req.body.season,
// 	    	name: req.body.name,
// 	    	germinateIndoors: req.body.germinateIndoors,
// 			seedOrPlant: req.body.seedOrPlant,
// 			plantBy: req.body.plantBy,
// 			datePlanted: req.body.datePlanted
//    		 })
// 	    .then(function(produce) {
// 	    	res.status(201).json(produce.serialize())
// 	    })
// 	    .catch(function(err) {
// 	      console.error(err);
// 	      res.status(500).json({ message: 'Internal server error' });
// 	    });
// });

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