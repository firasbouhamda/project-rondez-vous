import { DELETE_DATA } from './actions-types'
export const deleteData = (id) => ({
    type: DELETE_DATA,
    payload: id,
});