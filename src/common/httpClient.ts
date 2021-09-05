import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import https from 'https';
import logger from './logger';
import { Errors } from './errors';
import { ServiceUnavailableError } from '../exceptions';

interface CustomResponseProps {
  baseUrl: string;
  timeout?: number;
  headers?: { [key: string]: any };
  httpsAgent?: https.Agent;
}

interface CustomResponse<T> {
  data: T;
  statusCode: number;
  headers: { [key: string]: string };
  isSuccess: boolean;
  statusText: string;
}

export class HttpClient {
  public instance: AxiosInstance;

  public constructor({ baseUrl, timeout, ...rest }: CustomResponseProps) {
    this.instance = axios.create({
      baseURL: baseUrl,
      ...(timeout && { timeout }),
      headers: { Accept: 'application/json' },
      ...rest
    });

    this.instance.interceptors.response.use(
      (response: any): any => {
        logger.info(`HTTP Response: ${response.config.method.toUpperCase()} ${response.config.url} ${response.status}`);

        return {
          data: response.data,
          statusCode: response.status,
          headers: response.headers,
          isSuccess: true,
          statusText: response.statusText
        };
      },
      (error: any): any => {
        if (!error.response) {
          logger.error('HTTP Response: Network Error');
        } else {
          logger.error('HTTP Response error', error.response.statusTexts);
        }

        if (error.code === 'ECONNABORTED') {
          logger.error('HTTP Response: ECONNABORTED, timed out.', error);
          throw new ServiceUnavailableError(Errors.SERVICE_UNAVAILABLE);
        }

        if (error.code === 'ENOTFOUND') {
          logger.error('HTTP Response: ENOTFOUND', error);
          throw new ServiceUnavailableError(Errors.SERVICE_UNAVAILABLE);
        }

        return {
          data: error.response.data,
          statusCode: error.response.status,
          headers: error.response.headers,
          isSuccess: false,
          statusText: error.response.statusText
        };
      }
    );
  }

  public get = <T>(path: string, config?: AxiosRequestConfig): Promise<CustomResponse<T>> => {
    return this.instance.get(path, config);
  };

  public post = <T>(
    path: string,
    data?: { [key: string]: any } | string,
    config?: AxiosRequestConfig
  ): Promise<CustomResponse<T>> => {
    return this.instance.post(path, data, config);
  };

  public put = <T>(path: string, data?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<CustomResponse<T>> => {
    return this.instance.put(path, data, config);
  };

  public patch = <T>(path: string, data?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<CustomResponse<T>> => {
    return this.instance.patch(path, data, config);
  };

  public delete = <T>(path: string, config?: AxiosRequestConfig): Promise<CustomResponse<T>> => {
    return this.instance.delete(path, config);
  };
}
