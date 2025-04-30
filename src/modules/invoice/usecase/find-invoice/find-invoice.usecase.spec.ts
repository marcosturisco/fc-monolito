import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice-items";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice A",
    document: "Document A",
    street: "Rua 123",
    number: "99",
    complement: "Casa Verde",
    state: "Criciúma",
    city: "SC",
    zipCode: "88888-888",
    items: [
        new InvoiceItems(
            {
                id: new Id("1"),
                name: "Item One",
                price: 100
            }
        ),
        new InvoiceItems(
            {
                id: new Id("2"),
                name: "Item Two",
                price: 0
            }
        )
    ]
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

const MockRepositoryValidate = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockImplementation(() => {
            return Promise.resolve(
                new Invoice({
                    id: new Id("1"),
                    name: "Invoice A",
                    document: "Document A",
                    street: "Rua 123",
                    number: "99",
                    complement: "Casa Verde",
                    state: "Criciúma",
                    city: "SC",
                    zipCode: "88888-888",
                    items: []
                })
            );
        }),
    }
}

const MockRepositoryValidateValue = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockImplementation(() => {
            return Promise.resolve(
                new Invoice({
                    id: new Id("1"),
                    name: "Invoice A",
                    document: "Document A",
                    street: "Rua 123",
                    number: "99",
                    complement: "Casa Verde",
                    state: "Criciúma",
                    city: "SC",
                    zipCode: "88888-888",
                    items: [
                        new InvoiceItems({ id: new Id("1"), name: "Invalid Item", price: 0 })
                    ]
                })
            );
        }),
    }
}

describe("Find Invoice use case unit test", () => {

    it("should find an invoice", async () => {
        const repository = MockRepository()
        const usecase = new FindInvoiceUseCase(repository)

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toEqual(input.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.address.street).toEqual(invoice.address.street)
        expect(result.address.number).toEqual(invoice.address.number)
        expect(result.address.complement).toEqual(invoice.address.complement)
        expect(result.address.city).toEqual(invoice.address.city)
        expect(result.address.state).toEqual(invoice.address.state)
        expect(result.address.zipCode).toEqual(invoice.address.zipCode)
        expect(result.createdAt).toEqual(invoice.createdAt)
    })

    it("should validate invoice items", async () => {
        const repository = MockRepositoryValidate()
        const usecase = new FindInvoiceUseCase(repository)

        const input = {
            id: "1"
        }

        await expect(usecase.execute(input)).rejects.toThrowError("The invoice should be at least one item");
    })

    it("should validate total value of an invoice", async () => {
        const repository = MockRepositoryValidateValue()
        const usecase = new FindInvoiceUseCase(repository)

        const input = {
            id: "1"
        }

        await expect(usecase.execute(input)).rejects.toThrowError("The total of this invoice must be greather than zero");
    })
})