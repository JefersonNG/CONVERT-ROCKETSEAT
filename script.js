//cotaçao de moedas hoje
const USD_PRICE = 5.20
const EUR_PRICE = 5.90
const GBP_PRICE = 6.80

const inputAmount = document.querySelector('#amount');
const currency = document.querySelector('#currency');
const form = document.querySelector('form')
let valueFormatted

inputAmount.focus()

const footer = document.querySelector('footer')


// Formatação do valor enquanto o usuário digitacoin
inputAmount.addEventListener("input", (event) => {
  let value = inputAmount.value.replace(/\D/g, "");

  inputAmount.value = value

  if (value.length >= 4) {
    value = value.replace(/(\d{2})$/, ",$1");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    //atualiza valor no display
    inputAmount.value = value;
  }

  valueFormatted = value.replace(/[.,](?=[0-9]{3,}(?:[.,]|$))/g, '').replace(/[.,](?=[0-9]{2}$)/, '.')
})


form.onsubmit = (event) => {
  event.preventDefault()

  const currencyValue = currency.value


  switch (currencyValue) {
    case "USD": {
      convertCurrency(valueFormatted, USD_PRICE, "US$")
      break
    }
    case "EUR": {
      convertCurrency(valueFormatted, EUR_PRICE, "€")
      break
    }
    case "GBP": {
      convertCurrency(valueFormatted, GBP_PRICE, "£")
      break
    }
  }
}

function convertCurrency(amount, price, symbol) {
  let convertedValue
  const description = document.querySelector('#description')
  const result = document.querySelector('#result')

  try {
    convertedValue = (amount * price).toFixed(2).replace('.', ',')
    console.log(convertedValue)
    convertedValue = convertedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    description.textContent = `${symbol} ${inputAmount.value} = R$ ${convertedValue}`
    result.textContent = `R$ ${convertedValue}`

    footer.classList.add('show-result')
  } catch (error) {
    footer.classList.remove('show-result')
    console.error("Erro na conversão:", error)
  }


}