import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../../invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    try {
        const invoiceFacade = InvoiceFacadeFactory.create();
        const output = invoiceFacade.find({ id: req.body.invoiceId });
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});