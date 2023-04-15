import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class PersonalDetail extends Model<
  InferAttributes<PersonalDetail>,
  InferCreationAttributes<PersonalDetail>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare middleName: string | null;
  declare surname: string;
  declare gender: string;
  declare maritalStatus: string;
  declare dateOfBirth: Date;
  declare motherMaidenName: string;
  declare profession: string;
  declare country: string;
  declare stateOfOrigin: string;
  declare lga: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PersonalDetail.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    middleName: DataTypes.STRING,
    surname: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "marital_status",
    },
    dateOfBirth: { type: DataTypes.DATEONLY, field: "date_of_birth" },
    motherMaidenName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "mother_maiden_name",
    },
    profession: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    stateOfOrigin: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "state_of_origin",
    },
    lga: { type: DataTypes.STRING, allowNull: false },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "personal_details", sequelize }
);

export default PersonalDetail;
