import React, {useEffect, useState} from 'react'
const API_KEY = '368d3bb235c625628fa868ed2b2c797e';

function Display(props) {
    let data = props.dispData
    let humidity, pressure, sunrise = 1652053600, sunset = 1652101333, wind_speed, temp, weather, main, description, icon = '10d', lat = "25.3356491", lon = "83.0076292"
    let [coord, setCoord] = useState([ "25.3356491", "83.0076292", "Varanasi", "IN" ])
    {!data ?(
        console.log("No Data!")) : ({humidity, pressure, sunrise, sunset, wind_speed, temp, weather} = data.childData.current)
    }
    {!data ?(
        console.log("No Data!")) : ({lat, lon} = data.childData)
    }
    {!data ?(
        console.log("No Data!")) : ({main, description, icon} = weather[0])
    }  
    useEffect(() => {
        async function getRevGeocode(){
            coord = await revGeocode(lat, lon)
            setCoord(coord)
        }
        getRevGeocode()
        //Runs only on the first render
      }, [data])
    return (
        <div className="card text-slate-300 h-56 grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-6 content-end">
            <div className='align-center row-start-1 col-start-1 pt-2' align="center" flex="wrap" >
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
                <div className=' text-3xl'>{main}</div>
                <div className='text-slate-500'>{description}</div>
            </div>
            <div className='align-center row-start-1 col-start-2 col-span-2  gap-1 grid grid-flow-row auto-rows-max content-end' align="center" flex="wrap" >
                <div className=' text-7xl'>{coord[2]}, {coord[3]}</div>
                <div className='text-slate-500'>Latitude : {coord[0]}</div>
                <div className='text-slate-500'>Longitude : {coord[1]}</div>
            </div>
            <div className='align-center row-start-2 col-start-1 col-span-1  gap-1 grid grid-flow-row auto-rows-max content-end' align="center" flex="wrap" >
                <i className="pe-7w-thermometer-1-2 pe-3x pe-va"></i>
                <div className='text-slate-500 text-xl'>Temperature</div>
                <div className='text-3xl'>{temp} °C</div>
            </div>
            {/* <div className='align-center row-start-2 col-start-2 col-span-2  gap-1 grid grid-flow-row auto-rows-max content-end' align="center" flex="wrap" >
                <div className='text-slate-500'>Sunrise : {timeConverter(sunrise)}</div>
                <div className='text-slate-500'>Sunset : {timeConverter(sunset)}</div>
            </div> */}
            <div className="text-slate-300 flex-wrap flex-row align-center row-start-2 col-start-2 col-span-1 grid grid-flow-row auto-rows-max content-end" align="center" flex="wrap" >
                <i className="pe-7w-download pe-3x pe-va"></i>
                <div className='text-slate-500 text-xl'>Humidity</div>
                <div className='text-3xl'>{humidity}%</div> 
            </div>
            <div className='align-center row-start-2 col-start-3 col-span-1 grid grid-flow-row auto-rows-max content-end' align="center" flex="wrap" >
                <i className="pe-7w-wind pe-3x pe-va"></i>
                <div className='text-slate-500 text-xl'>Wind Speed</div>
                <div className='text-3xl'>{wind_speed} m/s</div>
            </div>
            <div className='align-center row-start-3 grid grid-flow-row auto-rows-max content-end pb-8' align="center" flex="wrap" >
                <i className="pe-7w-compass-east pe-3x pe-va"></i>
                <div className='text-slate-500 text-xl'>Pressure</div>
                <div className='text-3xl'>{pressure} hPa</div>
            </div>
            <div className='align-center row-start-3 grid grid-flow-row auto-rows-max content-end pb-8' align="center" flex="wrap" >
                <i className="pe-7w-sunrise pe-3x pe-va"></i>
                <div className='text-slate-500 text-xl'>Sunrise</div>
                <div className='text-2xl'>{timeConverter(sunrise)}</div>
            </div>
            <div className='align-center row-start-3 grid grid-flow-row auto-rows-max content-end pb-8' align="center" flex="wrap" >
                <i className="pe-7w-sunset pe-3x pe-va"></i>
                <div className='text-slate-500 text-xl'>Sunset</div>
                <div className='text-2xl'>{timeConverter(sunset)}</div>
            </div>
            
        </div>
    )
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

async function revGeocode(lat, lon){
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
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

export default Display
