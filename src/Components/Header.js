import React from 'react'
import './header.css'
import { FormControl, MenuItem, Select } from '@material-ui/core';

function Header({ defaultCountry, handleChangecountry, countryList }) {
    return (
        <div className='header'>
            <h1>COVID-19 Tracker</h1>
            <FormControl className='app__dropdown'>
                <Select variant='outlined'
                    value={defaultCountry}
                    onChange={handleChangecountry}
                >
                    <MenuItem value={defaultCountry} >Worldwide</MenuItem>
                    {
                        countryList.map((country) => {
                            return <MenuItem key={country.countryInfo.iso2} value={country.countryInfo.iso2}>{country.country}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </div>
    )
}

export default Header