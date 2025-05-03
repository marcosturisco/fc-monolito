import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "order",
    timestamps: false
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @Column({ allowNull: false })
    clientId: string

    @Column({ allowNull: false })
    status: string

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}