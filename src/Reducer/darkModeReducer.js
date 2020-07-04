import { constants } from '../Constants';
const initialState = {
colorSchem: "Light"
};
const DarkModeReducer = (state = initialState, action) => {
switch(action.type) {
    case constants.TOGGLE_COLOR:
        return {
            ...state,
            colorSchem:action.payload
        };
    default:
        return state;
    }
}
export default DarkModeReducer;