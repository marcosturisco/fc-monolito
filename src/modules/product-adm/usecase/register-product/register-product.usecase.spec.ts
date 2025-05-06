import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../../store-catalog/domain/product.entity";
import FindProductUseCase from "../../../store-catalog/usecase/find-product/find-product.usecase";
import RegisterProductUseCase from "./register-product.usecase";

const productToBeRegistered = {
    id: "1",
    name: "Product",
    description: "Product description",
    purchasePrice: 100,
    stock: 10,
    salesPrice: 200
};

const productToBeFound = new Product({
    id: new Id("1"),
    name: "Product",
    description: "Product description",
    salesPrice: 200
});

const MockProductAdmRepository = () => {
    return {
        find: jest.fn(),
        add: jest.fn()
    };
};
const MockProductCatalogRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(productToBeFound)),
        findAll: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(productToBeRegistered))
    };
};

describe("Register a product usecase unit test", () => {
    it("should register a product in both domains adm and catalog", async () => {
        const productAdmRepository = MockProductAdmRepository();
        const productCatalogRepository = MockProductCatalogRepository();
        const productRegisterUseCase = new RegisterProductUseCase(
            productAdmRepository,
            productCatalogRepository
        );
        const productFindUseCase = new FindProductUseCase(productCatalogRepository);

        const inputUpdate = {
            id: "1",
            name: "Product",
            description: "Product description",
            purchasePrice: 100,
            stock: 10,
            salesPrice: 200
        };
        const inputFind = { id: "1" };

        const resultUpdate = await productRegisterUseCase.execute(inputUpdate);
        const resultFind = await productFindUseCase.execute(inputFind);

        expect(productCatalogRepository.update).toHaveBeenCalled();
        expect(resultUpdate.id).toBe(productToBeRegistered.id);
        expect(resultUpdate.name).toBe(productToBeRegistered.name);
        expect(resultUpdate.description).toBe(productToBeRegistered.description);
        expect(resultUpdate.purchasePrice).toBe(productToBeRegistered.purchasePrice);
        expect(resultUpdate.stock).toBe(productToBeRegistered.stock);
        expect(productToBeRegistered.salesPrice).toBe(resultFind.salesPrice);
    });
});