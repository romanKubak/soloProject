const bcrypt = require('bcrypt');
const { User, ShopCart, Product } = require('../db/models');

const logOut = async (req, res) => {
  if (req.session.superuser) {
    await req.session.destroy();
    res.clearCookie('MyCookieName');
    return res.redirect('/avtorization');
  } else {
    return res.redirect('/');
  }
}

const registration = async (req, res) => {
  const { login, email, password, name } = req.body;
  const repeatUser = await User.findOne({where: { login }})
  let status
  // console.log('\n repeatUser \n===> ', repeatUser, '\n==========\n')
  // console.log('req.body ======> ', req.body);
  if (!repeatUser) {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ login, email, name, password: hash });
    // console.log('user ===>', user);
    let helloName = user.dataValues.name;
    helloName = helloName[0].toUpperCase() + helloName.slice(1) + '!'
    req.session.superuser = user.dataValues.login;
    req.session.helloName = helloName;
    status = true
    return res.json(status);
  } else {
    status = false
    const errLog = 'логин уже используется'
    return res.json({errLog, status});
    // return res.redirect('/registration')
  }
}

// exports.login = async (req, res) => {
const login = async (req, res) => {
  const { login, password } = req.body;
  console.log('login ===> ', login)
  const user = await User.findOne({ where: { login } });

  let passwordCheck;
  if (user !== null) {
    passwordCheck = await bcrypt.compare(password, user.password);
  }
  let status
  if (passwordCheck && user !== null) {
    req.session.superuser = user.dataValues.login;
    req.session.superuserID = user.dataValues.id;
    status = true
    return res.json(status);
  } else {
    status = false;
    const errLog = "неверный логин или пароль"
    return res.json({errLog, status});
    // err.style.visibility = 'visible';
    // console.log('\n=======   неверный пароль   =======\n');
  }
}

const showMyPage = async (req, res) => {
  let authorTrack;
  let allTracks;
  // console.log('req.session.superuser ====>', req.session.superuser);
  // if(req.session.superuser) {
  //   const author = await User.findOne({where: {login: req.session.superuser}});
  //   const idAuthor = author.dataValues.id;
  //   // console.log('author ====>', author);
  //   try {
  //     authorTrack = await Sound.findAll({where: {user_id: idAuthor}}, {order:[['id', 'DESC']]});
  //     // console.log('authorAlbums ===> ', authorAlbums)
  //     allTracks = await Sound.findAll({}, {order:[['id', 'DESC']]}); 
  //     allTracks = allTracks.filter(el => el.user_id !== idAuthor)
  //     // console.log('allAlbums ===> ', allAlbums)
  //   } catch (error) {
  //     return res.render('error', { error: error.message });
  //   }
  //   return res.render('users/myPage', { authorTrack, allTracks });
  // } else {
  //   return res.redirect('/avtorization');
  // }
};

const renderMain = async (req, res) => {
  if (req.session.superuser) {
    const userAdmin = await User.findOne({ where: { login: req.session.superuser }});
    const isAdmin = userAdmin.isAdmin // лежит true или false
    // console.log('userAdmin ==> ', userAdmin);
    const allProduct = await Product.findAll()
    const fullPriceProduct = await Product.findAll({order:[['price', 'DESC']], limit: 5})
    if(userAdmin) {
      res.render('main', { isAdmin, allProduct, fullPriceProduct })
    } else  {
      res.render('main')
    }
  } else {
    return res.render('main')
  }

  // console.log('req.session.superuser ====>', req.session.superuser);
  // if(req.session.superuser) {
  //   const author = await User.findOne({where: {login: req.session.superuser}});
  //   const idAuthor = author.dataValues.id;
  //   // console.log('author ====>', author);
  //   try {
  //     authorTrack = await Sound.findAll({where: {user_id: idAuthor}}, {order:[['id', 'DESC']]});
  //     popularTrack = await Sound.findAll({order:[['likes', 'DESC']], limit: 5})
  //     allTracks = await Sound.findAll({}, {order:[['id', 'DESC']]}); 
  //     allTracks = allTracks.filter(el => el.user_id !== idAuthor)
  //     // console.log('allAlbums ===> ', allAlbums)
  //   } catch (error) {
  //     return res.render('error', { error: error.message });
  //   }
  //   return res.render('main', { authorTrack, allTracks, popularTrack });
  // } else {
  //   return res.render('main');
  // }
}

const renderMyCab = async (req, res) => {
  if(req.session.superuser && res.locals.isAdmin) {
    const allProduct = await Product.findAll()
    res.render('users/myCab', { allProduct })
  } else {
    // console.log('res.locals.isAdmin ===> ', res.locals.isAdmin)
    res.redirect('/')
  }
}

module.exports = { 
  logOut, 
  registration, 
  login, 
  showMyPage, 
  renderMain, 
  renderMyCab }
