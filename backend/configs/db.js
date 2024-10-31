import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'gestorDeBoletas',
    connectionLimit: 150
})

export default pool;