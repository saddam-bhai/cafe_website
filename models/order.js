const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
	o_name: { type: String, required: true },
	o_number: { type: String, required: true },
	main_order: { type: String, required: true },
	additional_food: { type: String, default: ''},
	email: { type: String, default: '' },
	o_email: { type: String, default: '' },
	o_placed_time: { type: String, default:''},
	o_delivery_time: { type: String, required: true },
	o_address: { type: String, default: ''},
	o_message: { type: String, default: '' },
	ostatus: { type: String, default: 'placed' },
});

const Order = mongoose.model("order", orderSchema);

const validate = (data) => {
	const schema = Joi.object({
		o_name: Joi.string().required().label("Name"),
		// number: Joi.number().min(10).max(10).label("Number"),
		o_number: Joi.string().length(10).required().label("Number"),
		main_order: Joi.string().required().label("Order"),
		additional_food: Joi.string().allow('', null).label("Additional Food"),
		email: Joi.string().label("Email"),
		o_email: Joi.string().allow('', null).label("Email"),
		o_placed_time: Joi.string().label("Current Date and Time"),
		o_delivery_time: Joi.string().required().label("Order Date and Time"),
		o_address: Joi.string().allow('', null).label("Address"),
		o_message: Joi.string().allow('', null).label("Message"),
		ostatus: Joi.string().default("placed").label("ostatus"),
    });
	return schema.validate(data);
};

module.exports = { Order, validate };