import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductOutputDto } from "../usecase/add-product/add-product.dto";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
  RegisterProductFacadeInputDto,
  RegisterProductFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
  registerUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;
  private _registerUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUsecase = usecasesProps.addUseCase;
    this._checkStockUsecase = usecasesProps.stockUseCase;
    this._registerUseCase = usecasesProps.registerUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<AddProductOutputDto> {
    // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
    return this._addUsecase.execute(input);
  }

  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }

  register(input: RegisterProductFacadeInputDto): Promise<RegisterProductFacadeOutputDto> {
    return this._registerUseCase.execute(input);
  }
}