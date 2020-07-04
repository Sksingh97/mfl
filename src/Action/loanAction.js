import { constants } from '../Constants';
export function setSelectedLoan(loanId) {
    return {
        type: constants.SELECT_LOAN,
        payload: loanId
    }
}

export function setCustomerList(list) {
    return {
        type: constants.SET_CUSTOMER_LIST,
        payload: list
    }
}