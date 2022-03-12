import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render,screen} from '@testing-library/react'
import {ErrorMessage} from 'components'


describe('test error message with and without refetch action',()=>{
    test('without refetch ation',()=>{
        render(<ErrorMessage>an error occurred</ErrorMessage>)
    
        const errorText =screen.getByText(/an error occurred/i) 
        expect(errorText).toBeInTheDocument()
        const refetchFunction=screen.queryByText(/retry/i)
        expect(refetchFunction).toBeNull()
    })

    test('with refetch action',()=>{
        const action=jest.fn(()=>'api call')
        render(<ErrorMessage refetchAction={action()}>an error occurred</ErrorMessage>)
    
        const errorText =screen.getByText(/an error occurred/i) 
        expect(errorText).toBeInTheDocument()
        const refetchFunction=screen.queryByText(/retry/i)
        expect(refetchFunction).not.toBeNull()
    })
})