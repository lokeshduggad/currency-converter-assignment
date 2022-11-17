import axios from 'axios';
import { getEnvironment } from '../helper/config';
import { Rates } from '../type/Rates';

export const fetchLatestRates = async (): Promise<Rates> => {
  const response = await axios.get(`${getEnvironment.apiBaseUrl}latest`);
  return response.data;
};

export const fetchConversion = async (fromCurrency: string, toCurrency: string, amount: number): Promise<any> => {
  const response = await axios.get(`${getEnvironment.apiBaseUrl}convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
  return response.data;
};
