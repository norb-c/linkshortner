import { WhereOptions, FindAttributeOptions, Transaction } from 'sequelize/types';

export interface IURLAttributes {
  id?: number;
  short_key: string;
  original_url: string;
  deleted_flag?: boolean;
  deleted_at?: Date;
  created_at?: Date;
}

export interface IURLRepository {
  findURL(whereOptions: WhereOptions<IURLAttributes>, attributesOptions?: FindAttributeOptions): Promise<IURLAttributes>;
  createURL(payload: IURLAttributes, dbTransaction?: Transaction): Promise<IURLAttributes>;
  updateURL(
    payload: Partial<IURLAttributes>,
    whereOptions: WhereOptions<IURLAttributes>,
    dbTransaction?: Transaction
  ): Promise<[affectedCount: number]>;

  deleteURL(id: number, dbTransaction?: Transaction): Promise<number>;
  generateUniqueShortKey(length?: number): Promise<string>;
}
export interface IURLService {
  getURLByShortKey(shortKey: string): Promise<string>;
  shortenURL(originalUrl: string): Promise<{ [key: string]: string }>;
  deleteShortKey(shortKey: string): Promise<number>;
}
