
const widgetModel = require('../Model/restaurantWidget');


exports.restaurantWidget = (req, res) => {
    widgetModel.find().sort({id:1}).then(result => {
        res.status(200).json({
            message: 'Restaurant widget fetched',
            mealtypes: result
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}

