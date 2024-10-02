'use strict'

import pool from "../../configs/db.js"

export const getControl = async (req, res) => {   
    
    const conn = await pool.getConnection();
    
    try {
        let data = await conn.query(`SELECT * FROM Control`)
        return res.send({data})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    } finally {
        conn.release();
    }
} 

export const addControl = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { hrs_init, role, description, nameClient, codeGerencia, codeUser, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min } = req.body;
        
        //Creamos la hora de salida
        let horaActual = new Date()

        let newDate = horaActual.toLocaleString.split(',')
        let date = newDate[0]
        let hrs_end = newDate[1]
        let existData = await conn.query('SELECT * FROM Control WHERE date = ?', [date])
        if(existData.length > 0){
            return res.status(400).send({ error: "El control para la fecha ingresada ya existe." })
        }
        BigInt.prototype.toJSON = function () { return this.toString() }

        await conn.query('INSERT INTO Control (hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, date, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [ hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, date, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min ])

        const timepoDentro = (hrs_entry, hrs_end) => {
            let text = ''
            let h1 = hrs_entry.split(':')
            let h2 = hrs_end.split(':')

            let newHrs = h2[0] - h1[0]
            let newMin = h2[1] - h1[1]
            let newSeg = h2[2] - h1[2]

            if(newSeg < 0){
                newSeg += 60
                newMin += 1
            }else if(newMin < 0){
                newMin += 60
                newHrs -= 1
            }
            return (newHrs + ':' + newMin + ':' + newSeg)
        }

        let result = timepoDentro(hrs_init, hrs_end)
    
        const operacion = (result, boleto4h, boleto2h, boleto1h, boleto30min) => {
            let text = result.split(':')
            let num = text[0] * 60 + parseInt(text[1]) + text[2] / 60

            let newResult = boleto4h[0].split(':')[0] * 60

            let i = 0
            let array = []

            while(i < num){
                i += 240;
                array.push(i)
            }

            let newResult2h = boleto2h[0].split(':')[0] * 60

            let j = 0
            let array2 = []

            while(j < num){
                j += 120;
                array2.push(j)
            }

            let newResult1h = boleto1h[0].split(':')[0] * 60

            let k = 0
            let array1 = []

            while(k < num){
                k += 60;
                array1.push(k)
            }

            let newResult30min = boleto30min[0].split(':')[0]
            let l = 0
            let array30min = []

            while(l < num){
                l += 30;
                array30min.push(l)
            }

            let resultado_4h = `Debes de dar ${array.length} boletos de 4 horas`
            let resultado_2h = `Debes de dar ${array2.length} boletos de 2 horas`
            let resultado_1h = `Debes de dar ${array1.length} boletos de 1 hora`
            let resultado_30min = `Debes de dar ${array30min.length} boletos de 30 minutos`
            return resultado_4h + " " + resultado_2h + " " + resultado_1h +" " + resultado_30min
        }

         

        return res.send({ message: "Control agregado con exito.", addData: operacion(result, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min) })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    }finally{
        conn.release();
    }
}