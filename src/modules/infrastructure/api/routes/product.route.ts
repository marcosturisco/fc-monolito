import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../product-adm/factory/facade.factory";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();

    try {
        const { name, description, purchasePrice, stock, salesPrice } = req.body;
        const input = {
            name: name,
            description: description,
            purchasePrice: purchasePrice,
            stock: stock,
            salesPrice: salesPrice
        }
        const output = await productFacade.register(input);

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