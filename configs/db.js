import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestorDeBoletas',
    connectionLimit: 200
})

export default pool;