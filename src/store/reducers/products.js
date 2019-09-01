export const GET_PRODUCTS_USER_REQUEST = 'GET_PRODUCTS_USER_REQUEST';
export const GET_PRODUCTS_USER_SUCCESS = 'GET_PRODUCTS_USER_SUCCESS';
export const GET_PRODUCTS_USER_FAILURE = 'GET_PRODUCTS_USER_FAILURE';

export const GET_PRODUCTS_LIST_REQUEST = 'GET_PRODUCTS_LIST_REQUEST';
export const GET_PRODUCTS_LIST_SUCCESS = 'GET_PRODUCTS_LIST_SUCCESS';
export const GET_PRODUCTS_LIST_FAILURE = 'GET_PRODUCTS_LIST_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const CLEAR_PRODUCTS_LIST = 'CLEAR_PRODUCTS_LIST';
export const CLEAR_CURRENT_PRODUCT = 'CLEAR_CURRENT_PRODUCT';

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
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_PRODUCTS_USER_SUCCESS:
        case GET_PRODUCTS_LIST_SUCCESS:
            return {
                ...productsInitialState,
                list: action.products
            };
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                currentProduct: action.product
            };
        case GET_PRODUCTS_USER_FAILURE:
        case GET_PRODUCTS_LIST_FAILURE:
            return {
                ...productsInitialState,
                error: action.error
            };
        case GET_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                currentProduct: null
            };
        case CLEAR_PRODUCTS_LIST:
            return {
                ...productsInitialState,
                currentProduct: state.currentProduct
            };
        default:
            return state;
    }
};