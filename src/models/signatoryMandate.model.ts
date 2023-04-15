import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import PersonalDetail from "./personalDetail.model";

class SignatoryMandate extends Model<
  InferAttributes<SignatoryMandate>,
  InferCreationAttributes<SignatoryMandate>
> {
  declare id: CreationOptional<number>;
  declare userId: number;

  declare name: string;
  declare designation: string;
  declare signatoryClass: string;
  declare signature: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SignatoryMandate.init(
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
    name: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    signatoryClass: {
      type: DataTypes.STRING,
      field: "signatory_class",
      allowNull: false,
    },
    signature: { type: DataTypes.STRING, allowNull: false },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "signatory_mandate", sequelize }
);

export default SignatoryMandate;
