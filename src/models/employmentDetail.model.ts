import sequelize from "../database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class EmploymentDetail extends Model<
  InferAttributes<EmploymentDetail>,
  InferCreationAttributes<EmploymentDetail>
> {
  declare id: CreationOptional<number>;
  declare userId: number | null;

  declare employmentStatus: string;
  declare employerName: string | null;
  declare industry: string | null;
  declare employerAddress: string | null;
  declare employmentDate: Date | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EmploymentDetail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    employmentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "employment_status",
    },
    employerName: { type: DataTypes.STRING, field: "employer_name" },
    industry: { type: DataTypes.STRING },
    employerAddress: { type: DataTypes.TEXT, field: "employer_address" },
    employmentDate: {
      type: DataTypes.DATEONLY,
      field: "employment_date",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { tableName: "employment_detail", sequelize }
);

export default EmploymentDetail;
