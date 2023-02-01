import React from 'react';
import './App.css';

import CurrencyInputs from './components/currencyInputs' //Components for inputs
import CurrencyOutputs from './components/currencyOutputs' //Component for output
import HistoryTable from './components/historyTable' //Component for table

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRef } from 'react';


function App() {

  const [inputAmount, setinputAmount] = useState(1)
  const [convertedAmount, setconvertedAmount] = useState(1)
  const [inputCurrency, setinputCurrency] = useState('EUR')
  const [convertedCurrency, setconvertedCurrency] = useState('USD')
  const [rates, setRates] = useState([])
  const [tableDisplayed, setTableDisplayed] = useState(false)


  /**
   * Fetching data from openexchangerate
   * and saving those data on rates
   */
  useEffect(() => {
    axios.get('https://openexchangerates.org/api/latest.json?app_id=7fd2ecfd3ae74f5f8a899e0dbc11dc8b')
      .then(response => {
        setRates(response.data.rates)
      })

  }, [])

  /**
   * default currency will be converted in first landing
   */
  useEffect(() => {
    if (rates !== 0) {
      setconvertedAmount(inputAmount * rates[convertedCurrency] / rates[inputCurrency])
    }
  })

  //checking if the converted amount is changed or not
  const latestValue = useRef(convertedAmount)

  //if the converted number is changed then this will perform
   useEffect(
    function onChange() {
      if (convertedAmount !== latestValue.current) {
        let curretTime = new Date()
        let date = curretTime.getDate()
        let month = curretTime.getMonth() + 1
        let min = curretTime.getMinutes()
        let hour = curretTime.getHours()
        let dateString = `${date}/${month} ${hour}:${min}`
        //creating an object with the conversion details
        let conversionDetails = {
          fromCurrency: inputCurrency,
          fromAmount: inputAmount,
          toCurrency: convertedCurrency,
          toAmount: convertedAmount.toFixed(4),
          operationTime: dateString
        }
        //posting to the backend api for saving in the database with .5 sec delay
        
        axios.post('http://localhost:4000/savenewentry', conversionDetails)
       
      }
    },
    [convertedAmount]
  )
    /**
     * converting amoung on changin the value of input amount
     */
  function changinginputAmount(inputAmount) {
      setTimeout(() => {
        setconvertedAmount(inputAmount * rates[convertedCurrency] / rates[inputCurrency]).toFixed(4)
      }, 500)
      setinputAmount(inputAmount)
  }
/**
     * converting amoung on changin the value of input currenct
     */
  function changinginputCurrency(inputCurrency) {
    setTimeout(() => {
      setconvertedAmount(inputAmount * rates[convertedCurrency] / rates[inputCurrency]).toFixed(4)
    }, 500)
    setinputCurrency(inputCurrency)

  }
  function changingconvertedCurrency(convertedCurrency) {
    setconvertedCurrency(convertedCurrency)
  }
  //to display the table
  const tableDisplay = () => {
    setTableDisplayed(true)

  }
  //to hide the table
  const tableHide = () => {
    setTableDisplayed(false)
  }
  return (
    <div className="App">

      <h1>Currency Convert!</h1>
      <div>
        <h3>From</h3>
        <CurrencyInputs
          onAmountChange={changinginputAmount}
          onCurrencyChange={changinginputCurrency}
          curriences={Object.keys(rates)}
          amount={inputAmount}
          currency={inputCurrency} />
        <h3>TO</h3>
        <CurrencyOutputs
          onCurrencyChange={changingconvertedCurrency}
          curriences={Object.keys(rates)}
          amount={convertedAmount}
          currency={convertedCurrency}
        />
        <br />

        <button onClick={tableDisplay}>Show Last 10 Conversion</button>
        <br />

        {tableDisplayed && (
          <div>
            <br />
            <button onClick={tableHide}>Hide Table</button>
            <HistoryTable />
            <br />
          </div>
        )}
      </div>

    </div>
  );
}

export default App;