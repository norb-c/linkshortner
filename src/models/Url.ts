import { DataTypes, Model, Optional } from 'sequelize';
import { IURLAttributes } from '../interfaces/url.interface';
import { sequelize } from '../database/sequelize';

type CreationAttributes = Optional<IURLAttributes, 'id'>;

class Url extends Model<IURLAttributes, CreationAttributes> {
  id: number;

  short_key: string;

  original_url: string;

  deleted_flag?: boolean;

  readonly created_at: Date;

  readonly updated_at: Date;
}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER().UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    short_key: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    original_url: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    deleted_flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'url',
    sequelize
  }
);

export { Url };
