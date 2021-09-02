import { IURLAttributes } from '../interfaces/url.interface';
import { BadRequestError, ConflictError } from '../exceptions';
import { URLRepository } from '../repositories/UrlRepository';
import { createHash } from 'crypto';

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
    let shortKey = this.hash(originalUrl);
    const key = await this.repository.findURL({ short_key: shortKey, deleted_flag: false });
    if (key) {
      shortKey = this.hash(originalUrl, shortKey.length + 1);
      const url: IURLAttributes = await this.repository.findURL({ short_key: shortKey, deleted_flag: false });
      if (url) throw new ConflictError(`A matching url found with ${url.short_key}`);
    }

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

    const deleteUrl = await this.repository.updateURL({ deleted_flag: true, deleted_at: new Date() }, { short_key: shortKey });
    if (!deleteUrl) throw new BadRequestError('Short key does not exist');

    return deleteUrl[0];
  }

  private hash(longUrl: string, length: number = 4): string {
    const sha = createHash('sha256');
    sha.update(longUrl);

    const chars = sha.digest('base64').replace('/', '+');
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
}

export default URLService;
