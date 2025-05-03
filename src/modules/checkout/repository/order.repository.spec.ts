import { Sequelize } from "sequelize-typescript"
import { OrderModel } from "./order.model"
import { OrderProductModel } from "./order-product.model"
import Id from "../../@shared/domain/value-object/id.value-object"
import OrderRepository from "./order.repository"
import Client from "../domain/client.entity"
import Product from "../domain/product.entity"
import Order from "../domain/order.entity"

describe("Order Repository test", () => {
    let sequelize: Sequelize
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([OrderModel, OrderProductModel])
        await sequelize.sync()
    })
    afterEach(async () => {
        await sequelize.close()
    })

    it("should create an order", async () => {
        const clientOrder = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "client1@gmail.com",
            address: "Address Client 1"
        });
        const productsOrder = [
            new Product({
                id: new Id("1"),
                name: "Product 1",
                description: "Description 1",
                salesPrice: 10
            }),
            new Product({
                id: new Id("2"),
                name: "Product 2",
                description: "Description 2",
                salesPrice: 20
            })
        ];

        const repository = new OrderRepository();
        const order = new Order({
            id: "1",
            client: clientOrder,
            products: productsOrder
        })
        await repository.addOrder(order);

        const orderDb = await OrderModel.findOne({ where: { id: order.id.id } });
        const productsOrderDb = await OrderProductModel.findAll({ where: { orderId: order.id.id } });

        expect(orderDb.id).toEqual(order.id.id);
        expect(orderDb.clientId).toEqual(order.client.id.id);
        expect(orderDb.createdAt).toStrictEqual(order.createdAt)
        expect(orderDb.updatedAt).toStrictEqual(order.updatedAt)
        expect(productsOrderDb[0].productId).toEqual(productsOrder[0].id.id);
        expect(productsOrderDb[1].productId).toEqual(productsOrder[1].id.id);
        expect(productsOrderDb.length).toEqual(2);
    });
})