
const express = require('express');
const router = express.Router();


const restaurantController = require('../Controller/RestaurantList');
const widgetController=require('../Controller/RestaurantWidget');
const menuController = require('../Controller/Menu');
const userController = require('../Controller/Users');
const paymentController = require('../Controller/Payments');

router.post('/filterRestaurants', restaurantController.filterRestaurants);
router.get('/getAllLocations',restaurantController.getAllLocations);
router.get('/getAllRestaurants', restaurantController.getAllRestaurants);
router.get('/getAllRestaurantsByLocation/:cityName', restaurantController.getAllRestaurantsByLocation);
router.get('/getRestaurantByName/:restName', restaurantController.getRestaurantByName);
router.get('/widget', widgetController.restaurantWidget);
router.get('/getMenuForRestaurant/:restName', menuController.getMenuForRestaurant);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/payment', paymentController.payment);
router.post('/paymentCallback', paymentController.paymentCallback);
module.exports = router;