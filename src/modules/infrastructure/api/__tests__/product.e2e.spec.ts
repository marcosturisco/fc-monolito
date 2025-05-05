import express, { Express } from "express";
import request from "supertest";
import { migrator } from "../../../../migrations/config/migrator";
import { Sequelize } from "sequelize-typescript";
import { ProductAdmModel } from "../../../product-adm/repository/product.model";
import ProductCatalogModel from "../../../store-catalog/repository/product.model";
import { Umzug } from "umzug";
import { productRoute } from "../routes/product.route";

describe("E2E test for product", () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;

    const app = express();
    app.use(express.json());
    app.use("/product", productRoute);

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        });

        sequelize.addModels([ProductAdmModel, ProductCatalogModel]);
        migration = migrator(sequelize);
        await migration.up();
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        };
        migration = migrator(sequelize);
        await migration.down();
        await sequelize.close();
    })

    it("should create a product", async () => {
        const input = {
            "name": "Product 1",
            "description": "Description",
            "purchasePrice": 100,
            "stock": 100,
            "salesPrice": 250
        };
        const response = await request(app).post("/product").send(input);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Description");
        expect(response.body.purchasePrice).toBe(100);
    });
});