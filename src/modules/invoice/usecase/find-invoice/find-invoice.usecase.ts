import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/invoice-items";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto as FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto as FindInvoiceUseCaseOutputDto } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        const result = await this._invoiceRepository.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode,
            },
            items: result.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: result.items.reduce((sum, item) => sum + item.price, 0),
            createdAt: result.createdAt
        }
    }
}