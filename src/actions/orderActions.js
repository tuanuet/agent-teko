import axios from 'axios'
import * as types from 'Constants/actionTypes'
import { FETCH_SEARCH_PRODUCTS, FETCH_MORE_SEARCH_PRODUCTS, CREATE_ORDER } from 'Constants/apiTypes'

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

export const fetchMoreSearchProducts = (name, offset, limit) => {
    return dispatch => {
        return axios.get(FETCH_SEARCH_PRODUCTS, {
            params: { name, start: offset, length: limit }
        }).then(res => res.data).then(res => {
            const { status, data } = res
            if (status) {
                dispatch({ type: `${types.FETCH_MORE_SEARCH_PRODUCTS}_SUCCEED`, products: data })
                return data
            } else dispatch({ type: `${types.FETCH_SEARCH_PRODUCTS}_FAILED`, error: data })
        })
    }
}

export const createOrder = data => {
    return dispatch => {
        return axios.post(CREATE_ORDER, data).then(res => res.data).then(res => {
            const { status, orderInfo, err } = res
            console.log(res);
            if (!status) {
                dispatch({ type: `${types.CREATE_ORDER}_SUCCEED`, orderInfo })
                return res
            } else {
                dispatch({ type: `${types.CREATE_ORDER}_FAILED`, error: err })
                return res
            }
        }).catch(err => {
            dispatch({ type: `${types.CREATE_ORDER}_FAILED`, error: err })
            return { status: false, err }
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

export const addOrderCustomerInfo = customer => {
    return { type: types.ADD_ORDER_CUSTOMER_INFO, customer}
}
