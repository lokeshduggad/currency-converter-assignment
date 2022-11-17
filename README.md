# Frontend Developer Assessment

This is Currency Converter webapp built using React for Frontend Developer Assessment.

## Description

The currency conversion application to help calculate what the amount is worth in another currency

## Project Structure

```bash
├── src
│   ├── components
│   │   ├── Home/Home.tsx                     # Displays Home Page with Currency converter and History
│   │   ├── Layout/                           # Contains Header, Full layout and Footer UI components
│   │   ├── Converter/CurrencyConverter.tsx   # Displays the currency converter
│   │   ├── History/ConversionHistory.tsx     # Displays all the conversion history
│   ├── function/                             # contains reducer functions
│   ├── helper                                # Contains reducer functions
│   │   ├── config.ts                         # api url config for all envs
│   ├── provider                              # Contains reducer functions
│   │   ├── StoreProvider.tsx                 # React context provider which stores and calculates conversions
│   ├── service/                              # contains service to fetch store data
│   ├── type/                                 # data types
│   ├── App.tsx                               # This is the root component of the application
│   ├── index.tsx                             # ReactDOM.render is called
```

## Please follow below commands to run this project : 

In the current project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
