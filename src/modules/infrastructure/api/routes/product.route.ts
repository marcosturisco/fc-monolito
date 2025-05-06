import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import ProductAdmFacadeFactory from "../../../product-adm/factory/facade.factory";
import Id from "../../../@shared/domain/value-object/id.value-object";
import StoreCatalogFacadeFactory from "../../../store-catalog/factory/facade.factory";
import ProductCatalogModel from "../../../store-catalog/repository/product.model";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productAdmFacade = ProductAdmFacadeFactory.create();
    const productCatalogFacade = StoreCatalogFacadeFactory.create();

    try {
        const id = uuidv4();
        const { name, description, purchasePrice, stock, salesPrice } = req.body;
        const inputAdmProduct = {
            id: id,
            name: name,
            description: description,
            purchasePrice: purchasePrice,
            stock: stock
        }
        const output = await productAdmFacade.addProduct(inputAdmProduct);
        await productCatalogFacade.update({ id: output.id, salesPrice: salesPrice });

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})

productRoute.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const productFacade = ProductAdmFacadeFactory.create();
        const input = { productId: id };
        const output = await productFacade.checkStock(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});