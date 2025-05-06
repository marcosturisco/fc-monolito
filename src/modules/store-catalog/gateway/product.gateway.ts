import Product from "../domain/product.entity";

export default interface ProductGateway {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
  update(id: string, salesPrice: number): Promise<Product>;
}
