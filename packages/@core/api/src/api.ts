import Axios from 'axios';
import queryString from 'query-string';
import { deepSnakeizeKeys } from '@core/utils/objectUtils';
import { isEmpty, isNullish, omitBy } from '@core/utils/remeda';

import { AuthService } from './AuthService';
import { parseData, parseError } from './helpers';

import type {
  TObject,
  TGetParams,
  IRequestBody,
  IRequestProps,
  IOptionsParams,
  IOptionsResult,
  IRequestParams,
} from './interface';

interface IConfigurationProps {
  ssr?: boolean;
  baseUrl?: string;
  storage?: Storage;
  skipVersion?: boolean;
  requiredAuth?: boolean;
  raiseApiEvent?: boolean;
  withCredentials?: boolean;
}

export class Api {
  protected _ssr: boolean;
  protected _apiEndpoint: string;
  protected _skipVersion: boolean;
  protected _raiseApiEvent: boolean;
  protected _withCredentials: boolean;
  protected _authService: typeof AuthService;
  protected _requiredAuth: boolean | undefined;

  private constructor({
    baseUrl,
    storage,
    ssr = false,
    requiredAuth,
    skipVersion = false,
    raiseApiEvent = false,
    withCredentials = false,
  }: IConfigurationProps) {
    this._ssr = ssr;
    this._authService = AuthService;
    this._skipVersion = skipVersion;
    this._apiEndpoint = baseUrl || '';
    this._requiredAuth = requiredAuth;
    this._raiseApiEvent = raiseApiEvent;
    this._withCredentials = withCredentials;

    this._authService.config({
      storage,
    });
  }

  public static create(params: IConfigurationProps = {}): Api {
    return new this(params);
  }

  protected async _options({
    requiredAuth,
    headers = {},
  }: IOptionsParams): Promise<IOptionsResult> {
    let options = {} as IOptionsResult;
    const authToken = await this._authService?.token();

    if (requiredAuth && authToken) {
      options = {
        ...options,
        withCredentials: this._withCredentials,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
    }

    options.headers = { ...(options.headers as TObject), ...headers };

    return options;
  }

  protected async _request<T>({
    data,
    params,
    signal,
    headers,
    endpoint,
    version = 1,
    method = 'get',
    onUploadProgress,
    isExternal = false,
    requiredAuth = true,
    skipVersion = false,
    transform = 'snake',
  }: IRequestProps & IRequestBody & IRequestParams): Promise<T> {
    if (typeof endpoint !== 'string') {
      endpoint = queryString.stringifyUrl(
        {
          url: endpoint.url,
          query: omitBy(endpoint.query || {}, (val) => isNullish(val)),
        },
        {
          arrayFormat: 'bracket',
        },
      );
    }

    let url = endpoint.replace(/^\//, '');

    if (transform === 'snake') {
      data = deepSnakeizeKeys(data);
    }

    if (!isExternal) {
      url = [
        this._apiEndpoint,
        !(this._skipVersion || skipVersion) ? `v${version}` : '',
        url,
      ]
        .filter((s) => !!s)
        .join('/');
    }

    const opts = await this._options({
      headers,
      requiredAuth: isNullish(this._requiredAuth)
        ? requiredAuth
        : this._requiredAuth,
    });

    const promise = Axios.request({
      ...omitBy(
        {
          url,
          data,
          params,
          method,
        },
        (value) =>
          !(!this._ssr && value instanceof FormData) && isEmpty(value as TAny),
      ),
      ...opts,
      signal,
      onUploadProgress,
      withCredentials: this._withCredentials,
    })
      .then(parseData)
      .catch(
        parseError({
          raiseApiEvent: this._raiseApiEvent,
        }),
      );

    return promise;
  }

  public get<T>(options: TGetParams): Promise<T> {
    return this._request<T>({ method: 'get', ...options });
  }

  public post<T>(
    options: Omit<IRequestProps, 'method'> & IRequestBody,
  ): Promise<T> {
    return this._request<T>({ method: 'post', ...options });
  }

  public put<T>(
    options: Omit<IRequestProps, 'method'> & IRequestBody,
  ): Promise<T> {
    return this._request<T>({ method: 'put', ...options });
  }

  public delete<T>(
    options: Omit<IRequestProps, 'method'> & IRequestBody,
  ): Promise<T> {
    return this._request<T>({ method: 'delete', ...options });
  }
}
