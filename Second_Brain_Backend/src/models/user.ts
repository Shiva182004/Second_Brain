import { DataTypes } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  declare share: boolean

  @Column({
    type: DataTypes.STRING
  })
  declare shareToken: string
}
