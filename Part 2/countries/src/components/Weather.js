import React, { useState, useEffect } from "react"
import axios from 'axios'

const Weather = ({ capital }) => {
    const api_key = 'bba62c4f310272cb7408cd71b35c3e9f'
    const [weather, setWeather] = useState({})

    useEffect( () => {
        axios.get("http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + capital).then((response) => setWeather(response.data.current))
    }
    ,[])
    
    return (
        <>
            <h2>Weather in {capital}</h2>
            <div><strong>Temperature:</strong> {weather.temperature}° Celsius</div>
            <img src={weather.weather_icons} alt="weather" />
            <div><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</div>
        </>
    )

}

export default Weather;