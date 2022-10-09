WeatherToday - ReactJS Weather App

APIs Used

One Call API 1.0
https://openweathermap.org/api/one-call-api

API Info

The One Call API 1.0 provides the following weather data for any geographical coordinates:

    Current weather
    Minute forecast for 1 hour
    Hourly forecast for 48 hours
    Daily forecast for 7 days
    National weather alerts
    Historical weather data for the previous 5 days
    
API Call : 

           https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

Geocoding API
https://openweathermap.org/api/geocoding-api

API Info

Geocoding is the process of transformation of any location name into geographical coordinates, and the other way around (reverse geocoding). OpenWeather’s Geocoding API supports both the direct and reverse methods, working at the level of city names, areas and districts, countries and states:

    Direct geocoding converts the specified name of a location or zip/post code into the exact geographical coordinates;
    Reverse geocoding converts the geographical coordinates into the names of the nearby locations.

API Call : 

           http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} (Direct geocoding)

           http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key} (Reverse geocoding)
