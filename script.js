//cotaçao de moedas hoje
const USD_PRICE = 5.20
const EUR_PRICE = 5.90
const GBP_PRICE = 6.80

const inputAmount = document.querySelector('#amount');
const currency = document.querySelector('#currency');
const form = document.querySelector('form')
const description = document.querySelector('#description')
const result = document.querySelector('#result')

inputAmount.focus()

const footer = document.querySelector('footer')


// Formatação do valor enquanto o usuário digita
inputAmount.addEventListener("input", (event) => {
  let value = inputAmount.value.replace(/\D/g, "");

  // Formatação do valor para exibição em real 
  if (value.length >= 4) {
    value = value.replace(/(\d{2})$/, ",$1");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  //atualiza valor no display
    inputAmount.value = value;

})


// Formatação do valor para exibição em real
function valueFormatter(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}


form.onsubmit = (event) => {
  event.preventDefault()
  // Formatação do valor para conversão
  let value = inputAmount.value.replace(/[.,](?=[0-9]{3,}(?:[.,]|$))/g, '').replace(/[.,](?=[0-9]{2}$)/, '.')

  const currencyValue = currency.value


  switch (currencyValue) {
    case "USD": {
      convertCurrency(value, USD_PRICE, "US$")
      break
    }
    case "EUR": {
      convertCurrency(value, EUR_PRICE, "€")
      break
    }
    case "GBP": {
      convertCurrency(value, GBP_PRICE, "£")
      break
    }
  }
}

// Função de conversão de moedas
function convertCurrency(amount, price, symbol) {
  let convertedValue

  try {
    convertedValue = (amount * price).toFixed(2)
    convertedValue = valueFormatter(convertedValue)

    description.textContent = `${symbol} ${inputAmount.value} = ${convertedValue}`
    
    result.textContent = `${convertedValue}`

    footer.classList.add('show-result')
  } catch (error) {
    footer.classList.remove('show-result')
    console.error("Erro na conversão:", error)
  }


}