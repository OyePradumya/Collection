import React, { useState, useEffect } from 'react'
const API_KEY = '368d3bb235c625628fa868ed2b2c797e';

function Navbar(props) {
    const [city, setCity] = useState(null);
    const submit = (e) => {
        e.preventDefault();
        async function getWeatherSearch() {
            let data = await getWeather(city)
            props.parentCallback(data)
        }
        getWeatherSearch()
    }
    return (
        <>
            <header className="navbar">
                <div
                    className="flex items-center justify-between h-16  px-1 mx-auto"
                >


                    <div className="logo">
                        <span className="logo  px-2 py-2 rounded" style={{ color: "white" }}>WeatherToday</span>
                    </div>

                    <nav className='border-gray-200 shadow-xl rounded-lg'>
                        <div className="container flex flex-wrap justify-between items-center mx-auto"  >
                            <form className="flex md:order-2 gap-x-2" type='form' onSubmit={submit} >
                                <input className="text-sm placeholder-gray-300 border-gray-200 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:hover:bg-white dark:focus:ring-blue-200 shadow-xl"
                                    placeholder="  Search city..."
                                    onChange={(e) => setCity(e.target.value)}>
                                </input>
                            </form>
                            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
                            </div>
                        </div>
                    </nav>

                </div>

            </header>

        </>
    )
}

async function getGeocode(cityName) {
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
    let data = await response.json();
    let lat1 = `${data[0].lat}`;
    let lon1 = `${data[0].lon}`;
    let name1 = `${data[0].name}`;
    let country1 = `${data[0].country}`;
    let lst = []
    lst.push(lat1)
    lst.push(lon1)
    lst.push(name1)
    lst.push(country1)
    return lst
}

async function getWeather(cityName1) {
    let tmp = await getGeocode(cityName1);
    let lat = tmp[0]
    let lon = tmp[1]
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=metric&appid=${API_KEY}`);
    let data = await response.json();
    return data

}

export default Navbar
