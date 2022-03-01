import { createSlice } from "@reduxjs/toolkit"



const initialThemeState={
    theme:'navy-blue'
}

const themeSlice= createSlice({
    name:'theming',
    initialState:initialThemeState,
    reducers:{
        changeTheme(state, action){
            const {theme}=action.payload
            // console.log('hello from ',action);
            // isThemeDark?state.theme='dark':state.theme='navy-blue'
            state.theme=theme
        }
    }
})


export const changeTheme= themeSlice.actions.changeTheme

export default themeSlice