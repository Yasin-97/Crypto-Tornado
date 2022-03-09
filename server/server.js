const express = require('express');
const cors=require('cors')


const decodeIDToken = require('./authenticateToken');
const crypto=require('./controllers/cryptoCurrrency')
const news=require('./controllers/news')
const userAuthRouter= require('./controllers/userAuth')
const userWatchlistRouter = require('./controllers/userWatchlist');
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.json());
app.use(decodeIDToken); 

app.use('/api/cryptocurrency',crypto)
app.use('/api/news',news)
app.use('/api/user-auth',userAuthRouter)
app.use('/api/user-watchlist', userWatchlistRouter);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '../client','build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});