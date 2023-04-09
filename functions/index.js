import functions from 'firebase-functions'
import express from 'express'
import bodyParser from 'body-parser';
import { congregateSearch } from './controllers/congregateCont.js';
import cors from 'cors'
const app = express()


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors())

app.get('/search', async (req, res) => {
    console.log("Searching for : " + req.query.search)
    await congregateSearch(req.query.search)
        .then((data)=>res.status(200).json({success: true, method: 'search' ,result: data}))
        .catch((error)=> {
            res.status(401).json({success:false, error: error })
        })
})

// app.listen(3800, ()=> {console.log('Running on port 3800')})

export const widgets = functions.runWith({timeoutSeconds: 300, memory: "1GB",}).https.onRequest(app);
