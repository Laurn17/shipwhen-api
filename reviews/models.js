'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// MY RETURNED REVIEW SCHEMA 
const reviewSchema = mongoose.Schema({
	date_created: {type: Date, default: Date.now()},
	bus_name: {type: String, required: true},
	delivery: {type: String, required: true},
	order_date: {type: Date, required: true},
	estimate_date: {type: Date, required: true},
  arrive: {type: Boolean},
	arrive_date: {type: Date},
	created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});



reviewSchema.methods.serialize = function() {
  return {
    id: this._id,
    bus_name: this.bus_name,
    delivery: this.delivery,
    order_date: this.order_date.toDateString(),
    estimate_date: this.estimate_date.toDateString(),
    arrive: this.arrive,
    arrive_date: this.arrive_date.toDateString(),
    created_by: this.created_by
  };
};

const Review = mongoose.model('Review', reviewSchema);
module.exports = {Review};


