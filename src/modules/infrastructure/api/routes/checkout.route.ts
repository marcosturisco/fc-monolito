import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../store-catalog/factory/facade.factory";
import PlaceOrderUseCase from "../../../checkout/usecase/place-order/place-order.usecase";
import InvoiceFacadeFactory from "../../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../../payment/factory/payment.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();

    try {
        const placeOrderUseCase = new PlaceOrderUseCase(
            clientFacade,
            productFacade,
            catalogFacade,
            null,
            invoiceFacade,
            paymentFacade,
        );

        const input = {
            clientId: req.body.clientId,
            products: req.body.products
        };

        const output = placeOrderUseCase.execute(input);

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})