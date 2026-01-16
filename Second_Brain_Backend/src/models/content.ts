import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

export type ContentType = "document" | "tweet" | "youtube" | "link";

@Table({
  tableName: "Contents",
  timestamps: true,
})
export class Content extends Model {
  @Column({
    type: DataType.ENUM("document", "tweet", "youtube", "link"),
    allowNull: false,
  })
  declare type: ContentType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare link: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  declare tags: string[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;
}
