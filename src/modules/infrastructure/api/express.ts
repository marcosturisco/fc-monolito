import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "./routes/client.route";
import { productRoute } from "./routes/product.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";
import { ClientModel } from "../../client-adm/repository/client.model";
import { OrderModel } from "../../checkout/repository/order.model";
import { OrderProductModel } from "../../checkout/repository/order-product.model";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../invoice/repository/invoice-items.model";
import { ProductModel } from "../../product-adm/repository/product.model";

export const app: Express = express();

app.use(express.json());
app.use("/client", clientRoute);
app.use("/product", productRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels(
    [
      ClientModel,
      ProductModel,
      OrderModel,
      OrderProductModel,
      InvoiceModel,
      InvoiceItemsModel
    ]
  );
  await sequelize.sync();
}
setupDb();