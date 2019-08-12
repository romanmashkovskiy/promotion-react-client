import { authInitialState, authReducer } from './auth';
import { productsInitialState, productsReducer } from './products';

export const initialState = {
    auth: authInitialState,
    products: productsInitialState
};

export const rootReducer = (state, action) => ({
    auth: authReducer(state.auth, action),
    products: productsReducer(state.products, action),
});