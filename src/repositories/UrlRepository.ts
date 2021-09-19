import { injectable } from 'inversify';
import { FindAttributeOptions, Transaction, WhereOptions } from 'sequelize';
import { generateRandomString } from '../common/utilities';
import { IURLAttributes, IURLRepository } from '../interfaces/url.interface';
import { Url } from '../models/Url';

@injectable()
export default class URLRepository implements IURLRepository {
  private model = Url;

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

  public async generateUniqueShortKey(length = 4): Promise<string> {
    let randomString = generateRandomString(length);
    const urls = await this.model.findAll({ where: { short_key: randomString, deleted_flag: false } });
    if (urls.length > 0) {
      randomString = await this.generateUniqueShortKey(4);
    }
    return randomString;
  }
}
