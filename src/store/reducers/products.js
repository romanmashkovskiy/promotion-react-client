export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const GET_PRODUCTS_USER_REQUEST = 'GET_PRODUCTS_USER_REQUEST';
export const GET_PRODUCTS_USER_SUCCESS = 'GET_PRODUCTS_USER_SUCCESS';
export const GET_PRODUCTS_USER_FAILURE = 'GET_PRODUCTS_USER_FAILURE';

export const GET_PRODUCTS_LIST_REQUEST = 'GET_PRODUCTS_LIST_REQUEST';
export const GET_PRODUCTS_LIST_SUCCESS = 'GET_PRODUCTS_LIST_SUCCESS';
export const GET_PRODUCTS_LIST_FAILURE = 'GET_PRODUCTS_LIST_FAILURE';

export const productsInitialState = {
    list: [],
    error: null,
    loading: false,
    currentProduct: null
};

export const productsReducer = (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS_USER_REQUEST:
        case GET_PRODUCTS_LIST_REQUEST:
            return {
                ...productsInitialState,
                loading: true
            };
        case GET_PRODUCTS_USER_SUCCESS:
        case GET_PRODUCTS_LIST_SUCCESS:
            return {
                ...productsInitialState,
                list: action.products
            };
        case GET_PRODUCTS_USER_FAILURE:
        case GET_PRODUCTS_LIST_FAILURE:
            return {
                ...productsInitialState,
                error: action.error
            };
        default:
            return state;
    }
};