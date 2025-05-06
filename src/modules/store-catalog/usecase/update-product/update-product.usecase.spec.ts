import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "../find-product/find-product.usecase";
import UpdateProductUseCase from "./update-product.usecase";

const findProduct = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 0,
});
const updateProduct = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 200,
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(findProduct)),
        update: jest.fn().mockReturnValue(Promise.resolve(updateProduct))
    };
};

describe("update a product usecase unit test", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const findUsecase = new FindProductUseCase(productRepository);
        const updateUsecase = new UpdateProductUseCase(productRepository);

        const findInput = { id: "1" };
        const updateInput = { id: "1", salesPrice: 200 };

        const findResult = await findUsecase.execute(findInput);
        const updateResult = await updateUsecase.execute(updateInput);

        expect(productRepository.find).toHaveBeenCalled();
        expect(productRepository.update).toHaveBeenCalled();

        expect(updateResult.id).toBe(updateProduct.id.id);
        expect(updateResult.name).toBe(updateProduct.name);
        expect(updateResult.description).toBe(updateProduct.description);

        expect(findResult.salesPrice).toBe(findProduct.salesPrice);
        expect(updateResult.salesPrice).toBe(updateProduct.salesPrice);
        expect(findResult.salesPrice).not.toBe(updateResult.salesPrice);
    });
});