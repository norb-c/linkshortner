import * as request from 'supertest';
import App from '../app';
import URLRoute from '../routes/url.routes';
import URL from '../models/url.model';
import URLController from '../controllers/url.controller';
import { NextFunction, Request, Response } from 'express';
import URLService from '../services/url.service';

const data = {
  originalUrl: 'https://www.examplesofgreatposts.com/2021/02'
};

let shortKey = '';

describe('Link Shortener integration tests', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve({}), 100));
    await URL.destroy({ where: { originalUrl: data.originalUrl }, force: true });
  });
  it('Should return 404 for undefine routes', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer()).get(`/undefinedroutes/undefined`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('Should return unauthorized if secret_key is not present', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer()).post(`${indexRoute.path}`).send(data);
    expect(res.status).toEqual(401);
    expect(res.body).toMatchObject({ message: 'Unauthorized: Missing secret_key' });
  });

  it('Should return unauthorized if secret_key is incorrect', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer()).post(`${indexRoute.path}`).send(data).set('secret_key', 'SHKDDJJJDKKDLDHJL');

    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });

  it('Should return validation error if DTO criterias is not met', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer())
      .post(`${indexRoute.path}`)
      .send({ originalUrl: 'facebook' })
      .set('secret_key', process.env.API_KEY);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });

  it('Should succesfully create short url', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer()).post(`${indexRoute.path}`).send(data).set('secret_key', process.env.API_KEY);
    shortKey = res.body.data.url.split(process.env.HOST)[1];

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('data.url');
  });

  it('Should successfully redirect to long url', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer()).get(`/${shortKey}`);
    expect(res.status).toEqual(302);
  });

  it('Should succesfully delete short url', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer()).delete(`${indexRoute.path}/${shortKey}`).set('secret_key', process.env.API_KEY);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('Should fail to delete short url if already deleted', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    const res = await request(app.getServer()).delete(`${indexRoute.path}/${shortKey}`).set('secret_key', process.env.API_KEY);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });

  it('Should return 200 OK status for homepage', () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);

    return request(app.getServer()).get(`/`).expect(200);
  });

  it('Should redirect to homepage if shorkey is not found', async () => {
    const indexRoute = new URLRoute();
    const app = new App([indexRoute]);
    const fakeShortKey = '1234';
    const res = await request(app.getServer()).get(`/${fakeShortKey}`);
    expect(res.status).toEqual(302);
    expect(res.text).toContain('Found. Redirecting to /');
  });
});

describe('Unit testing', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Fakes server error when redirecting to long url', async () => {
    jest.spyOn(URLService.prototype, 'getURLByShortKey').mockImplementation(async () => {
      throw new Error('an error occured');
    });
    // const urlService = new URLService();
    // const spy = jest.spyOn(urlService, "getURLByShortKey").mockImplementation(() => {
    //   throw new Error("an error occured");
    // });
    const urlcontroller = new URLController();
    const mockRequest = { params: { id: '1' } } as any as Request;
    const mockResponse = () => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const res = mockResponse();
    const mockNext: NextFunction = jest.fn();
    // await urlService.getURLByShortKey('dscds');
    await urlcontroller.redirectToLongUrl(mockRequest, res, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(500);
    expect(mockNext).toHaveBeenCalledWith(new Error('an error occured'));
  });

  it('Fakes server error when creating short url', async () => {
    jest.spyOn(URLService.prototype, 'shortenURL').mockImplementation(async () => {
      throw new Error('an error occured');
    });
    // const urlService = new URLService();
    // const spy = jest.spyOn(urlService, "getURLByShortKey").mockImplementation(() => {
    //   throw new Error("an error occured");
    // });
    const urlcontroller = new URLController();
    const mockRequest = { body: { originalUrl: '1' } } as any as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      redirect: jest.fn()
    } as any as Response;

    const mockNext: NextFunction = jest.fn();
    // await urlService.getURLByShortKey('dscds');
    await urlcontroller.createShortKey(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(new Error('an error occured'));
  });

  // it("Fakes server error when going to homepage", async () => {
  //   // jest.spyOn(URLController.prototype, "redirectToHome").mockImplementation(async () => {
  //   //   throw new Error("failed to go to home");
  //   // });

  //   const indexRoute = new URLRoute();
  //   const app = new App([indexRoute]);

  //   // const urlcontroller = new URLController();
  //   const spy = jest.spyOn(indexRoute.urlController, "redirectToHome").mockImplementation(() => {
  //     throw new Error("an error occured");
  //   });

  //   return request(app.getServer()).get(`/`).expect(500);
  // });
});
