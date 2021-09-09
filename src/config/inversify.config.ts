import { Container } from 'inversify';
import { IURLRepository, IURLService } from '../interfaces/url.interface';
import URLRepository from '../repositories/UrlRepository';
import URLService from '../services/UrlService';
import UrlController from '../controllers/UrlController';

const urlContainer = new Container();

// repository
urlContainer.bind<IURLRepository>(URLRepository).toSelf();

// services
urlContainer.bind<IURLService>(URLService).toSelf();

// controllers
urlContainer.bind<UrlController>(UrlController).toSelf();

export { urlContainer };
