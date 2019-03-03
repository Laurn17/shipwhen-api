'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// MY RETURNED REVIEW SCHEMA 
const reviewSchema = mongoose.Schema({
	date_created: {type: Date, default: Date.now},
	bus_name: {type: String, required: true},
	delivery: {type: String, required: true},
	order_date: {type: Date, required: true},
	estimate_date: {type: Date, required: true},
  arrive: {type: Boolean},
	arrive_date: {type: Date},
	created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


         

          created_by: 4


reviewSchema.methods.serialize = function() {
  return {
    id: this._id,
    season: this.season,
    name: this.name,
    germinateIndoors: this.germinateIndoors,
    seedOrPlant: this.seedOrPlant,
    plantBy: this.plantBy.toDateString(),
    datePlanted: this.datePlanted && this.datePlanted.toDateString()
  };
};

const Review = mongoose.model('Review', reviewSchema);
module.exports = {Review};


