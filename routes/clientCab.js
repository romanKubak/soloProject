const router = require('express').Router();
const { User, ShopCart, Product } = require('../db/models');

const { addProductInShopCart, paymentOneProduct } = require('../controlers/clientCab')

router.get('/shopcart', async (req, res) => {
  const unpaidOrder = await ShopCart.findAll({where: {status_pay: false, user_id: req.session.superuserID}})
  
  const unpayAll_idProduct = unpaidOrder.map((el) => el.product_id);
  let unPayProducts = []
  for (let i=0; i< unpayAll_idProduct.length; i++) {
    const newProd = await Product.findOne({ where: {id: unpayAll_idProduct[i]} })
    unPayProducts.push(newProd)
  }
  
  const successPaidOrder = await ShopCart.findAll({where: {status_pay: true, status_done: false,user_id: req.session.superuserID}})
  const payAll_idProduct = successPaidOrder.map((el) => el.product_id);
  let payProducts = [];
  for (let i=0; i < successPaidOrder.length; i++) {
    const paymentProd = await Product.findOne({where: {id: payAll_idProduct[i]}});
    payProducts.push(paymentProd)
  } 
  // console.log('\n\n result', result, '\n\n');
  // const unpaidProducts = await Product.findAll({where: {id: unpaidOrder[0].product_id}})
  res.render('clienCab/shopcart', { unPayProducts, payProducts })
})

router.post('/paymentOne', paymentOneProduct)

router.post('/pushShopCart', addProductInShopCart)



module.exports = router;
