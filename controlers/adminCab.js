const { User, ShopCart, Product } = require('../db/models');

const renderAllProduct = async (req, res) => {
  if(req.session.superuser && res.locals.isAdmin) {
    const allProduct = await Product.findAll()
    res.render('adminCab/allProduct', { allProduct })
  } else {
    // console.log('res.locals.isAdmin ===> ', res.locals.isAdmin)
    res.redirect('/')
  }
}

const renderFilledOrder = async (req, res) => {
  if(req.session.superuser && res.locals.isAdmin) {
    // const allProduct = await Product.findAll()
    res.render('adminCab/filledOrder')
  } else {
    // console.log('res.locals.isAdmin ===> ', res.locals.isAdmin)
    res.redirect('/')
  }
}

const renderUNFilledOrder = async (req, res) => {
  if(req.session.superuser && res.locals.isAdmin) {
    // const allProduct = await Product.findAll()
    res.render('adminCab/unFilledOrder')
  } else {
    // console.log('res.locals.isAdmin ===> ', res.locals.isAdmin)
    res.redirect('/')
  }
}

module.exports = { renderAllProduct, renderFilledOrder, renderUNFilledOrder }
