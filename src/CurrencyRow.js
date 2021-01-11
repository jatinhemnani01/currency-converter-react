import React from "react";
import "./App.css";
const CurrencyRow = (props) => {
  const { currencyOptions, selected, onChange, amount, onChangeAmount } = props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selected} onChange={onChange}>
        {currencyOptions.map((options) => {
          return (
            <option key={options} value={options}>
              {options}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyRow;
