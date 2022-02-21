
import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { screen } from "@testing-library/react";
import { createStore, renderWithRedux } from "../../../../testUtils";

import Avatar from '../Avatar'
import {authActions} from "../../../../store/slices/authSlice";
 


describe('avatar',()=>{
    test ('avatar exists',()=>{
        const store=createStore()
        const user={email:'john@gmail.com', displayName:'john'}
        store.dispatch(authActions.setUser(user))
        
            renderWithRedux(<Avatar />,{store})

        const avatar=screen.getByRole('avatar-name')
        expect(avatar).toHaveTextContent(user.displayName||user.email)  

    })
})
