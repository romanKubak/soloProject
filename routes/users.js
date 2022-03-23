const router = require('express').Router();
// const { User, Sound } = require('../db/models');

// Подключаю middleware
// const {  } = require('../middleware')
// Подключаю контролеры
const { logOut, registration,login, showMyPage, renderMain, renderMyCab } = require('../controlers/usersControlers')

router.get('/', renderMain);

router.get('/avtorization', (req, res) => {
  if(!req.session.superuser) {
    res.render('users/avtorization');
  } else {
    res.redirect('/')
  }
});

router.get('/myCab', renderMyCab)

router.get('/loguot', logOut);

router.get('/myPage', showMyPage)

router.post('/registration', registration);

router.post('/login', login);

module.exports = router;
