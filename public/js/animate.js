// console.log('hello with animate')

const signIN_R = document.querySelector('.signIN_R')
const signUP_R = document.querySelector('.signUP_R')
const formBoxR = document.querySelector('.form-boxR')
const blockR = document.querySelector('.blockR')

signUP_R.addEventListener('click', () => {
  formBoxR.classList.add('active');
  blockR.classList.add('active');
})

signIN_R.addEventListener('click', () => {
  formBoxR.classList.remove('active');
  blockR.classList.remove('active');
})
