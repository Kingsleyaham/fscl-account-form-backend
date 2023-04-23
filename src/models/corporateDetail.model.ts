import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class CorporateDetail extends Model<
  InferAttributes<CorporateDetail>,
  InferCreationAttributes<CorporateDetail>
> {
  declare id: CreationOptional<number>;

  declare companyName: string;
  declare rcNum: string;
  declare dateOfInc: Date;
  declare tin: string;
  declare corpAccountNumber: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CorporateDetail.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "company_name",
    },
    rcNum: { type: DataTypes.STRING, allowNull: false, field: "rc_numm" },
    dateOfInc: { type: DataTypes.DATEONLY, allowNull: false, field: "date_of_inc" },
    tin: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    corpAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "corp_account_number",
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "corporate_details", sequelize }
);

export default CorporateDetail;
