import DELETE_TASK from '../actions/actions-types'

const initialState = {
    events: [
        {
            id: 1,
            isDone: false
        },
    ],
};

const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case DELETE_TASK:
            return { ...state, events: state.events.filter(task => task.id !== payload) }
        default:
            return state;
    }

}
export default taskReducer