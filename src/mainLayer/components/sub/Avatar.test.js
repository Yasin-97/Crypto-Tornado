
import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider,useSelector } from "react-redux";

import Avatar from './Avatar'
import store from '../../../store/store'
import {authActions} from "../../../store/slices/authSlice";



describe('avatar',()=>{
    test ('test existence of avatar',()=>{
        const user={email:'yasin@gmail.com', displayName:'yasin'}
        store.dispatch(authActions.setUser(user))

        render(
            <Provider store={store}>
                <Avatar />
            </Provider>
        )

        const avatar=screen.getByRole('avatar-name')
        expect(avatar).toHaveTextContent(user.displayName||user.email) 

    })
})