'use strict'

import pool from "../../configs/db.js"

export const getControl = async (req, res) => {   
    
    const conn = await pool.getConnection();
    
    try {
        let data = await conn.query(`SELECT * FROM ControlBoletas`)
        return res.send({data})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    } finally {
        conn.release();
    }
} 


export const calcularControl = async (req, res) => {
    const conn = await pool.getConnection();
    try {

        let { hrs_entry } = req.body
        console.log(hrs_entry)
        let fecha = new Date()

        let newDate = fecha.toISOString().split('T')[0]  
         
        let hrs_actual = fecha.toLocaleTimeString('it-IT')

        const data = await conn.query('SELECT * FROM Inventario WHERE date = ?', newDate)
        
        
        const tiempoDentro = (hrs_entry, hrs_end) =>{
            
            let text = ''
            let h1 = hrs_entry.split(":")
            let h2 = hrs_end.split(":")
            
            //Paso 1 restamos las horas, minutos y segundos  
            
            let newHrs = h2[0] - h1[0]
            let newMin = h2[1] - h1[1]
            let newSeg = h2[2] - h1[2]
            
            if(newSeg < 0){
              newSeg += 60;
              newMin +=1
            }else if(newMin<0){
              newMin += 60;
              newHrs -= 1;
            } 
          return (newHrs+ ':' + newMin + ':' + newSeg)
        }

        let resutl1 = tiempoDentro(hrs_entry, hrs_actual)
        console.log(resutl1)

        const operacion = (result, boleto4h, boleto2h, boleto1h, boleto30min) => {
            let text = result.split(':')
            let num = text[0] * 60 + parseInt(text[1]) + text[2] / 60

            //let newResult = boleto4h[0].split(':')[0] * 60

            let i = 0
            let array = []
            while (i < num) {
                i += 240  
                array.push(i)
            }
            
            //let newResult2h = boleto2h[0].split(':')[0] * 60

            let j = 0
            let array2 = []
            while (j < num) {
                j += 120
                array2.push(j)
            }

            //let newResult1h = boleto1h[0].split(':')[0] * 60

            let k = 0
            let array3 = [] 
            while (k < num) {
                k += 60
                array3.push(k)
            }

            //let newResult30min = boleto30min[0].split(':')[0]

            let l = 0
            let array4 = [] 
            while (l < num) {
                l += 30
                array4.push(l)
            } 

            let resultado_4h = `Debes de dar ${array.length} boletos de 4h` 
            let resultado_2h = `Debes de dar ${array2.length} boletos de 2h`
            let resultado_1h = `Debes de dar ${array3.length} boletos de 1h`
            let resultado_30min = `Debes de dar ${array4.length} boletos de 30min`

            return [resultado_4h, resultado_2h, resultado_1h, resultado_30min]

        }
        
        let result2 = operacion(resutl1, data[0].boleta4h, data[0].boleta2h, data[0].boleta1h, data[0].boleta30min)
        return res.send({  result2 });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while retrieving users." });
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
 
        let date =   horaActual.toISOString().split('T')[0];
        let hrs_end = horaActual.toLocaleTimeString('it-IT')
        console.log(date)
        console.log(hrs_end) 
        
        BigInt.prototype.toJSON = function () { return this.toString() }

        await conn.query('INSERT INTO ControlBoletas (hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min, date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [ hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min, date ])


        return res.send({ message: "Control agregado con exito."})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    }finally{
        conn.release();
    }
}