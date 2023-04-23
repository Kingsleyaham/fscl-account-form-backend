import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class AccountType extends Model<
  InferAttributes<AccountType>,
  InferCreationAttributes<AccountType>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare accountType: string;
  declare tableRef: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AccountType.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    accountType: {
      type: DataTypes.STRING,
      field: "account_type",
      defaultValue: "individual",
      comment: '"individual", "joint", "corporate"',
    },

    tableRef: {
      type: DataTypes.STRING,
      field: "table_ref",
      defaultValue: "personal_details",
      comment: '"personal_details", "corporate_details"',
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "account_type", sequelize }
);

export default AccountType;
