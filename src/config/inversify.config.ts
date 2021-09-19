import { Container } from 'inversify';
import { IURLRepository, IURLService } from '../interfaces/url.interface';
import URLRepository from '../repositories/UrlRepository';
import URLService from '../services/UrlService';
import UrlController from '../controllers/UrlController';

const urlContainer = new Container();
urlContainer.bind<IURLRepository>(URLRepository).toSelf();
urlContainer.bind<IURLService>(URLService).toSelf();
urlContainer.bind<UrlController>(UrlController).toSelf();

export { urlContainer };
