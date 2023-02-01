import React from 'react'

import PropTypes from 'prop-types'

function CurrencyOutputs(props){
    return(
        <div className="groupView">
            <select value={props.currency} onChange ={ evnt => props.onCurrencyChange(evnt.target.value)}>
                {props.curriences.map((currency)=>(
                    <option value={currency}>{currency}</option>
                ))}
            </select>
            <br/>
            <input type="text" value={props.amount}/>
            
        </div>
    )
}
//defining popr types for the output components
CurrencyOutputs.prototype = {
    amount : PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    curriences: PropTypes.array,
    onCurrencyChange: PropTypes.func
    
}

export default CurrencyOutputs