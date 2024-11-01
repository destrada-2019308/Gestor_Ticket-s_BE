import React, { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { useControl } from '../../shared/Control/useControl';
 
export default function Autocomplete({type, placeholder, name, required, onChange}) {
    const { allControl, getAllControl } = useControl();
 

    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    useEffect(() => {
        getAllControl();
    }, []);
 
    let newArray = allControl.map((item) => item.nameClient)
    console.log(newArray)
 
    // Lista de arrays (por ejemplo, una lista de nombres)
    const itemList = [
        ['Apple', 'Banana', 'Cherry'],
        ['Dog', 'Cat', 'Rabbit'],
        ['Red', 'Green', 'Blue'],
        // Agrega más arrays según sea necesario
    ];

    const search = (event) => {
        // Filtrar elementos en función de la consulta del usuario
        const filteredItems = newArray.flat().filter(item =>
            item.toLowerCase().includes(event.query.toLowerCase())
        );

        // Establecer los elementos filtrados como sugerencias
        setItems(filteredItems);
    }

    return (
        <div className="card flex justify-content-center">
            <AutoComplete
                required
                type="text"
                value={value}
                onChange={(e) => setValue(e.value)}
                suggestions={items}
                completeMethod={search}
                field="nameClient"
                placeholder="Search"
                className="w-full md:w-14rem"
                dropdown
            />
        </div>
    );
}
