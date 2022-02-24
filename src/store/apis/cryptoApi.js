import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
    // 'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    // 'x-rapidapi-key': '1be1485364msh1d5c9fda0db9418p10a09djsnb6b15963378f',
    'x-access-token': 'coinrankingf19ae80d7c6ff61b3f9ccc78c4baabf20f3a449f722ab8a8' 
}


const baseUrl='https://coinranking1.p.rapidapi.com';

const createRequest=(url)=>({url,headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:(count)=>createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails:builder.query({
            query:(coinId)=>createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query:({coinId,timeperiod})=> createRequest(`coin/${coinId}/history/${timeperiod}`)
        }),
        getExchanges: builder.query({
            query:()=>createRequest('/exchanges')
        })
    })
})

export const {useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery}=cryptoApi