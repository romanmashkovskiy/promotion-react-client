export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';

export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILURE = 'RESTORE_PASSWORD_FAILURE';

export const LOGOUT = 'LOGOUT';

export const authInitialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    db: ''
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case FETCH_USER_REQUEST:
        case RESTORE_PASSWORD_REQUEST:
            return {
                ...authInitialState,
                loading: true
            };
        case CONFIRM_EMAIL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case FETCH_USER_SUCCESS:
        case RESTORE_PASSWORD_SUCCESS:
            return {
                ...authInitialState,
                user: action.user,
                isAuthenticated: true,
                db: action.db
            };
        case CONFIRM_EMAIL_SUCCESS:
            return {
                ...state,
                user: action.user,
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case FETCH_USER_FAILURE:
        case RESTORE_PASSWORD_FAILURE:
            return {
                ...authInitialState,
                error: action.error
            };
        case CONFIRM_EMAIL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case LOGOUT:
            return { ...authInitialState };
        default:
            return state;
    }
};