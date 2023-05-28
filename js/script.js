const inputBox=document.getElementById("input-box");
const searchButton=document.getElementById("search-button");
const cloudImage=document.getElementById("cloud-image");
const temp=document.getElementById("temp");
const cityName=document.getElementById("city-name");
const humidityImage=document.getElementById("humidity-image");
const humidityText=document.getElementById("humidity-text");
const windImage=document.getElementById("wind-image");
const windText=document.getElementById("wind-text");
const errorText=document.getElementById("error-text")
const humidityIcone=document.getElementById("humidity-icon")
const windIcon=document.getElementById("wind-icon")
//apiKey variable
const apiKey="85dd88f6c49b0fd3e570c3415f57dc95";
//checkWeather function
    const checkWweather=async(lat,lon)=>{
        console.log("lati =>",lat)
        try {
         const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const weatherData=await response.json();
        console.log("data",weatherData)
        temp.innerHTML=Math.round(weatherData.main.temp-273)+"°C";
        cityName.innerHTML=weatherData.name
        humidityText.innerHTML="Humidity" +"</br>"+weatherData.main.humidity+"%";
        windText.innerHTML="Wind Speed"+weatherData.wind.speed+"km/h";
        humidityIcone.innerHTML='<i class="fa-solid fa-droplet drop-icon"></i>'
        windIcon.innerHTML='<i class="fa-solid fa-wind wind-icon"></i>'
        errorText.innerHTML=""

        if (weatherData.weather[0].main=="Clouds") {
            cloudImage.src="./images/clouds.png"
        } else if(weatherData.weather[0].main=="Clear") {
            cloudImage.src="./images/clear.png"
        }else if(weatherData.weather[0].main=="Drizzle"){
            cloudImage.src="./images/drizzle.png"
        }else if(weatherData.weather[0].main=="Mist"){
            cloudImage.src="./images/mist.png"
        }else if(weatherData.weather[0].main=="Rain"){
            cloudImage.src="./images/rain.png"
        }else if(weatherData.weather[0].main=="Snow"){
            cloudImage.src="./images/snow.png"
        }
        else if(weatherData.weather[0].main=="Blowing Snow"){
            cloudImage.src="./images/blowingSnow.jpg"
        }
        else if(weatherData.weather[0].main=="Dust"){
            cloudImage.src="./images/dust.png"
        }
        else if(weatherData.weather[0].main=="Fog"){
            cloudImage.src="./images/fog.png"
        }
        else if(weatherData.weather[0].main=="Hail"){
            cloudImage.src="./images/hail.png"
        }
        else if(weatherData.weather[0].main=="Haze"){
            cloudImage.src="./images/haze.png"
        }
        else if(weatherData.weather[0].main=="Heavy Rain"){
            cloudImage.src="./images/heavyRain.png"
        }
        else if(weatherData.weather[0].main=="Scattered Snow"){
            cloudImage.src="./images/scatteredSnow.jpg"
        }
        else if(weatherData.weather[0].main=="Smoke"){
            cloudImage.src="./images/smoke.png"
        }
        else if(weatherData.weather[0].main=="Thunderstorm"){
            cloudImage.src="./images/thunderstorm.gif"
        }
        else if(weatherData.weather[0].main=="Tornado"){
            cloudImage.src="./images/tornado.png"
        }
        else if(weatherData.weather[0].main=="Windy"){
            cloudImage.src="./images/windy.png"
        }

        } catch (error) {
            console.log("ERROR =>",error)
        }
        
    }    

//addEventListener get value of user
searchButton.addEventListener("click",(e)=>{
    e.preventDefault();
    if (!inputBox.value) {
        return alert("Please Enter a City Name:")
    }
    const inputValue= inputBox.value.toLowerCase().trim()
    console.log("cityName=>",inputValue)
    getWeatherData(inputValue)
})
//getWeatherData function
const getWeatherData=async(city)=>{
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
       const weatherData=await response.json();
       console.log("WeatherData",weatherData)
       if (response.status==404) {
        temp.innerHTML="";
        cityName.innerHTML=""
        humidityText.innerHTML="";
        windText.innerHTML=""
        humidityIcone.innerHTML=""
        windIcon.innerHTML=""
        cloudImage.src="./images/error2.jpg"
        return errorText.innerHTML="City Not Found Please Enter Correct City Name";
       } else {
        const lat=weatherData.coord.lat;
        const lon=weatherData.coord.lon;
        console.log("lat=>",lat)
        console.log("lon=>",lon)
        checkWweather(lat,lon)
       }
       } catch (error) {
           console.log("ERROR =>",error)
       }
}

