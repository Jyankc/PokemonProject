import s from './Homepage.module.css'
import React from 'react';

function Pagination({ page, setPage, maxAm, maxAmFiltered }) {


const max= maxAmFiltered? maxAmFiltered: maxAm;

    const [input, setInput] = React.useState(1)

    function handleNext() {
        setInput(input + 1)
        setPage(page + 1)
    }
    function handlePrevious() {
        setInput(input - 1)
        setPage(page - 1)
    }
    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function handleInput(e) {
        if (e.keyCode === 13) {
            setPage(parseInt(e.target.value))
        
            if (
                
                (e.target.value < 1) ||
                parseInt(e.target.value) > Math.ceil(max) ||
                isNaN((e.target.value))
            )   { 
                    setPage(1);
                    setInput(1)
                }
            else {
                setPage(parseInt(e.target.value))
            }
        }
    }

    return (

        <div className={s.pagination}>
           
            <p>{page} de {Math.ceil(max)}</p>
            <button disabled={page<=1}  className={s.botones} onClick={handlePrevious}>PREVIOUS</button>
            <input onChange={handleInputChange} onKeyDown={handleInput} value={input} name='page' />
            <button disabled={page>=Math.ceil(max)} className={s.botones} onClick={handleNext}>NEXT </button>
            


        </div>
    )


}


export default Pagination;