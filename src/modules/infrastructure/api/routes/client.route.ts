import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../client-adm/factory/client-adm.facade.factory";
import Address from "../../../@shared/domain/value-object/address";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();

    try {
        const { name, email, document, street, number, complement, city, state, zipCode } = req.body
        const clientAddress = new Address(street, number, complement, city, state, zipCode);
        const input = {
            name: name,
            email: email,
            document: document,
            address: clientAddress
        }
        const output = await clientFacade.add(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})

clientRoute.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const clientFacade = ClientAdmFacadeFactory.create();

    try {
        const input = { id: id };
        const output = await clientFacade.find(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});