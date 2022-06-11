import React from 'react'
import { useEffect } from 'react'
import './table.css'
function Table({countriesName}) {
     let newCountryList;

    const sortCountriesByCases=()=>{
         newCountryList=countriesName.sort((a,b)=>b.cases-a.cases)
    }
        sortCountriesByCases();

  return (
    <div className='table'>
        {
        newCountryList.map((country)=>{
         return <tr key={country.id}>
                <td>{country.country}</td>
                <td><strong>{country.cases}</strong></td>
            </tr>
        })
    }
    </div>
  )
}

export default Table