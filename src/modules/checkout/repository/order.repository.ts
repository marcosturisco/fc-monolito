import Id from "../../@shared/domain/value-object/id.value-object";
import { ClientModel } from "../../client-adm/repository/client.model";
import ProductCatalogModel from "../../store-catalog/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderProductModel } from "./order-product.model";
import { OrderModel } from "./order.model";

export default class OrderRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id.id,
            clientId: order.client.id.id,
            status: order.status,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        await Promise.all(order.products.map((p) => {
            return OrderProductModel.create({
                orderId: order.id.id,
                productId: p.id.id
            });
        }));
    }

    async findOrder(id: string): Promise<Order | null> {
        const order = await OrderModel.findOne({ where: { id } });
        if (!order) return null;

        const orderProducts = await OrderProductModel.findAll({ where: { orderId: id } });
        const productIds = orderProducts.map(op => op.productId);
        const productsData = await ProductCatalogModel.findAll({
            where: { id: productIds }
        });
        const products = productsData.map(p => new Product({
            id: new Id(p.id),
            name: p.name,
            description: p.description ?? "",
            salesPrice: p.salesPrice,
        }));

        const clientData = await ClientModel.findOne({ where: { id: order.clientId } });
        const client = new Client({
            id: new Id(clientData.id),
            name: clientData.name,
            email: clientData.email,
            address: clientData.street
        });

        return new Order({
            id,
            client,
            products,
            status: order.status,
        });
    }
}