import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IURLAttributes } from '../interfaces/url.interface';

@Table({
  modelName: 'url',
  timestamps: true,
  paranoid: true
})
export default class URL extends Model<IURLAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  shortKey: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  originalUrl: string;

  @AllowNull(true)
  @Column(DataType.DATE())
  completedAt: Date;

  @AllowNull(true)
  @Default(false)
  @Column(DataType.BOOLEAN)
  deletedFlag?: boolean;
}
