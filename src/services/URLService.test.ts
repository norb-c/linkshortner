import { applicationConfiguration } from '../config';
import { BadRequestError } from '../exceptions';
import URLRepository from '../repositories/UrlRepository';
import URLService from './UrlService';

let mockUrlResponse = {
  id: 1,
  short_key: 'xcd',
  original_url: 'https://facebook.com',
  deleted_flag: false,
  deleted_at: new Date(),
  created_at: new Date()
};

let newShortKey = 'new_short_key';

describe('URLService', () => {
  describe('Get URL By Short Key', () => {
    it('Successfully get URL by shorkKey', async () => {
      const repo = new URLRepository();
      repo.findURL = jest.fn().mockImplementation(() => Promise.resolve(mockUrlResponse));
      const urlService = new URLService(repo);
      expect(urlService.getURLByShortKey).toBeDefined();
      expect(repo.findURL).toBeDefined();

      expect(await urlService.getURLByShortKey('xcd')).toMatch('https://facebook.com');
      expect(repo.findURL).toHaveBeenCalledTimes(1);
      expect(repo.findURL).toHaveBeenCalledWith({ short_key: 'xcd' }, ['original_url']);
    });

    it('return base / when short key is not found', async () => {
      const repo = new URLRepository();
      repo.findURL = jest.fn().mockImplementation(() => null);
      const urlService = new URLService(repo);

      expect(await urlService.getURLByShortKey('1234')).toBe('/');
      expect(repo.findURL).toHaveBeenCalledTimes(1);
      expect(repo.findURL).toHaveBeenCalledWith({ short_key: '1234' }, ['original_url']);
    });
  });

  describe('Shorten URL', () => {
    it('Successfully shorten long url', async () => {
      const repo = new URLRepository();
      repo.generateUniqueShortKey = jest.fn().mockImplementation((): any => {
        return newShortKey;
      });

      repo.createURL = jest.fn().mockImplementation((): any => {
        return {
          ...mockUrlResponse,
          short_key: newShortKey
        };
      });

      const urlService = new URLService(repo);

      const originalUrl = 'https://facebook.com';

      expect(await urlService.shortenURL(originalUrl)).toMatchObject({
        shortUrl: `${applicationConfiguration.host}${newShortKey}`,
        originalUrl
      });

      expect(repo.generateUniqueShortKey).toHaveBeenCalledTimes(1);
      expect(repo.createURL).toHaveBeenCalledTimes(1);
      expect(repo.generateUniqueShortKey).toHaveBeenCalledWith();
      expect(repo.createURL).toHaveBeenCalledWith({ short_key: newShortKey, original_url: originalUrl });
    });
  });

  describe('Delete URL By Short Key', () => {
    it('throw Bad request error when short key is not found', async () => {
      const repo = new URLRepository();
      repo.findURL = jest.fn().mockImplementation(() => null);
      const urlService = new URLService(repo);

      await expect(urlService.deleteShortKey('123')).rejects.toThrow(new BadRequestError('Short key does not exist'));
      expect(repo.findURL).toHaveBeenCalledTimes(1);
      expect(repo.findURL).toHaveBeenCalledWith({ short_key: '123', deleted_flag: false });
    });

    it('Successfully delete URL', async () => {
      const repo = new URLRepository();
      repo.findURL = jest.fn().mockImplementation(() => Promise.resolve(mockUrlResponse));
      repo.updateURL = jest.fn().mockImplementation((): any => {
        return [1, {}];
      });
      const urlService = new URLService(repo);

      expect(await urlService.deleteShortKey('xcd')).toBe(1);
      expect(repo.findURL).toHaveBeenCalledTimes(1);
      expect(repo.findURL).toHaveBeenCalledWith({ short_key: 'xcd', deleted_flag: false });

      expect(repo.updateURL).toHaveBeenCalledTimes(1);
      // TODO find a way to matcg this
      //   expect(mockUpdateUrlRepository).toHaveBeenCalledWith(
      //     expect.objectContaining({ deleted_flag: true, deleted_at: new Date() })
      //   );
    });
  });
});
