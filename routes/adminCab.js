const router = require('express').Router();
const { User, ShopCart, Product } = require('../db/models');

const { renderAllProduct, renderFilledOrder, renderUNFilledOrder } = require('../controlers/adminCab')

router.get('/allProduct', renderAllProduct)

router.get('/filledOrder', renderFilledOrder)

router.get('/unfilledOrder', renderUNFilledOrder)

module.exports = router
