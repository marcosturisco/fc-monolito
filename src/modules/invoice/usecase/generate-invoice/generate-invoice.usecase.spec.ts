import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice-items";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    }
}

describe("Generate Invoice use case unit test", () => {

    it("should generate an invoice", async () => {
        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

        const input = {
            name: "Invoice A",
            document: "Document A",
            street: "123 Street",
            number: "99",
            complement: "Green House",
            city: "City A",
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

        const result = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(input.name)
        expect(result.document).toEqual(input.document)
        expect(result.street).toEqual(input.street)
        expect(result.number).toEqual(input.number)
        expect(result.complement).toEqual(input.complement)
        expect(result.city).toEqual(input.city)
        expect(result.state).toEqual(input.state)
        expect(result.zipCode).toEqual(input.zipCode)
    })
})