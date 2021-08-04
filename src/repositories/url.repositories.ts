import { FindAttributeOptions, Transaction, WhereOptions } from 'sequelize';
import { URLAttributes } from '../interfaces/url.interfaces';
import URLModel from '../models/url.model';

export class URLRepository {
  private model = URLModel;

  public async findURL(
    whereOptions: WhereOptions<URLAttributes>,
    attributesOptions?: FindAttributeOptions
  ): Promise<URLAttributes> {
    return this.model.findOne({ where: whereOptions, ...(attributesOptions && { attributes: attributesOptions }) });
  }

  public async createURL(payload: URLAttributes, dbTransaction?: Transaction): Promise<URLAttributes> {
    return this.model.create(payload, { ...(dbTransaction && { transaction: dbTransaction }) });
  }

  public async updateURL(
    payload: Partial<URLAttributes>,
    whereOptions: WhereOptions<URLAttributes>,
    dbTransaction?: Transaction
  ): Promise<[number, URLAttributes[]]> {
    return this.model.update(payload, { where: whereOptions, ...(dbTransaction && { transaction: dbTransaction }) });
  }

  public async deleteURL(id: number, dbTransaction?: Transaction): Promise<number> {
    return this.model.destroy({ where: { id }, ...(dbTransaction && { transaction: dbTransaction }) });
  }
}
