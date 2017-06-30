'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/', function(request, response) {
    response.sendFile('index.html', {root: '.'});
});

app.listen(PORT, function() {
    console.log(`beer fellows started server on port: ${PORT}`);
})