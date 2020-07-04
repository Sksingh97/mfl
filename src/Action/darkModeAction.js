import { constants } from '../Constants';
export function toggleColor(scheme) {
    return {
        type: constants.TOGGLE_COLOR,
        payload: scheme
    }
}
