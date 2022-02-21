import React from 'react'
import {render,screen,fireEvent}from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import ThemeToggle from '../ThemeToggle'

const setTheme=theme=>theme
test('changes theme on clicking',()=>{
    render(<ThemeToggle setTheme={()=>setTheme()}/>)
     const checkbox=screen.getByRole(/toggle-btn/i)
     
     expect(checkbox).toBeInTheDocument()
     expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)

     expect(checkbox).toBeChecked()

})