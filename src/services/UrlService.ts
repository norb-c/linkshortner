import { BadRequestError } from '../exceptions';
import URLRepository from '../repositories/UrlRepository';
class URLService {
  private repository: URLRepository;

  constructor() {
    this.repository = new URLRepository();
  }

  public async getURLByShortKey(shortKey: string): Promise<string> {
    const url = await this.repository.findURL({ short_key: shortKey }, ['original_url']);
    if (!url) return '/';

    return url.original_url;
  }

  public async shortenURL(originalUrl: string): Promise<{ [key: string]: string }> {
    let shortKey = await this.repository.generateUniqueShortKey();

    const urlCreated = await this.repository.createURL({
      short_key: shortKey,
      original_url: originalUrl
    });

    const response = {
      shortUrl: `${process.env.HOST}${urlCreated.short_key}`,
      originalUrl
    };
    return response;
  }

  public async deleteShortKey(shortKey: string): Promise<number> {
    const deletedKey = await this.repository.findURL({ short_key: shortKey, deleted_flag: false });
    if (!deletedKey) throw new BadRequestError('Short key does not exist');

    const deleteUrl = await this.repository.updateURL({ deleted_flag: true, deleted_at: new Date() }, { id: deletedKey.id });
    return deleteUrl[0];
  }
}

export default URLService;
