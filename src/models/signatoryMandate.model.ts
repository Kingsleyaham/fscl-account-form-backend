import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class SignatoryMandate extends Model<
  InferAttributes<SignatoryMandate>,
  InferCreationAttributes<SignatoryMandate>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare name: string;
  declare designation: string;
  declare class: string;
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
    },
    name: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    class: {
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
