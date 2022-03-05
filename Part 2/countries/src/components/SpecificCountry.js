import React, { useState } from 'react'
import Weather from './Weather'

const SpecificCountry = (props) => {
    const details = props.specificCountry

    const [flag, setFlag] = useState(false)
    const showDetails = () => { setFlag(true) }

    if (!flag) {
        return (
            <>
                <span>{details.name.common}</span>&nbsp;
                <button onClick={showDetails}>show</button>
                <br />
            </>
        )
    } else if (flag) {
        return (
            <>
                <h1>{details.name.common}</h1>
                <div>Capital  &nbsp; &nbsp; : {details.capital}</div>
                <div>Population: {details.population}</div>
                
                <h2>Languages</h2>
                {/* {details.languages.map((language, i) => <li key={i}>{language}</li>)} */}
                
                {Object.keys(details.languages).map((item, i) => (
                    <li key={i}>
                        <span>{ details.languages[item] }</span>
                    </li>
                ))}  

                <br />
                <img src={details.flags.svg} alt="flag" height="150" width="150" />
                <br />


                <Weather capital={details.capital} />
            </>
        )
    }
}

export default SpecificCountry;