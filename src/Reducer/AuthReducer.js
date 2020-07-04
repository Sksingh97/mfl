import { constants } from '../Constants';
const initialState = {
AuthStatus: 0,
Phone:null,
};
const LoginReducer = (state = initialState, action) => {
switch(action.type) {
    case constants.LOGIN:
        console.log("LOGIN REDUCER :: : : ",action.payload)
        return {
            ...state,
            AuthStatus:1,
            Phone:action.payload.email
        };
    case constants.LOGOUT:
        console.log("PAYLOAD FOR LOGOUT : : :",action.payload)
        return {
            ...state,
            AuthStatus:action.payload
        }
    default:
        return state;
    }
}
export default LoginReducer;