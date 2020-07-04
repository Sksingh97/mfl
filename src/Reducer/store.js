import { createStore, combineReducers } from 'redux';
import LoginReducer from './AuthReducer';
import DarkModeReducer from './darkModeReducer';
import LoanReducer from './loanReducer';
const rootReducer = combineReducers(
{ 
    auth: LoginReducer,
    DarkMode: DarkModeReducer,
    loan: LoanReducer

}
);
const configureStore = () => {
return createStore(rootReducer);
}
export default configureStore;