const express = require('express');
const crypto = require('crypto');
const { request } = require('http');
const app = express();

app.use(express.json());
app.get('/info', (request, response) => {
    const data = {message: "Endpoint de negociacion"}
    const accept = request.accepts(['json', 'xml', 'html']);

    if (accept === 'json') {
        response.json(data);
    } else if (accept === 'xml') {
        response.type('application/xml');
        response.send(`<message>${data.message}</message>`);
    } else if (accept === 'html') {
        response.send(`<h1>${data.message}</h1>`);
    } else {
        response.status(406);
    }
});

app.get('/preferencia', (request, response) => {
    const data = {message: "Endpoint de factores de calidad"}
    const accept = request.accepts(['json', 'xml', 'html']);

    if (accept === 'json') {
        response.json(data);
    } else if (accept === 'xml') {
        response.type('application/xml');
        response.send(`<message>${data.message}</message>`);
    } else if (accept === 'html') {
        response.send(`<h1>${data.message}</h1>`);
    } else {
        response.status(406);
    }
});

app.get('/cache', (request, response) => {
    response.set({
        'Cache-Control': 'public, max-age=30',
        'Expires': new Date(Date.now() + 6000).toUTCString(),
        'Pragma': 'no-cache'
    });
    response.json({message: "Endpoint de cache de 30 segundos"});

});

app.get('/etag', (request, response) => {
    const content = {message: "Endpoint de e-tag modificado"}
    const jsonString = JSON.stringify(content);
    const etag = crypto.createHash('md5').update(jsonString).digest('hex');
    if (request.header['if-none-match'] == etag) {
        return response.status(304);
    }
    response.set('Etag', etag);
    response.json(content);
});

app.listen(3000, () => {
    console.log("Server escuchando en el puerto 3000");
});