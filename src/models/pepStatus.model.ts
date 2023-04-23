import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class PepStatus extends Model<InferAttributes<PepStatus>, InferCreationAttributes<PepStatus>> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare status: string;
  declare details: string | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PepStatus.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    status: { type: DataTypes.STRING, allowNull: false },
    details: { type: DataTypes.TEXT },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "pep_status", sequelize }
);

export default PepStatus;
