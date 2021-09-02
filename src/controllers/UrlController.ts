import { RequestHandler } from 'express';
import URLService from '../services/UrlService';

class UrlController {
  private service: URLService;

  constructor() {
    this.service = new URLService();
  }

  public redirectToLongUrl: RequestHandler = async (req, res, next) => {
    const shortKey: string = req.params.id;

    try {
      const originalUrl: string = await this.service.getURLByShortKey(shortKey);
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
      const data = await this.service.shortenURL(body.originalUrl);
      res.status(201).json({ message: 'success', data });
    } catch (error) {
      next(error);
    }
  };

  public deleteShortKey: RequestHandler = async (req, res, next) => {
    const shortKey: string = req.params.id;

    try {
      const data = await this.service.deleteShortKey(shortKey);
      res.status(204).json({ data: { deleted: data }, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UrlController;
