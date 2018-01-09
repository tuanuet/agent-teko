import axios from 'axios'
import * as types from 'Constants/actionTypes'
import { FETCH_SEARCH_PRODUCTS } from 'Constants/apiTypes'

export const fetchSearchProducts = (name, offset, limit) => {
    return dispatch => {
        return axios.get(FETCH_SEARCH_PRODUCTS, {
            params: { name, start: offset, length: limit }
        }).then(res => res.data).then(res => {
            const { status, data } = res
            if (status) {
                dispatch({ type: `${types.FETCH_SEARCH_PRODUCTS}_SUCCEED`, products: data })
            } else dispatch({ type: `${types.FETCH_SEARCH_PRODUCTS}_FAILED`, error: data })
        })
    }
}

export const addProductToOrder = product => {
    return { type: types.ADD_PRODUCT_TO_ORDER, product }
}

export const changeOrderCount = (id, newCount) => {
    return { type: types.CHANGE_ORDER_COUNT, id, newCount }
}

export const resetOrder = () => {
    return { type: types.RESET_ORDER }
}

export const removeOrderProduct = id => {
    return { type: types.REMOVE_ORDER_PRODUCT, id }
}
