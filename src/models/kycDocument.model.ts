import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class KycDocument extends Model<
  InferAttributes<KycDocument>,
  InferCreationAttributes<KycDocument>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare utilityBill: string;
  declare identityUpload: string;
  declare passport: string;
  declare signature: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

KycDocument.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    utilityBill: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "utility_billl",
    },
    identityUpload: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "identity_upload",
    },
    passport: { type: DataTypes.STRING, allowNull: false },
    signature: { type: DataTypes.STRING, allowNull: false },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "kyc_documents", sequelize }
);

export default KycDocument;
