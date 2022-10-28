const fs = require("fs");
const http = require('http');

const port = process.env.PORT || 8000;
function SendCompleteJSON (data, res) {
    let pets = JSON.parse(data);
    console.log(pets);
    var petsJSON = JSON.stringify(pets);
    res.setHeader('Content-Type', 'application/json');
    res.end(petsJSON); 
}
function foOOOOfo(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
}

const server = http.createServer(function(req, res) {
    console.log(req.url)
    var splitter = req.url.split("/");
    console.log(splitter)
    var index = splitter[2]
    var isNumber = !isNaN(index)
    if (req.method === 'GET' && req.url === '/pets') {
        fs.readFile('pets.json','utf8',(error, data) =>{
            if(error){
                throw error;
            } else {
                SendCompleteJSON(data, res);
            }
        });
    } else if (req.method === 'GET' && index && isNumber) {
        fs.readFile('pets.json','utf8',(error, data) =>{
            if(error){
                throw error;
            } else {
                let pets = JSON.parse(data);
                if(pets.length > index) {
                    console.log(data.length)
                    console.log(data) 
                    console.log(pets);
                    var petsJSONOne = JSON.stringify(pets[index]);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(petsJSONOne);
                }
                else {
                    foOOOOfo(res);
                    
                }
            }
        });
    } else {
        foOOOOfo(res);
    }
});
server.listen(port, function() {
  console.log('Listening on port', port);
});
