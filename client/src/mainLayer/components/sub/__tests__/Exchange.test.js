import React from 'react'
import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import {Exchange} from 'mainLayer/index'

describe('Exchange',()=>{
    
    const exchangeName='binance'
    const exchangeUrl='www.example.com'
    const exchangeYearEstablished=2015
    const exchangeTradeVolume24hBtcNormalized=1.12

    test('whether year-stablished and url parmas have value',()=>{


        render(
            
                <Exchange  name={exchangeName} url={exchangeUrl}
                year_established={exchangeYearEstablished} trade_volume_24h_btc_normalized={exchangeTradeVolume24hBtcNormalized}/>
        )

        const yearEstablished=screen.getByRole('exchange-year-established')
        const url=screen.getByRole('exchange-url')

        expect(url).toHaveTextContent(exchangeName)
        expect(url).toHaveAttribute('href', exchangeUrl)
        expect(yearEstablished).toHaveTextContent(exchangeYearEstablished)


    })

    test('close and open descripton line on more info button click',async()=>{
        render(<Exchange  name={exchangeName} url={exchangeUrl}
            year_established={exchangeYearEstablished} trade_volume_24h_btc_normalized={exchangeTradeVolume24hBtcNormalized}/>)
    })
})