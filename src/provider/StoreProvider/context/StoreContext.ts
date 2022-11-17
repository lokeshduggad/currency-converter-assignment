import React from "react";
import { Rates } from "../../../type/Rates";

export type StoreContextType = {
  state: any;
  exchangeRates: Rates | undefined;
  dispatch: React.Dispatch<any>;
};

export const StoreContext = React.createContext<StoreContextType>({
  state: undefined,
  exchangeRates: undefined,
  dispatch: () => null,
});
