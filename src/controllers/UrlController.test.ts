import { getMockReq, getMockRes } from '@jest-mock/express';
import { responseFormat } from '../common/utilities';
import { applicationConfiguration } from '../config';
import { NotImplementedError, ResourceNotFoundError, ServiceUnavailableError } from '../exceptions';
import URLRepository from '../repositories/UrlRepository';
import URLService from '../services/UrlService';
import UrlController from './UrlController';

const originalUrl = 'https://facebook.com';

describe('UrlController', () => {
  it('should redirect to long url', async () => {
    const urlService = new URLService(new URLRepository());
    urlService.getURLByShortKey = jest.fn().mockImplementation(() => {
      return originalUrl;
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq({
      params: {
        id: 'short'
      }
    });
    const { res, next } = getMockRes();

    await urlController.redirectToLongUrl(req, res, next);
    expect(urlService.getURLByShortKey).toHaveBeenCalledTimes(1);
    expect(urlService.getURLByShortKey).toHaveBeenCalledWith('short');
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(originalUrl);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should fail to redirect to long url', async () => {
    const urlService = new URLService(new URLRepository());
    urlService.getURLByShortKey = jest.fn().mockImplementation(() => {
      throw new ResourceNotFoundError('not found');
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq({
      params: {
        id: 'short'
      }
    });
    const { res, next } = getMockRes();

    await urlController.redirectToLongUrl(req, res, next);
    expect(urlService.getURLByShortKey).toHaveBeenCalledTimes(1);
    expect(urlService.getURLByShortKey).toHaveBeenCalledWith('short');
    expect(res.redirect).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ResourceNotFoundError('not found'));
  });

  it('should go to homepage', async () => {
    const urlService = new URLService(new URLRepository());
    urlService.getURLByShortKey = jest.fn().mockImplementation(() => {
      return originalUrl;
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq();
    const { res, next } = getMockRes();

    await urlController.redirectToHome(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Homepage');
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should failed to go to homepage ', async () => {
    const urlService = new URLService(new URLRepository());
    urlService.getURLByShortKey = jest.fn().mockImplementation(() => {
      return originalUrl;
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq();
    const { res, next } = getMockRes();

    await urlController.redirectToHome(req, null, next);
    expect(res.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new TypeError("Cannot read property 'status' of null"));
  });

  it('should create shork key successfully', async () => {
    const newShortKey = 'new_short_key';

    const data = {
      shortUrl: `${applicationConfiguration.host}${newShortKey}`,
      originalUrl
    };
    const urlService = new URLService(new URLRepository());
    urlService.shortenURL = jest.fn().mockImplementation(() => {
      return {
        shortUrl: `${applicationConfiguration.host}${newShortKey}`,
        originalUrl
      };
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq({
      body: { originalUrl }
    });
    const { res, next } = getMockRes();

    await urlController.createShortKey(req, res, next);
    expect(urlService.shortenURL).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(responseFormat(data));
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should throw error', async () => {
    const urlService = new URLService(new URLRepository());
    urlService.shortenURL = jest.fn().mockImplementation(() => {
      throw new NotImplementedError('Something went wrong');
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq({
      body: { originalUrl }
    });
    const { res, next } = getMockRes();

    await urlController.createShortKey(req, res, next);
    expect(urlService.shortenURL).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new NotImplementedError('Something went wrong'));
  });

  it('should delete key', async () => {
    const data = 1;
    const urlService = new URLService(new URLRepository());
    urlService.deleteShortKey = jest.fn().mockImplementation(() => {
      return data;
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq({
      params: { id: 'short_key' }
    });
    const { res, next } = getMockRes();

    await urlController.deleteShortKey(req, res, next);
    expect(urlService.deleteShortKey).toHaveBeenCalledTimes(1);
    expect(urlService.deleteShortKey).toHaveBeenCalledWith('short_key');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(responseFormat({ data }));
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should delete key', async () => {
    const urlService = new URLService(new URLRepository());
    urlService.deleteShortKey = jest.fn().mockImplementation(() => {
      throw new ServiceUnavailableError('service is unavailable');
    });
    const urlController = new UrlController(urlService);

    const req = getMockReq({
      params: { id: 'short_key' }
    });
    const { res, next } = getMockRes();

    await urlController.deleteShortKey(req, res, next);
    expect(urlService.deleteShortKey).toHaveBeenCalledTimes(1);
    expect(urlService.deleteShortKey).toHaveBeenCalledWith('short_key');
    expect(res.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ServiceUnavailableError('service is unavailable'));
  });
});
