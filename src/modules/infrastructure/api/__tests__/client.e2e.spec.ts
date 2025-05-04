import request from "supertest";
import { app, sequelize } from "../express";
import { ClientModel } from "../../../client-adm/repository/client.model";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({ alter: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

    it("should create a client", async () => {
        const input = {
            "name": "Client 1",
            "email": "client1@monolito.com",
            "document": "Document 1",
            "street": "Street 1",
            "number": "1",
            "complement": "",
            "city": "City 1",
            "state": "State 1",
            "zipCode": "00001"
        }
        const response = await request(app).post("/client").send(input);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1");
        expect(response.body.email).toBe("client1@monolito.com");
        expect(response.body.document).toBe("Document 1");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.city).toBe("City 1");
        expect(response.body.address.state).toBe("State 1");
        expect(response.body.address.number).toBe("1");
        expect(response.body.address.zipCode).toBe("00001");
    });

    it("should find a client", async () => {
        const inputCreate = {
            "name": "Client 1",
            "email": "client1@monolito.com",
            "document": "Document 1",
            "street": "Street 1",
            "number": "1",
            "complement": "",
            "city": "City 1",
            "state": "State 1",
            "zipCode": "00001"
        }
        const clientDb = await request(app).post("/client").send(inputCreate);
        const response = await request(app).get(`/client/${clientDb.body.id}`).send();

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1");
        expect(response.body.email).toBe("client1@monolito.com");
        expect(response.body.document).toBe("Document 1");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.city).toBe("City 1");
        expect(response.body.address.state).toBe("State 1");
        expect(response.body.address.number).toBe("1");
        expect(response.body.address.zipCode).toBe("00001");
    });
});