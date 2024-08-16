import i18next, { i18n } from "i18next";

class Config {
  private static instance: Config;
  RestApiUrl: string;
  LoadingInterval: number;
  ApiDateFormat: string;
  T: i18n;

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private constructor() {
    this.RestApiUrl = "https://matoosh.eu/rest/ice";
    this.LoadingInterval = 1000;
    this.ApiDateFormat = 'YYYY-MM-DDTHH:mm';
    this.T = i18next.createInstance()
    this.T.init({
      lng: 'cs', // Set the language to Czech
      resources: {
          cs: {
              translation: {
                  "term": "{{count}} termín",
                  "term_few": "{{count}} termíny",
                  "term_many": "{{count}} termínů"
              }
          }
      },
      // Pluralization rules for Czech
      pluralSeparator: '_'
    }).then(() => {
      console.log("i18next initialized", this.T);
    });
  }

  private _token: string | undefined;
  get token(): string | undefined {
    this._token = localStorage.getItem("token") ?? undefined;
    return this._token;
  }
  set token(value: string | undefined) {
    this._token = value;
    if (typeof value === "string") {
      localStorage.setItem("token", value);
    } else {
      localStorage.removeItem("token");
    }
  }

  private _userId: number | undefined;
  get userId(): number | undefined {
    return this._userId;
  }
  set userId(value: number | undefined) {
    this._userId = value;
  }

  private _validity: string | undefined;
  get validity(): string | undefined {
    return this._validity;
  }
  set validity(value: string | undefined) {
    this._validity = value;
  }

  clearSession() {
    this.token = undefined;
    this.userId = undefined;
    this.validity = undefined;
  }

  get ToastLengthShort() { return 500; }
  get ToastLengthLong() { return 3500; }
}

const CurrentConfig = Config.getInstance()

export default CurrentConfig;