import axios from 'axios';
import React from 'react'
import '../App.css';
import { useEffect,useState, } from 'react';
import '../App.css';
function HistoryTable (){

    const [savedHistory, setSavedhistory]=useState([])
    

    useEffect(()=>{
        async function fetchData() {
        await axios.get('http://localhost:4000/savedentries').then((res)=>{
            setSavedhistory(res.data)
        })
    }
    fetchData();
    })

    const renderableTable = ()=>{
        return savedHistory.map((value)=>(
            <tr>
                <td>{value.fromCurrency}</td>
                <td>{value.fromAmount}</td>
                <td>{value.toCurrency}</td>
                <td>{value.toAmount}</td>

                { <td>Date:{value.operatingTime}</td> }

            </tr>
        

        ))
    }
    return(
        <div >

        <h3>Last 10 conversions</h3>
        <br/>
        <div className='historyTable'>
        <table>
            <thead>
            <tr>
                <th>From</th>
                <th>Amount</th>
                <th>To</th>
                <th>Converted Anount</th>
                <th>Operation Time</th>
            </tr>
            </thead>
            <tbody>
        {renderableTable()}
            </tbody>
        </table>
        </div>
        </div>
    )
}

export default HistoryTable