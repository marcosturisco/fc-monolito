import { v4 as uuidv4 } from 'uuid';
import Product from "../../domain/product.entity";
import ProductAdmGateway from "../../gateway/product.gateway";
import ProductCatalogGateway from "../../../store-catalog/gateway/product.gateway";
import { RegisterProductUseCaseInputDto, RegisterProductUseCaseOutputDto } from "./register-product.dto";
import Id from '../../../@shared/domain/value-object/id.value-object';

export default class RegisterProductUseCase {
    private _productAdmRepository: ProductAdmGateway;
    private _productCatalogRepository: ProductCatalogGateway;

    constructor(productAdmRepository: ProductAdmGateway, productCatalogRepository: ProductCatalogGateway) {
        this._productAdmRepository = productAdmRepository;
        this._productCatalogRepository = productCatalogRepository;
    }

    async execute(input: RegisterProductUseCaseInputDto): Promise<RegisterProductUseCaseOutputDto> {
        const productInputDto = new Product({
            id: new Id(input.id || uuidv4()),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        });
        await this._productAdmRepository.add(productInputDto);
        await this._productCatalogRepository.update(productInputDto.id.id, input.salesPrice);
        return {
            id: productInputDto.id.id,
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        };
    }
}  