import { HttpClient } from '../HttpClient'
import { AxiosRequestConfig } from 'axios';

class MainApiProtected extends HttpClient {
  public constructor() {
    super("https://ancient-falls-66352.herokuapp.com/info");
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {}

    return config;
  };

  public getChestsInfo = (region:string, summonerName:string):Promise<ChestInfo> => this.instance.get(`/${region}/${summonerName}/all`)
}

export const api = new MainApiProtected();