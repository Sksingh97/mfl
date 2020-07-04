import { constants } from '../Constants';
export function loginSuccess(auth) {
    console.log("LOGIN ACTION : :: ",auth)
    return {
        type: constants.LOGIN,
        payload: auth
    }
}



export function logOut() {
    return {
        type: constants.LOGOUT,
        payload: 0
    }
}
