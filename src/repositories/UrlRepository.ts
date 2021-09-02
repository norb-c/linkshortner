import { FindAttributeOptions, Transaction, WhereOptions } from 'sequelize';
import { IURLAttributes } from '../interfaces/url.interface';
import { Url as UrlModel } from '../models/Url';

export class URLRepository {
  private model = UrlModel;

  public async findURL(
    whereOptions: WhereOptions<IURLAttributes>,
    attributesOptions?: FindAttributeOptions
  ): Promise<IURLAttributes> {
    return this.model.findOne({ where: whereOptions, ...(attributesOptions && { attributes: attributesOptions }) });
  }

  public async createURL(payload: IURLAttributes, dbTransaction?: Transaction): Promise<IURLAttributes> {
    return this.model.create(payload, { ...(dbTransaction && { transaction: dbTransaction }) });
  }

  public async updateURL(
    payload: Partial<IURLAttributes>,
    whereOptions: WhereOptions<IURLAttributes>,
    dbTransaction?: Transaction
  ): Promise<[number, IURLAttributes[]]> {
    return this.model.update(payload, { where: whereOptions, ...(dbTransaction && { transaction: dbTransaction }) });
  }

  public async deleteURL(id: number, dbTransaction?: Transaction): Promise<number> {
    return this.model.destroy({ where: { id }, ...(dbTransaction && { transaction: dbTransaction }) });
  }
}
