import { constants } from '../Constants';
const initialState = {
currentLoan:"",
coustomerList:[]
};
const LoanReducer = (state = initialState, action) => {
switch(action.type) {
    case constants.SELECT_LOAN:
        console.log("setting current loan :: : : ",action.payload)
        return {
            ...state,
            currentLoan:action.payload
        };
    case constants.SET_CUSTOMER_LIST:
        console.log("SET CUSTOMER LIST : : : ",action.payload)
        return {
            ...state,
            coustomerList:[...action.payload]
        };
    default:
        return state;
    }
}
export default LoanReducer;