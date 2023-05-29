import React, { useEffect, useState } from 'react';
import Currency from './Currency'
import './App.css';
const API_KEY = '9bb3f8637e5c30ff7c4b2af7dbbf50a3&'
const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`

function App() {
  const [optionValue, setOptionValue] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [exchangeRates, setExchangeRates] = useState()
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRates
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRates
  }


  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // firstCurrency is the first key of rates obj
        const firstCurrency = Object.keys(data.rates)[0]
        setOptionValue([data.base, ...Object.keys(data.rates)])
        setFromCurrency([data.base])
        setToCurrency(firstCurrency)
        setExchangeRates(data.rates[firstCurrency])
        console.log(data.rates[firstCurrency])
        // console.log(Object.keys(data.rates)[0])
      }).catch(error => error.message)
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      // console.log('fromcurrency', fromCurrency)
      // console.log('tocurrency', toCurrency)
      fetch(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(response => response.json())
        .then(data => setExchangeRates(data.rates[toCurrency]))
        .catch(error => error.message)
    }
  }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert</h1>
      <Currency
        optionValue={optionValue}
        selectedCurrency={fromCurrency}
        onChangeValue={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <Currency
        optionValue={optionValue}
        selectedCurrency={toCurrency}
        onChangeValue={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
