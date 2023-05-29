import React from 'react'
import './Currency.css'
import { v4 as uuidv4 } from 'uuid';

const currency = (props) => {
    const {
        optionValue,
        selectedCurrency,
        onChangeValue,
        amount,
        onChangeAmount
    } = props
    return (
        <div className="">
            <input type="number" className='input' value={String(amount)} onChange={onChangeAmount} />
            <select value={selectedCurrency} onChange={onChangeValue}>
                {optionValue.map((option) => {
                    const uKey = uuidv4()
                    return <option key={uKey} value={option}>{option}</option>
                })}
            </select>
        </div>
    )
}

export default currency
