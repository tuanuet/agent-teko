import initialState from './initialState'
import * as types from 'Constants/actionTypes'

export default (state = initialState.order, action) => {
    switch (action.type) {
        case `${types.FETCH_SEARCH_PRODUCTS}_SUCCEED`:
            return {
                ...state,
                searchProducts: [...action.products]
            }
        case `${types.FETCH_SEARCH_PRODUCTS}_FAILED`:
            return {
                ...state,
                searchProducts: action.error
            }
        case types.FETCH_MORE_SEARCH_PRODUCTS_SUCCEED:
            return state
        case types.ADD_PRODUCT_TO_ORDER:
            if (state.orderProducts.find(item => item.id === action.product.id)) {
                return {
                    ...state,
                    orderProducts: state.orderProducts.map(item => {
                        if (item.id !== action.product.id) return item
                        return {
                            ...item,
                            count: item.count + 1
                        }
                    })
                }
            } else return {
                ...state,
                orderProducts: [
                    ...state.orderProducts,
                    { ...action.product, count: 1 }
                ]
            }
        case types.CHANGE_ORDER_COUNT:
            return {
                ...state,
                orderProducts: state.orderProducts.map(product => {
                    if (product.id !== action.id) return product
                    return {
                        ...product,
                        count: action.newCount
                    }
                })
            }
        case types.REMOVE_ORDER_PRODUCT:
            return {
                ...state,
                orderProducts: state.orderProducts.filter(product => product.id !== action.id)
            }
        case types.ADD_ORDER_CUSTOMER_INFO:
            return {
                ...state,
                customer: action.customer
            }
        case types.RESET_ORDER:
            return initialState.order
        default:
            return state
    }
}
