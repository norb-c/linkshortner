import { injectable } from 'inversify';
import { applicationConfiguration } from '../config';

import { BadRequestError } from '../exceptions';
import { IURLService } from '../interfaces/url.interface';
import URLRepository from '../repositories/UrlRepository';

@injectable()
export default class URLService implements IURLService {
  constructor(private readonly _repository: URLRepository) {}

  public async getURLByShortKey(shortKey: string): Promise<string> {
    const url = await this._repository.findURL({ short_key: shortKey }, ['original_url']);
    if (!url) return '/';

    return url.original_url;
  }

  public async shortenURL(originalUrl: string): Promise<{ [key: string]: string }> {
    let shortKey = await this._repository.generateUniqueShortKey();

    const urlCreated = await this._repository.createURL({
      short_key: shortKey,
      original_url: originalUrl
    });

    const response = {
      shortUrl: `${applicationConfiguration.host}${urlCreated.short_key}`,
      originalUrl
    };
    return response;
  }

  public async deleteShortKey(shortKey: string): Promise<number> {
    const deletedKey = await this._repository.findURL({ short_key: shortKey, deleted_flag: false });
    if (!deletedKey) throw new BadRequestError('Short key does not exist');

    const deleteUrl = await this._repository.updateURL({ deleted_flag: true, deleted_at: new Date() }, { id: deletedKey.id });
    return deleteUrl[0];
  }
}
