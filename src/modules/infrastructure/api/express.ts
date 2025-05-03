import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
//import CustomerModel from "../customer/repository/sequelize/customer.model";
//import ProductModel from "../product/repository/sequelize/product.model";
//import { customerRoute } from "./routes/customer.route";
import { clientRoute } from "./routes/client.route";
import { productRoute } from "./routes/product.route";
import { ClientModel } from "../../client-adm/repository/client.model";
import ProductModel from "../../store-catalog/repository/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/client", clientRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel, ProductModel]);
  await sequelize.sync();
}
setupDb();