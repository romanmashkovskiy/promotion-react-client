import {authInitialState, authReducer} from './auth';

export const initialState = {
    auth: authInitialState
};

export const rootReducer = (state, action) => ({
    auth: authReducer(state.auth, action)
});