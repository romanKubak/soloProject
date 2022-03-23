console.log('helo with payProduct')

// const btnPushShopCart = document.querySelectorAll('.btnPushShopCart')

// btnPushShopCart.forEach(async (elem) => {
//   elem.addEventListener('click', async (e) => {
//     const oneProduct = elem.closest('.btnPushShopCart');
//     const oneProduct_id = oneProduct.id;

//     const response = await fetch('/pushShopCart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ oneProduct_id }),
//     });

//     const result = await response.json()
//     // console.log('result --> ', result)

//     const thisBTN = document.getElementById(`${oneProduct_id}`)
//     // console.log('thisBTN --> ', thisBTN.type)
//     thisBTN.innerText = `${result}`
//     thisBTN.style = 'pointer-events: none;padding: 15px; border-radius: 14px; background-color: #4bafef;'

//     // const boxBuy = document.querySelector(`buy${oneProduct_id}`)
//   })
// });

const btnPayment = document.querySelectorAll('.btnPayment');

btnPayment.forEach(async (elem) => {
  elem.addEventListener('click', async (e) => {
    const oneProduct = elem.closest('.btnPayment');
    const oneProduct_id = oneProduct.id;

    const response = await fetch('/paymentOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oneProduct_id }),
    })

    const {message, statusPay} = await response.json();
    console.log('message -->', message)
    console.log('statusPay -->', statusPay)
  })
})
