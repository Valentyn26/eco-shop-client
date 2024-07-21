import { $authHost, $host } from "./index";

export const createBasketProduct = async (basketId, productId, count) => {
    const { data } = await $authHost.post('api/basket', { basketId, productId, count });
    return data;
}

export const fetchBasketProducts = async (basketId) => {
    const { data } = await $authHost.get('api/basket', {
        params: {
            basketId
        }
    });
    return data;
}

export const deleteBasketProduct = async (basketId, productId, id = null) => {
    const { data } = await $authHost.delete('api/basket', {
        params: {
            basketId,
            productId,
            id
        }
    });
    return data;
}