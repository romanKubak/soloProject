const { User, ShopCart, Product } = require('../db/models');

const superUserName = async (req, res, next) => {
  if (req.session.superuser) {
    const userAdmin = await User.findOne({ where: { login: req.session.superuser }});
    const isAdmin = userAdmin.isAdmin // лежит true или false
    res.locals.superuser = req.session?.superuser;
    res.locals.helloName = req.session?.helloName;
    res.locals.superuserID = req.session?.superuserID;
    res.locals.isAdmin = isAdmin
    next();
  } else {
    next();;
  }
};

module.exports = { superUserName } 
