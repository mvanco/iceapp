import i18next, { i18n } from "i18next";

class Config {
  private static instance: Config;
  RestApiUrl: string;
  LoadingInterval: number;
  ApiDateFormat: string;

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private constructor() {
    this.RestApiUrl = "http://127.0.0.1:5000";
    this.LoadingInterval = 1000;
    this.ApiDateFormat = 'YYYY-MM-DDTHH:mm';
  }
}

const CurrentConfig = Config.getInstance()

export default CurrentConfig;