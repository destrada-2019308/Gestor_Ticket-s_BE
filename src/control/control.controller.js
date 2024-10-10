'use strict'

import pool from "../../configs/db.js"

export const getControl = async (req, res) => {   
    
    const conn = await pool.getConnection();
    
    try {
        let { codeUser } = req.params
        let data = await conn.query(`SELECT * FROM ControlBoletas where codeUser = ?`, [codeUser])
        return res.send({data})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    } finally {
        conn.release();
    }
} 


export const getAllControl = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        let data = await conn.query(`SELECT * FROM ControlBoletas`)
        return res.send({ data })
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

        let { hrs_init } = req.body 
        let fecha = new Date()

        let newDate = fecha.toISOString().split('T')[0]  
         
        let hrs_actual = fecha.toLocaleTimeString('it-IT') 
 
        const data = await conn.query('SELECT * FROM Inventario  ',  )
         


        const tiempoDentro = (hrs_init, hrs_end) =>{
            
            let text = ''
            let h1 = hrs_init.split(":")
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
            newMin += 5
            if(newMin >= 60){
                newMin -=60
                newHrs +=1
            }
          return (newHrs+ ':' + newMin + ':' + newSeg)
        }

        let resutl1 = tiempoDentro(hrs_init, hrs_actual)
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

            let resultado_4h = `Puedes de dar ${array.length} boletos de 4h` 
            let resultado_2h = `Puedes de dar ${array2.length} boletos de 2h`
            let resultado_1h = `Puedes de dar ${array3.length} boletos de 1h`
            let resultado_30min = `Puedes de dar ${array4.length} boletos de 30min`

            return [resultado_4h, resultado_2h, resultado_1h, resultado_30min]

        } 
        let result2 = operacion(resutl1, data[0].boleta4h, data[0].boleta2h, data[0].boleta1h, data[0].boleta30min)

        //Operacion proporcional a los boletos
        const operacionProporcional = (result, inventario) => {
            let text = result.split(':');
            console.log(inventario)
            let num = parseInt(text[0]) * 60 + parseInt(text[1]) + parseInt(text[2]) / 60;
          
            let totalTickets = {
              boleta4: 0,
              boleta2: 0,
              boleta1: 0,
              boleta030: 0
            };
          
            // Boletas de 4 horas (240 minutos)
            if (num >= 240) {
              totalTickets.boleta4 = Math.floor(num / 240);
              num -= totalTickets.boleta4 * 240;
              inventario.boleta4h -= totalTickets.boleta4;
            }
          
            // Boletas de 2 horas (120 minutos)
            if (num >= 120) {
              totalTickets.boleta2 = Math.floor(num / 120);
              num -= totalTickets.boleta2 * 120;
              inventario.boleta2h -= totalTickets.boleta2;
            }
          
            // Boletas de 1 hora (60 minutos)
            if (num >= 60) {
              totalTickets.boleta1 = Math.floor(num / 60);
              num -= totalTickets.boleta1 * 60;
              inventario.boleta1h -= totalTickets.boleta1;
            }
          
            // Boletas de 30 minutos (entre 1 y 30 minutos)
            if (num > 0) {
              totalTickets.boleta030 = Math.ceil(num / 30);
              inventario.boleta30min -= totalTickets.boleta030;
            }
          
            let resultado = ` 
            ${totalTickets.boleta4} ticket(s) de 4 horas
            `;
            let resultado2 = `
            ${totalTickets.boleta2} ticket(s) de 2 horas
           
            `;
            let resultado3 = `
            ${totalTickets.boleta1} ticket(s) de 1 hora
            
            `;
            let resultado4 = `
            ${totalTickets.boleta030} ticket(s) de 30 minutos
            `;

            return [resultado, resultado2, resultado3, resultado4];
            
          };

          let resultOP = operacionProporcional(resutl1, data)
          console.log(resultOP)
        return res.send({  result2, resultOP});
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
        console.log('asdasdasdasd' + hrs_init)
        //Creamos la hora de salida
        let horaActual = new Date()
 
        let date =   horaActual.toISOString().split('T')[0];
        let hrs_end = horaActual.toLocaleTimeString('it-IT')
        console.log(date)
        console.log(hrs_end) 
        console.log(boletosUsados30min)
   
        BigInt.prototype.toJSON = function () { return this.toString() }

        await conn.query(`INSERT INTO ControlBoletas 
                            (hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min, date )
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`, 
                            [ hrs_init, hrs_end, role, description, nameClient, codeGerencia, codeUser, boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min, date ])
        await conn.query(`
            UPDATE Inventario
            SET stock_boleta4h = stock_boleta4h - ?,
            stock_boleta2h = stock_boleta2h - ?,
            stock_boleta1h = stock_boleta1h - ?,
            stock_boleta30min = stock_boleta30min - ?
            WHERE date = ?`, [boletosUsados4h, boletosUsados2h, boletosUsados1h, boletosUsados30min, date])
        
        return res.send({ message: "Control agregado con exito."})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })
    }finally{
        conn.release();
    }
}

//Reporte de Control 
export const findByRole = async (req, res) => {

    const conn = await pool.getConnection();
    try {
        const { role } = req.body
        console.log(role)
        if(!role){
            return res.status(400).send({message: "El rol no puede ser vacio"})
        }
        const find = await conn.query(`SELECT * FROM ControlBoletas WHERE role = ?`, [role])
 
        
        let total4h = 0
        let total2h = 0
        let total1h = 0
        let total30min = 0

        for(let i = 0; i < find.length; i++){
           // console.log(find[i].boletosUsados1h) 
           // console.log(find[i].boletosUsados2h)
            total4h += find[i].boletosUsados4h
            total2h += find[i].boletosUsados2h
            total1h += find[i].boletosUsados1h
            total30min += find[i].boletosUsados30min
        }    
        
        let result = [total4h, total2h, total1h, total30min]

        return res.send({ result, find})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An error occurred while retrieving data." })   
    }finally{
        conn.release();
    }
}

