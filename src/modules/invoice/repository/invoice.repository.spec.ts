import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import { InvoiceItemsModel } from "./invoiceItems.model"
import Invoice from "../domain/invoice.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "../domain/invoice-items.entity"
import InvoiceRepository from "./invoice.repository"

describe("Invoice Repository test", () => {
    let sequelize: Sequelize
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    })
    afterEach(async () => {
        await sequelize.close()
    })

    it("should generate an invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice A",
            document: "Document A",
            street: "Street 123",
            number: "99",
            complement: "Apt 104",
            city: "SS",
            state: "ST",
            zipCode: "99999-999",
            items: [
                new InvoiceItems({ id: new Id("1"), name: "Item A", price: 100 })
            ]
        })

        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" } })

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual(invoice.id.id)
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.street).toEqual(invoice.address.street)
        expect(invoiceDb.number).toEqual(invoice.address.number)
        expect(invoiceDb.complement).toEqual(invoice.address.complement)
        expect(invoiceDb.city).toEqual(invoice.address.city)
        expect(invoiceDb.state).toEqual(invoice.address.state)
        expect(invoiceDb.zipCode).toEqual(invoice.address.zipCode)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
    })

    it("should find an invoice", async () => {
        const invoice = await InvoiceModel.create({
            id: "1",
            name: "Invoice A",
            document: "Document A",
            street: "Street 123",
            number: "99",
            complement: "Apt 104",
            city: "SS",
            state: "ST",
            zipCode: "99999-999",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [
                new InvoiceItemsModel({ id: "1", name: "Item A", price: 100, invoiceId: "1" })
            ]
        })

        const repository = new InvoiceRepository()
        const result = await InvoiceModel.findOne({ where: { id: "1" } })

        expect(result.id).toEqual(invoice.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.street).toEqual(invoice.street)
        expect(result.number).toEqual(invoice.number)
        expect(result.complement).toEqual(invoice.complement)
        expect(result.city).toEqual(invoice.city)
        expect(result.state).toEqual(invoice.state)
        expect(result.zipCode).toEqual(invoice.zipCode)
        expect(result.createdAt).toStrictEqual(invoice.createdAt)
        expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    })
})