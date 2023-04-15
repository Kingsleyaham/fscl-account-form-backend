import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import PersonalDetail from "./personalDetail.model";

class AuthorizedPerson extends Model<
  InferAttributes<AuthorizedPerson>,
  InferCreationAttributes<AuthorizedPerson>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare name: string;
  declare address: string;
  declare mobileNum: string;
  declare bvn: string;
  declare email: string;
  declare meansOfIdentification: string;
  declare passport: string;
  declare signature: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AuthorizedPerson.init(
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
    address: { type: DataTypes.TEXT, allowNull: false },
    mobileNum: {
      type: DataTypes.STRING,
      field: "mobile_number",
      allowNull: false,
    },
    bvn: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    meansOfIdentification: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "means_of_identification",
    },
    passport: { type: DataTypes.STRING, allowNull: false },
    signature: { type: DataTypes.STRING, allowNull: false },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },

  { tableName: "authorized_persons", sequelize }
);

export default AuthorizedPerson;
