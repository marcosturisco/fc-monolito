import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import { InvoiceItemsModel } from "../repository/invoiceItems.model"
import InvoiceRepository from "../repository/invoice.repository"
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase"
import InvoiceFacade from "./invoice.facade"
import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "../domain/invoice-items"
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"

describe("Invoice Facade test", () => {

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

    it("should create and find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            id: "1",
            name: "Invoice A",
            document: "Document A",
            street: "Street 123",
            number: "99",
            complement: "Apt 104",
            city: "SS",
            state: "ST",
            zipCode: "99999-999",
            items: [
                {
                    id: "1",
                    name: "Item A",
                    price: 100
                }
            ]
        }

        await facade.generate(input)

        const invoice = await InvoiceModel.findOne({ where: { id: "1" }, include: [InvoiceItemsModel] })

        expect(invoice.name).toBe(input.name)
        expect(invoice.document).toBe(input.document)
        expect(invoice.street).toBe(input.street)
        expect(invoice.number).toBe(input.number)
        expect(invoice.complement).toBe(input.complement)
        expect(invoice.city).toBe(input.city)
        expect(invoice.state).toBe(input.state)
        expect(invoice.zipCode).toBe(input.zipCode)
        expect(invoice.items.length).toBe(1)
        expect(invoice.items[0].name).toBe(input.items[0].name)
        expect(invoice.items[0].price).toBe(input.items[0].price)
    })
})