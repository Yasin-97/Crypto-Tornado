import React from 'react'
import {screen} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import {renderWithRedux} from 'testUtils'
import {News} from 'mainLayer/index'
import { useGetCryptosQuery } from 'store/apis/cryptoApi'
import { useGetCryptoNewsQuery } from 'store/apis/cryptoNewsApi'
import {testingCoins,testingNews6,testingNews12} from 'testingData'




jest.mock('store/apis/cryptoApi',()=>({useGetCryptosQuery:jest.fn()}))
jest.mock('store/apis/cryptoNewsApi',()=>({useGetCryptoNewsQuery:jest.fn()}))

describe('news',()=>{
    beforeEach(()=>{
        useGetCryptosQuery.mockImplementation(() => ({}));
        useGetCryptoNewsQuery.mockImplementation(() => ({}));
    })


    test("news' loading state",()=>{
        useGetCryptoNewsQuery.mockImplementation(()=>({
            isFetching: true,
        }))

        renderWithRedux(<News number={6} />)

        expect(screen.getByRole("loading")).toBeInTheDocument();
    })

    test("cryptocurrencies' loading state",()=>{
        useGetCryptosQuery.mockImplementation(()=>({
            isFetching: true,
        }))

        renderWithRedux(<News number={6} />)

        expect(screen.getByRole("loading")).toBeInTheDocument();
    })

    test('Error to get News',()=>{
        useGetCryptoNewsQuery.mockImplementation(()=>({
            isError: true,
        }))

        renderWithRedux(<News number={6} />)

        expect(
            screen.getByText(/Falied to get News! try to refetch./i)
          ).toBeInTheDocument();
    })

    test('Error to get cryptos Category',()=>{
        useGetCryptosQuery.mockImplementation(()=>({
            isError: true,
        }))

        renderWithRedux(<News number={6} />)

        expect(
            screen.getByText(/Falied to get News category! try to refetch./i)
          ).toBeInTheDocument();
    })


    test("render nwes without category bar ", () => {
        useGetCryptoNewsQuery.mockImplementation(()=>({
            data:testingNews6
        }))

        renderWithRedux(<News number={6} />);
    
        expect(screen.getAllByRole("news-card-container").length).toBe(6);
        expect(screen.queryByRole('category-bar')).not.toBeInTheDocument()
      });


      test("render nwes with category bar ", () => {
        useGetCryptoNewsQuery.mockImplementation(()=>({
            data:testingNews12
        }))

        useGetCryptosQuery.mockImplementation(()=>({
            data:testingCoins.data.coins.filter(coin=>coin.rank<=10) 
        }))
    
        renderWithRedux(<News />);
    
        expect(screen.getAllByRole("news-card-container").length).toBe(12);
        expect(screen.getByRole('category-bar')).toBeInTheDocument()
        expect(document.querySelector('select option[value="cryptocurrency"]')).toBeInTheDocument()
        expect(document.querySelector('select option[value="Ethereum"]')).not.toBeInTheDocument()
      });

})