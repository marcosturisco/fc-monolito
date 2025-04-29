import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/invoice-items";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoiceItems.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                invoiceId: invoice.id.id
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        },
            {
                include: [InvoiceItemsModel]
            })
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: { id } })

        if (!invoice) {
            throw new Error("Invoice not found")
        }

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
            items: invoice.items.map((item) => new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        })
    }
}