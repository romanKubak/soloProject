const logbodyREG = document.getElementById('logbodyREG');
const blockForm = document.querySelector('#logbodyREG');

// Регистрация:
logbodyREG.addEventListener('submit', async (e) => {
  e.preventDefault();

  const login = e.target.login.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const name = e.target.name.value;

  const response = await fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, email, password, name }),
  });
  const { errLog, status } = await response.json();

  if (status || status === undefined) {
    return window.location = '/';
  } else {
    const isErr = document.querySelector('.errorLog')
    if (isErr === null) {
      const error = document.createElement('div');
      error.classList.add('errorLog');
      error.innerHTML = `<h5>${errLog}</h5>`
      blockForm.appendChild(error)
      // console.log('result ==>', errLog)
    }
  }
});

// LogIn:
const logbodyIN = document.getElementById('logbodyIN');

logbodyIN.addEventListener('submit', async (e) => {
  e.preventDefault();

  const login = e.target.login.value;
  const password = e.target.password.value;
  console.log('login==>', login)
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });
  const { errLog, status } = await response.json();

  if (status || status === undefined) {
    return window.location = '/';
  } else {
    const isErr = document.querySelector('.errorLog')
    console.log(isErr)
    if (isErr === null) {
      const error = document.createElement('div');
      error.classList.add('errorLog');
      error.innerHTML = `<h5>${errLog}</h5>`
      logbodyIN.appendChild(error)
      console.log('result ==>', errLog)
    }
  }
});
