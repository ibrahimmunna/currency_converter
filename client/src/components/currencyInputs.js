import React from 'react'

import PropTypes from 'prop-types'

function CurrencyInputs(props){
    return(
        <div className="groupView">
            <select value={props.currency} onChange ={ evnt => props.onCurrencyChange(evnt.target.value)}>
                {props.curriences.map((currency)=>(
                    <option value={currency}>{currency}</option>
                ))}
            </select>
            <br/>
            <input type="text" value={props.amount} onChange ={ evnt => props.onAmountChange(evnt.target.value)}/>
            
        </div>
    )
}
//defining proptypes
CurrencyInputs.prototype = {
    amount : PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    curriences: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func
    
}

export default CurrencyInputs