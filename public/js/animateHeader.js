// console.log('hello with animateHeader')

const button = document.getElementById('header__burger')
const header__menu = document.getElementById('header__menu')
const body = document.querySelector('body')
const boxForm = document.querySelector('.form-boxR')

button.addEventListener('click', (e) => {
  // console.log(e.target)
  button.classList.toggle('active')
  header__menu.classList.toggle('active')
  boxForm.classList.toggle('active2')
  body.classList.toggle('lock')
})

