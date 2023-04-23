import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class InvestmentDetail extends Model<
  InferAttributes<InvestmentDetail>,
  InferCreationAttributes<InvestmentDetail>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

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
    },
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
