import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._types = [];
        this._products = [];
        this._basketProducts = [];
        this._selectedType = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setProducts(products) {
        this._products = products;
    }

    setBasketProducts(basketProducts) {
        this._basketProducts = basketProducts;
    }

    setSelectedType(type) {
        this._selectedType = type;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    setLimit(limit) {
        this._limit = limit;
    }


    get types() {
        return this._types;
    }

    get products() {
        return this._products;
    }

    get basketProducts() {
        return this._basketProducts;
    }

    get selectedType() {
        return this._selectedType;
    }

    get page() {
        return this._page;
    }

    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }
}