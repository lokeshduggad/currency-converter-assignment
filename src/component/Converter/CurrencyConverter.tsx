import React, { useState, useEffect } from 'react';
import {useDebounce} from 'usehooks-ts';
import { useStore } from '../../provider/StoreProvider/StoreProvider';
import * as StoreService from '../../service/StoreService';
import { TextField,Autocomplete, Button } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import './Converter.css';

export const CurrencyConverter: React.FC = () => {
  let { exchangeRates, dispatch, state } = useStore();
  let exchangeRatesList: string []= [];
  if(exchangeRates && exchangeRates.rates){
    exchangeRatesList = Object.keys(exchangeRates.rates);
  }

  const [fromCurrency, setFrom] = useState<string>("EUR");
  const [toCurrency, setTo] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(0);
  const debouncedValue = useDebounce<number>(amount, 500)

  useEffect(() => {
    convertAmount();
  }, [fromCurrency, toCurrency, debouncedValue]);

  function swapCurrencyForConversion() {
    let temp = fromCurrency;
    setFrom(toCurrency);
    setTo(temp);
  }
  
  // Function to convert the currency
  async function convertAmount() {
    if(!fromCurrency || !toCurrency || !amount )
    return '';

    let conversionData = await StoreService.fetchConversion(
      fromCurrency,
      toCurrency,
      amount
    );
    dispatch({
      type: "FETCH_CONVERSION",
      payload: conversionData,
    });
    if(state.conversionData){
      dispatch({
        type: "WRITE_HISTORY",
        payload: { fromCurrency, toCurrency, amount, timestamp: new Date() },
      });
    }
  }

  return (
    <div>
      <h3>I want to convert</h3>
      <div className="input-container">
        <TextField
          name="amount"
          type="number"
          inputProps={{
            maxLength: 13,
            step: "1"
          }}
          value={amount}
          autoComplete="off"
          onChange={(e: any) => setAmount(Number(e.target.value))}
        />
        <Autocomplete
          id="currencyList"
          value={fromCurrency || ""}
          options={exchangeRatesList}
          sx={{ width: 200 }}
          onChange={(e, value) => {
            setFrom(value!);
          }}
          renderInput={(params) => (
            <TextField {...params} name="fromCurrency" label="From" />
          )}
        />

        <CompareArrowsIcon
          className="swap-icon"
          onClick={() => swapCurrencyForConversion()}
          fontSize="large"
        />

        <Autocomplete
          id="currencyList"
          value={toCurrency || ""}
          options={exchangeRatesList}
          sx={{ width: 200 }}
          onChange={(e, value) => {
            setTo(value!);
          }}
          renderInput={(params) => (
            <TextField {...params} name="toCurrency" label="To" />
          )}
        />
        <Button
          variant="contained"
          onClick={() => {
            convertAmount();
          }}
        >
          Convert
        </Button>
      </div>
      <div>
        <div className="result-container">
       
        <div className="result">
          {state.conversionData && state.conversionData.result ? (
            <>
              <h1>
                {(amount.toLocaleString()) +
                  " " +
                  fromCurrency +
                  " = " +
                  state.conversionData.result.toLocaleString() +
                  " " +
                  toCurrency}
              </h1>
              <div className='rates-container'>
                <div>
                  {1 +
                    " " +
                    fromCurrency +
                    " = " +
                    state.conversionData.info.rate.toFixed(4) +
                    " " +
                    toCurrency}
                </div>
                <div>
                  {1 +
                    " " +
                    toCurrency +
                    " = " +
                    (1 / state.conversionData.info.rate).toFixed(4) +
                    " " +
                    fromCurrency}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
