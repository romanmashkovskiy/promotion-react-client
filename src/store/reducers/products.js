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
    products: [],
    error: null,
    loading: false,
    currentProduct: null
};

// export const productsReducer = (state, action) => {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//         case REGISTER_REQUEST:
//             return {
//                 ...authInitialState,
//                 loading: true
//             };
//         case LOGIN_SUCCESS:
//         case REGISTER_SUCCESS:
//             return {
//                 ...authInitialState,
//                 user: action.user,
//                 isAuthenticated: true
//             };
//         case LOGIN_FAILURE:
//         case REGISTER_FAILURE:
//             return {
//                 ...authInitialState,
//                 error: action.error
//             };
//         default:
//             return state;
//     }
// };