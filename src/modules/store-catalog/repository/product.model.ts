import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: "product-catalog-table",
  tableName: "products",
  timestamps: false,
})
export default class ProductCatalogModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: true })
  salesPrice: number;
}
