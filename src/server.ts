import express = require("express");
import {request} from 'https'
import { StringDecoder } from 'string_decoder';

const app = express();
const port = 8000;
const API_KEY = 'gUd2reuXtHMoniTWhimRu03A25snbsiEOhnygXND'

app.use(express.json());
const router = express.Router();

router.get('/test', (req, res) => res.send('Hello world !'));
router.get('/rovers', (req, res) => {
    const nasaReq = request(
        {
            host: 'api.nasa.gov',
            path: `/mars-photos/api/v1/rovers?api_key=${API_KEY}`,
            method: 'GET'
        },
        response => {
            const chunks: Buffer[] = [];

            function onData(chunk: Buffer) {
                chunks.push(chunk);
            }

            function onEnd() {
                const decoder = new StringDecoder('utf8');
                let message = "";
                for (const chunk of chunks) {
                    message += decoder.write(chunk);
                }
                res.send(message);
            }

            response.on('data', onData);
            response.on('end', onEnd);
        }
    )

    nasaReq.end();
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});