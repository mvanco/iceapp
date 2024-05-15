class Config {
  private static instance: Config;

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private constructor() {
    this.RestApiUrl = "https://matoosh.eu/rest/ice";
  }

  private _token: string | undefined;
  get token(): string | undefined {
    return this._token;
  }
  set token(value: string | undefined) {
    this._token = value;
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

  RestApiUrl: string;
}

const CurrentConfig = Config.getInstance()

export default CurrentConfig;