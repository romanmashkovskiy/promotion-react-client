export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const LOGOUT = 'LOGOUT';

export const authInitialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case FETCH_USER_REQUEST:
            return {
                ...authInitialState,
                loading: true
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case FETCH_USER_SUCCESS:
            return {
                ...authInitialState,
                user: action.user,
                isAuthenticated: true
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case FETCH_USER_FAILURE:
            return {
                ...authInitialState,
                error: action.error
            };
        case LOGOUT:
            return {...authInitialState};
        default:
            return state;
    }
};