const http = require('http')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv') 

http.createServer((req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'pages', file)
    const extname = path.extname(filePath) //retirando a extensão do arquivo

    const arquivosAceitos = ['.html', '.css', '.js']
    const allowed = arquivosAceitos.find(item => item == extname)

    if(!allowed) return

    fs.readFile(
        filePath,
            (err, content) => {
                if (err) throw err
                    //
                res.end(content)
            }
    )
}).listen(5000, () => console.log('Server is running'))