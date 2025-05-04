import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../../invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const invoiceFacade = InvoiceFacadeFactory.create();
        const output = await invoiceFacade.find({ id: id });

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});