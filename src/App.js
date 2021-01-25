import "./App.css";
import React, { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
const App = () => {
  const BASE_URL = "https://api.exchangeratesapi.io/latest";
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountIn, setAmountIn] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  let toAmount, fromAmount;
  if (amountIn) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((res) => {
        const first = Object.keys(res.rates)[11];
        setCurrencyOptions([res.base, ...Object.keys(res.rates)]);
        setFromCurrency(res.base);
        setToCurrency(first);
        setExchangeRate(res.rates[first]);
      });
  }, []);
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountIn(true);
  };
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountIn(false);
  };
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((res) => setExchangeRate(res.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        amount={fromAmount}
        onChange={(e) => setFromCurrency(e.target.value)}
        selected={fromCurrency}
        currencyOptions={currencyOptions}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        onChange={(e) => setToCurrency(e.target.value)}
        selected={toCurrency}
        currencyOptions={currencyOptions}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
          <h3><a href="https://github.com/jatinhemnani01/currency-converter-react">Full Code On Github</a></h3>
    </>
  );
};

export default App;
