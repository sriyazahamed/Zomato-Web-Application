const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const restaurantWidgetSchema = new Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        meal_type: {
            type: Number,
            required: true
        },
        source:{
            type:String,
            required:true
        }
    }
);

module.exports = mongoose.model('restaurantwidget', restaurantWidgetSchema, 'restaurantWidget');