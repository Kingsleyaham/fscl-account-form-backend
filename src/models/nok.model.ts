import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import PersonalDetail from "./personalDetail.model";

class NextOfKin extends Model<
  InferAttributes<NextOfKin>,
  InferCreationAttributes<NextOfKin>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare name: string;
  declare title: string;
  declare gender: string;
  declare relationship: string;
  declare address: string;
  declare mobileNum: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

NextOfKin.init(
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
    title: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    relationship: { type: DataTypes.STRING, allowNull: false },
    mobileNum: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "mobile_number",
    },
    address: { type: DataTypes.STRING, allowNull: false },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "next_of_kin", sequelize }
);

export default NextOfKin;
