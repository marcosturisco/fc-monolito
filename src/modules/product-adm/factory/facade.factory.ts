import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import ProductCatalogRepository from "../../store-catalog/repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import RegisterProductUseCase from "../usecase/register-product/register-product.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const productCatalogRepository = new ProductCatalogRepository();

    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const registerUseCase = new RegisterProductUseCase(productRepository, productCatalogRepository);

    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
      registerUseCase: registerUseCase
    });

    return productFacade;
  }
}