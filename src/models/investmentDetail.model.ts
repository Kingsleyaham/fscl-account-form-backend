import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import PersonalDetail from "./personalDetail.model";

class InvestmentDetail extends Model<
  InferAttributes<InvestmentDetail>,
  InferCreationAttributes<InvestmentDetail>
> {
  declare id: CreationOptional<number>;
  declare userId: number;

  declare gender: string;
  declare mobileNum: string;
  declare email: string;
  declare address: string;
  declare postalAddress: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

InvestmentDetail.init(
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
    gender: { type: DataTypes.STRING, allowNull: false },
    mobileNum: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "mobile_number",
    },
    email: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    postalAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "postal_address",
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "investment_detail", sequelize }
);

export default InvestmentDetail;
