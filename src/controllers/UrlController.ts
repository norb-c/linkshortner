import { injectable } from 'inversify';
import 'reflect-metadata';

import { RequestHandler } from 'express';
import URLService from '../services/UrlService';
import { responseFormat } from '../common/utilities';

@injectable()
export default class UrlController {
  private _service: URLService;

  constructor(service: URLService) {
    this._service = service;
  }

  public redirectToLongUrl: RequestHandler = async (req, res, next) => {
    const shortKey: string = req.params.id;

    try {
      const originalUrl: string = await this._service.getURLByShortKey(shortKey);
      res.redirect(originalUrl);
    } catch (error) {
      next(error);
    }
  };

  public redirectToHome: RequestHandler = async (req, res, next) => {
    try {
      res.status(200).send(`Homepage`);
    } catch (error) {
      next(error);
    }
  };

  public createShortKey: RequestHandler = async (req, res, next) => {
    const body = req.body;

    try {
      const data = await this._service.shortenURL(body.originalUrl);
      res.status(201).json(responseFormat(data));
    } catch (error) {
      next(error);
    }
  };

  public deleteShortKey: RequestHandler = async (req, res, next) => {
    const shortKey: string = req.params.id;

    try {
      const data = await this._service.deleteShortKey(shortKey);
      res.status(204).json(responseFormat({ data }));
    } catch (error) {
      next(error);
    }
  };
}
