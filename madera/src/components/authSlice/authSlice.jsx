import { createSlice } from "@reduxjs/toolkit"

const initialUserState = {
    avatar: '',
    designation: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    phoneNumber: ''
   
}

const initialState = {
    user: initialUserState,
    loaded: false
}

export const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.loaded = true;
        },
        logout: (state) => {
            state.user = initialUserState;
            state.loaded = false;
        },
        loader: (state, action) => {
            state.loaded = action.payload
        }
    }
})

export const {login, logout, loader} = authSlice.actions
export default authSlice.reducer