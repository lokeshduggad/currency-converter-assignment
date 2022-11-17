import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Rates } from '../../type/Rates';
import { StoreContext } from './context/StoreContext';
import * as StoreService from '../../service/StoreService';

export const StoreProvider: React.FC = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState<Rates>();
  const getStoreDetails = useCallback(async () => {
    const exchangeRates = await StoreService.fetchLatestRates();
    setExchangeRates(exchangeRates);
  }, []);

  /**
   * init Store provider to fetch all details
   */
  useEffect(() => {
    getStoreDetails();
  }, [getStoreDetails]);



  const currencyCoverterReducer = (state: any, action: any) => {
    switch (action.type) {
      case "FETCH_CONVERSION":
        return {
          ...state,
          conversionData: action.payload
        };
      case "WRITE_HISTORY":
        localStorage.setItem(
          'conversion-history',
          JSON.stringify([...state.history, action.payload]));
        return {
          ...state,
          history: [...state.history, action.payload]
        }
    }
  };

  const [state, dispatch] = React.useReducer(currencyCoverterReducer, { conversionData: { result: 0 }, history: [] });
  const profileContext = React.useMemo(
    () => ({
      state,
      exchangeRates,
      dispatch
    }),
    [exchangeRates, state, dispatch]
  );

  return (
    <StoreContext.Provider value={profileContext}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
