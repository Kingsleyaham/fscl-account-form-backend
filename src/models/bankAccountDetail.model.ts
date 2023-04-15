import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import PersonalDetail from "./personalDetail.model";

class BankAccountDetail extends Model<
  InferAttributes<BankAccountDetail>,
  InferCreationAttributes<BankAccountDetail>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare accountName: string;
  declare accountNumber: string;
  declare bank: string;
  declare bvn: string;
  declare accountOpenDate: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

BankAccountDetail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      references: {
        model: PersonalDetail,
        key: "id",
      },
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "account_name",
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "account_number",
    },
    bank: { type: DataTypes.STRING, allowNull: false },
    bvn: { type: DataTypes.STRING, allowNull: false },
    accountOpenDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "account_open_date",
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "bank_account_detail", sequelize }
);

export default BankAccountDetail;
