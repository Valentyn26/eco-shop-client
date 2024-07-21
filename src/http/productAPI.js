import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createType = async (name) => {
    const { data } = await $authHost.post('api/type', { name });
    return data;
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
}

export const fetchOneType = async (id) => {
    const { data } = await $host.get('api/type/' + id);
    return data;
}

export const deleteOneType = async (id) => {
    const { data } = await $authHost.delete('api/type/', {
        params: { id }
    });
    return data;
}

export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/product', product, {
        headers: {
            'Access-Control-Allow-Origin': '<origin>',
            'Access-Control-Allow-Methods': 'POST,GET'
        }
    });
    return data;
}

export const fetchProducts = async (typeId, page, limit = 5) => {
    const { data } = await $host.get('api/product', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET'
        },
        params: {
            typeId, page, limit
        }
    });
    return data;
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/product/' + id, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    });
    return data;
}

export const deleteOneProduct = async (id, img) => {
    const { data } = await $authHost.delete('api/product/', {
        params: { id, img }
    });
    return data;
}