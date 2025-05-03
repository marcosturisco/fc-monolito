import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "./address";
import InvoiceItems from "./invoice-items.entity";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: InvoiceItems[];
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];

    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = new Address(
            props.street,
            props.number,
            props.complement,
            props.city,
            props.state,
            props.zipCode
        );
        this._items = props.items;
        this.validate();
    }

    validate() {
        if (this._items.length == 0) {
            throw new Error("The invoice should be at least one item");
        }

        const total = this._items.reduce((sum, item) => sum + item.price, 0);
        if (total <= 0) {
            throw new Error("The total of this invoice must be greather than zero");
        }
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItems[] {
        return this._items;
    }
}