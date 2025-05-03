import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../product-adm/factory/facade.factory";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();

    try {
        const input = { productId: req.body.productId };
        const output = await productFacade.checkStock(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})