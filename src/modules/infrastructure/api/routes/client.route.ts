import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../client-adm/factory/client-adm.facade.factory";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();

    try {
        const input = { id: req.body.clientId };
        const output = await clientFacade.find(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})