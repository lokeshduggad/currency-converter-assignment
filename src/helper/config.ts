export const isProduction = process.env.NODE_ENV === "production";

const ENV = {
  develop: {
    apiBaseUrl: "https://api.exchangerate.host/",
  },
  production: {
    apiBaseUrl: "https://api.exchangerate.host/",
  },
};

export const getEnvironment = isProduction ? ENV.production : ENV.develop;
