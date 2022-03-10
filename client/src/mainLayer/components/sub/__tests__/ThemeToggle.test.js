import React from 'react'
import {render,screen,fireEvent}from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { createStore,renderWithRedux } from "testUtils";
import { changeTheme } from 'store/slices/themeSlice';
import {ThemeToggle} from 'mainLayer/index'

test('changes theme on clicking',()=>{
    const fn=jest.fn()
    const store=createStore()

    store.dispatch(changeTheme({theme:'dark'}))

    renderWithRedux(<ThemeToggle closeMenu={fn}/>)
     const checkbox=screen.getByRole(/toggle-btn/i) 
     
     expect(checkbox).toBeInTheDocument()
     expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)

     expect(checkbox).toBeChecked()

})