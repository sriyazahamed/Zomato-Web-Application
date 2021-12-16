const Menu = require('../Model/Menu');




exports.getMenuForRestaurant = (req, res) => {
    const restName = req.params.restName;
    Menu.find({
        restaurantName: restName
    }).then(result => {
        res.status(200).json({
            message: `Menu fetched for restaurant ${restName}`,
            menu: result
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Error in Database',
            error: error
        });
    });
}