import React, {useState} from 'react'
import {Bingo} from '../components/bingo'
import {Welcome} from '../components/welcome'

const PageBingo = () => {

    const [field, setField] = useState(null);

    const selectField = (fieldSize) => {
        setField(fieldSize)
    };

    const reset = () => {
        setField();
    }

    return (
        <div className="l-content">
            {field ? <Bingo fieldSize={field} reset={reset}/> : <Welcome selectField={selectField}/>}
        </div>
    )
}

export default PageBingo
