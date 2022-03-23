const { User, ShopCart, Product } = require('../db/models');

const addProductInShopCart = async (req, res) => {
  const { oneProduct_id } = req.body;
  // console.log('\n\n oneProduct_id ===> ', oneProduct_id, '\n\n')
  const newProductInShopCart = await ShopCart
    .create({user_id: req.session.superuserID, 
             product_id: oneProduct_id,
             status_pay: false,
             status_done: false
            })
  const messageSuccess = 'Товар добавлен в корзину';
  return res.json(messageSuccess)
}

const paymentOneProduct = async (req, res) => {
  const { oneProduct_id } = req.body;
  const oneShopCart = await ShopCart.update({ status_pay: true},{where: {user_id: req.session.superuserID, product_id: oneProduct_id}})
  const message = 'Заказ оплачен';
  const statusPay = oneShopCart.status_pay
  console.log('oneShopCart ---> ', oneShopCart)
  return res.json({ message, statusPay })
}

module.exports = { addProductInShopCart, paymentOneProduct }
