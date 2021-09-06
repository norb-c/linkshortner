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
  ): Promise<[number, IURLAttributes[]]>;

  deleteURL(id: number, dbTransaction?: Transaction): Promise<number>;
  generateUniqueShortKey(length: number): Promise<string>;
}
