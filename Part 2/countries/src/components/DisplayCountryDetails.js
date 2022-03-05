import React from 'react'
import SpecificCountry from './SpecificCountry'

const DisplayCountryDetails = ({ searchCountries, input }) => {
    if (input === '') {
        return (
            <></>
        )
    } else if (searchCountries.length > 10) {
        return (
            <div>Too many matches,specify another filter</div>
        )
    }

    else {
        return (
            <>
                {searchCountries.map((specificCountry, i) => {
                    return (<SpecificCountry key={i} specificCountry={specificCountry} />)
                })}
            </>
        )
    }

}

export default DisplayCountryDetails