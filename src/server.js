const express = require("express")  // variável express recebe a função express
const server = express()            // executa a função express em server. Server é um objeto.

//pegar o banco de dados
const db = require("./database/db.js") // irá receber "module.exports = db" de "db.js"

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true })) 

//configurar pasta pública
server.use(express.static("public")) // disponibiliza os arquivos da pasta "public"


//utilizando template engine
const nunjucks = require("nunjucks")    // solicita o pacote que foi instalado
nunjucks.configure("src/views", {       // o primeiro argumento é a pasta onde estão os html, o segundo é um objeto, que:
    express: server,                    // informa qual é o servidor express
    noCache: true                       // desabilita o cache, para não correr o risco de trabalhar com arquivos desatualizados
})  



//configurar caminhos da aplicação
//pág. inicial
//Req: requisição
//Res: resposta

server.get("/", (req,res) => {      // configuração de rota. Acidiona uma "/" ao endereço

    /* // __dirname é uma variável global que armazena o endereço do diretório atual
    res.sendFile(__dirname + "/views/index.html")        // faz a concatenação do endereço e envia o arquivo html */

    // a linha acima foi sustituída após a instalação do nunjucks. Ele já informa o endereço "src/views".

    return res.render("index.html", { title: "Um titulo" })     // renderiza o arquivo html com o nunjucks
})

server.get("/create-point", (req,res) => {  
    
    // req.query: query strings da nossa URL
    //console.log(req.query)

    return res.render("create-point.html")  
})

server.post("/savepoint", (req,res) => {  

    // req.body: corpo do nosso formulário
    //console.log(req.body)

    // inserir dados no banco de dados

    const query = `
    INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
        // os "?" serão substituídos pelos valores passados abaixo:

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    // função call-back: será chamada após a inserção dos dados
    function afterInsertData (err) {
        if(err) {
            console.log (err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)   // retorna um objeto do tipo "statement"
        
        return res.render("create-point.html", { saved: true})  
    }

    // afterInsertData não tem () no final pq ela só será chamada após executar a query e os values
    db.run(query, values, afterInsertData)
})

server.get("/search", (req,res) => {            //nome do endereço

        const search = req.query.search

        if (search == ""){
            // pesquisa vazia
            return res.render("search-results.html")  
        }


        // buscar dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
            if(err) {
                return console.log (err)
            }

            console.log(rows)

            total = rows.length
    
            // mostrar a pág. html com os dados do banco de dados
            return res.render("search-results.html", {places: rows, total: total })  
        })
    
})


//ligar o servidor
server.listen(3000)                 //ouve a porta 3000