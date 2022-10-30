import { createSlice } from "@reduxjs/toolkit"



const initialThemeState={
    theme:'dark'
}

const themeSlice= createSlice({
    name:'theming',
    initialState:initialThemeState,
    reducers:{
        changeTheme(state, action){
            const { theme } = action.payload
            state.theme = theme
        }
    }
})


export const changeTheme= themeSlice.actions.changeTheme

export default themeSlice