import { AddProductOutputDto } from "../usecase/add-product/add-product.dto";

export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadeOutputDto {
  productId: string;
  stock: number;
}

export interface RegisterProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  salesPrice: number
}

export interface RegisterProductFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number
}

export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<AddProductOutputDto>;
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
  register(input: RegisterProductFacadeInputDto): Promise<RegisterProductFacadeOutputDto>;
}