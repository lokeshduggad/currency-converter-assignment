import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FullLayout } from './component/layout/FullLayout/FullLayout';
import { CurrencyConverter } from './component/Converter/CurrencyConverter';
import { ConversionHistory } from './component/History/ConversionHistory';
import './App.css';

import { StoreProvider } from './provider/StoreProvider/StoreProvider';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FullLayout />}>
              <Route index element={<CurrencyConverter />} />
              <Route path="history" element={<ConversionHistory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
