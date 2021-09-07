// import { WhereOptions, FindAttributeOptions, Transaction } from 'sequelize/types';
// import { applicationConfiguration } from '../config';
// import { BadRequestError } from '../exceptions';
// import { IURLAttributes, IURLRepository } from '../interfaces/url.interface';
// import { Url as UrlModel } from '../models/Url';
// import URLService from './UrlService';

// // jest.mock('../repositories/UrlRepository.ts');

// let mockUrlResponse = {
//   id: 1,
//   short_key: 'xcd',
//   original_url: 'https://facebook.com',
//   deleted_flag: false,
//   deleted_at: new Date(),
//   created_at: new Date()
// };

// let newShortKey = 'new_short_key';
// let mockFindUrlRepository: jest.SpyInstance;
// let mockUpdateUrlRepository: jest.SpyInstance;
// let mockGenerateRepository: jest.SpyInstance;
// let mockCreateRepository: jest.SpyInstance;

// class URLRepository {
//   private model = UrlModel;
//   findURL() {
//     throw new Error('Method not implemented.');
//   }
//   createURL(payload: any): Promise<any> {
//     throw new Error('Method not implemented.');
//   }
//   updateURL(payload, whereOptions): Promise<any> {
//     throw new Error('Method not implemented.');
//   }
//   deleteURL(id: number): Promise<any> {
//     throw new Error('Method not implemented.');
//   }
//   generateUniqueShortKey(length?: number): Promise<string> {
//     throw new Error('Method not implemented.');
//   }
// }

// beforeEach(() => {
//   // mockFindUrlRepository = jest.spyOn(URLRepository.prototype, 'findURL').mockImplementation((): any => {
//   //   return mockUrlResponse;
//   // });
//   // mockUpdateUrlRepository = jest.spyOn(URLRepository.prototype, 'updateURL').mockImplementation((): any => {
//   //   return [1, {}];
//   // });
//   // mockCreateRepository = jest.spyOn(URLRepository.prototype, 'createURL').mockImplementation((): any => {
//   //   return {
//   //     ...mockUrlResponse,
//   //     short_key: newShortKey
//   //   };
//   // });
//   // mockGenerateRepository = jest.spyOn(URLRepository.prototype, 'generateUniqueShortKey').mockImplementation((): any => {
//   //   return newShortKey;
//   // });
// });

// afterEach(() => {
//   // mockFindUrlRepository.mockReset();
//   // mockUpdateUrlRepository.mockReset();
//   // mockGenerateRepository.mockReset();
// });

// describe('URLService', () => {
//   // it('Call class coonstructor properly', () => {
//   //   expect(URLRepository).not.toHaveBeenCalled();
//   //   new URLService();
//   //   expect(URLRepository).toHaveBeenCalledTimes(1);
//   // });

//   describe('Get URL By Short Key', () => {
//     it('Successfully get URL by shorkKey', async () => {
//       const repo = new URLRepository();
//       repo.findURL = (): Promise<IURLAttributes> => {
//         return mockFindUrlRepository ;
//       };
//       const urlService = new URLService(repo);

//       expect(await urlService.getURLByShortKey('xcd')).toMatch('https://facebook.com');
//       expect(mockFindUrlRepository).toHaveBeenCalledTimes(1);
//       expect(mockFindUrlRepository).toHaveBeenCalledWith({ short_key: 'xcd' }, ['original_url']);
//     });

//     // it('return base / when short key is not found', async () => {
//     //   const urlService = new URLService();
//     //   mockFindUrlRepository.mockImplementation(() => null);

//     //   expect(await urlService.getURLByShortKey('1234')).toBe('/');
//     //   expect(mockFindUrlRepository).toHaveBeenCalledTimes(1);
//     //   expect(mockFindUrlRepository).toHaveBeenCalledWith({ short_key: '1234' }, ['original_url']);
//     // });
//   });

//   // describe('Shorten URL', () => {
//   //   it('Successfully shorten long url', async () => {
//   //     const urlService = new URLService();
//   //     const originalUrl = 'https://facebook.com';

//   //     expect(await urlService.shortenURL(originalUrl)).toMatchObject({
//   //       shortUrl: `${applicationConfiguration.host}${newShortKey}`,
//   //       originalUrl
//   //     });

//   //     expect(mockGenerateRepository).toHaveBeenCalledTimes(1);
//   //     expect(mockCreateRepository).toHaveBeenCalledTimes(1);
//   //     expect(mockGenerateRepository).toHaveBeenCalledWith();
//   //     expect(mockCreateRepository).toHaveBeenCalledWith({ short_key: newShortKey, original_url: originalUrl });
//   //   });
//   // });

//   // describe('Delete URL By Short Key', () => {
//   //   it('throw Bad request error when short key is not found', async () => {
//   //     const urlService = new URLService();
//   //     mockFindUrlRepository.mockImplementation(() => null);

//   //     await expect(urlService.deleteShortKey('123')).rejects.toThrow(new BadRequestError('Short key does not exist'));
//   //     expect(mockFindUrlRepository).toHaveBeenCalledTimes(1);
//   //     expect(mockFindUrlRepository).toHaveBeenCalledWith({ short_key: '123', deleted_flag: false });
//   //   });

//   //   it('Successfully delete URL', async () => {
//   //     const urlService = new URLService();

//   //     expect(await urlService.deleteShortKey('xcd')).toBe(1);
//   //     expect(mockFindUrlRepository).toHaveBeenCalledTimes(1);
//   //     expect(mockFindUrlRepository).toHaveBeenCalledWith({ short_key: 'xcd', deleted_flag: false });

//   //     expect(mockUpdateUrlRepository).toHaveBeenCalledTimes(1);
//   //     // TODO find a way to matcg this
//   //     //   expect(mockUpdateUrlRepository).toHaveBeenCalledWith(
//   //     //     expect.objectContaining({ deleted_flag: true, deleted_at: new Date() })
//   //     //   );
//   //   });
//   // });
// });
