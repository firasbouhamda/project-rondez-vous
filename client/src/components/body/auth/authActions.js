import axios from 'axios'
const CLIENT_ADDED = 'CLIENT_ADDED';
const CLIENT_ADD_FAIL = 'CLIENT_ADD_FAIL';
export const addClient = (info) => (dispatch) => {
    axios.post('/client', info)
        .then((res) => dispatch({
            type: CLIENT_ADDED,
            payload: res.data,
        }))
        .catch((err) => dispatch({
            type: CLIENT_ADD_FAIL,
            payload: err.response.data.errors,
        }));
}