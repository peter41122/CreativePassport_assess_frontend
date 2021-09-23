// ** Initial State
const initialState = {
    data : {},
}

const board = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return { ...state, data : action.payload }
            
        default:
            return { ...state }
    }
}
export default board
  