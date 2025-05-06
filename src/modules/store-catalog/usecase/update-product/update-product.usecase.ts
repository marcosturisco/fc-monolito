import ProductGateway from "../../gateway/product.gateway";
import { UpdateProductInputDto, UpdateProductOutputDto } from "./update-product.dto";

export default class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductGateway) { }

    async execute(input: UpdateProductInputDto): Promise<UpdateProductOutputDto> {
        const product = await this.productRepository.update(input.id, input.salesPrice);
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };
    }
}