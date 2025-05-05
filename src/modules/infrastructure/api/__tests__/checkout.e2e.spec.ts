import express, { Express } from "express";
import request from "supertest";
import { migrator } from "../../../../migrations/config/migrator";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { checkoutRoute } from "../routes/checkout.route";
import { ClientModel } from "../../../client-adm/repository/client.model";
import { OrderModel } from "../../../checkout/repository/order.model";
import { OrderProductModel } from "../../../checkout/repository/order-product.model";
import TransactionModel from "../../../payment/repository/transaction.model";
import { InvoiceModel } from "../../../invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../../invoice/repository/invoice-items.model";
import { ProductAdmModel } from "../../../product-adm/repository/product.model";
import ProductCatalogModel from "../../../store-catalog/repository/product.model";
import { clientRoute } from "../routes/client.route";
import { productRoute } from "../routes/product.route";

describe("E2E test for checkout", () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;

    const app = express();

    app.use(express.json());
    app.use("/client", clientRoute);
    app.use("/product", productRoute);
    app.use("/checkout", checkoutRoute);

    const migrationModels = [
        ProductAdmModel,
        ProductCatalogModel,
    ];

    const syncModels = [
        ClientModel,
        OrderModel,
        OrderProductModel,
        TransactionModel,
        InvoiceModel,
        InvoiceItemsModel,
    ];

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        });

        await sequelize.addModels(syncModels);
        for (const model of syncModels) {
            await model.sync();
        }
        await sequelize.addModels(migrationModels);

        const migration = migrator(sequelize);
        await migration.up();
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize);
        await migration.down();
        await sequelize.close();
    })

    it("should create an order", async () => {
        const inputClient = {
            "name": "Client 1",
            "email": "client1@monolito.com",
            "document": "Document 1",
            "street": "Street 1",
            "number": "1",
            "complement": "",
            "city": "City 1",
            "state": "State 1",
            "zipCode": "00001"
        }
        const inputProduct1 = {
            "name": "Product 1",
            "description": "Description",
            "purchasePrice": 100,
            "stock": 100,
            "salesPrice": 250
        };
        const inputProduct2 = {
            "name": "Product 2",
            "description": "Description",
            "purchasePrice": 100,
            "stock": 100,
            "salesPrice": 250
        };

        const clientResponse = await request(app).post("/client").send(inputClient);
        const product1Response = await request(app).post("/product").send(inputProduct1);
        const product2Response = await request(app).post("/product").send(inputProduct2);
        const inputOrder = {
            "clientId": clientResponse.body.id,
            "products": [
                {
                    "productId": product1Response.body.id
                },
                {
                    "productId": product2Response.body.id
                }
            ]
        }

        const response = await request(app).post("/checkout").send(inputOrder);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("approved");
        expect(response.body.total).toBe(500);
        expect(response.body.products[0].productId).toBeDefined();
        expect(response.body.products[1].productId).toBeDefined();
    });
});