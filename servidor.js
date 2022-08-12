const http = require('http')
const fs = require('fs')
const sitioWeb = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('./index.html', (err, data) => {
        if (err) {
            res.writeHead(404)
            res.write('404 Not Found')
        } else {
            res.end(data)
        }
    }
    )
}

const servidor = http.createServer(sitioWeb)
servidor.listen(3000)
console.log('Servidor corriendo en el puerto 3000')