import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import PersonalDetail from "./personalDetail.model";

class ContactDetail extends Model<
  InferAttributes<ContactDetail>,
  InferCreationAttributes<ContactDetail>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare address: string;
  declare postalAddress: string;
  declare mobileNumber: string;
  declare email: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ContactDetail.init(
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
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "contact_address",
    },
    postalAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "post_address",
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "mobile_number",
    },
    email: { type: DataTypes.STRING, allowNull: false },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "contact_address", sequelize }
);

export default ContactDetail;
