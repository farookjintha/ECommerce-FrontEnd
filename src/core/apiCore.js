import {API} from '../config';
import queryString from 'query-string';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }

    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error));
}

export const list = (params) => {
    const query = queryString.stringify(params)
    console.log(query);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}