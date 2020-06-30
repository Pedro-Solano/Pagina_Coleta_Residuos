// importar a dependência do sqlite3
// "require" retorna um objeto
const sqlite3 = require("sqlite3").verbose() // o método verbose exibe no terminal sempre que houver alterações

// criar o objeto que irá fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db") // construtor

//utilizar o objeto de banco de dados para nossas operações

 db.serialize(() => {            // serialize define uma sequência de comandos
/*
    // utilizando comandos SQL, vamos:

    // 1- criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2- inserir dados na tabela
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        // "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80", // já foi incluída
        "Papersider",
        // "Colectoria", // já foi incluída
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
        ]

        // função call-back: será chamada após a inserção dos dados
    function afterInsertData (err) {
        if(err) {
            return console.log (err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)   // retorna um objeto do tipo "statement"
    }

        // afterInsertData não tem () no final pq ela só será chamada após executar a query e os values
    //db.run(query, values, afterInsertData)  

    // 3- consultar dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log (err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    // 4- deletar dados da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) { // quando usamos "?", devemos informar um array
        if(err) {
            return console.log (err)
        }

        console.log("Registro deletado com sucesso!")
    })
*/
}) 

module.exports = db // irá exportar para "const db = require("./database/db.js")" em server.js