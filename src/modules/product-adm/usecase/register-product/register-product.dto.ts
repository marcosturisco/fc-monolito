export interface RegisterProductUseCaseInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    salesPrice: number
}

export interface RegisterProductUseCaseOutputDto {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number
}