const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != "" ){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(region){
    console.log(typeof(region));
    //api = `https://weatherdbi.herokuapp.com/data/weather/${region}`;
    api = 'https://weatherdbi.herokuapp.com/data/weather/'+region;
    fetchData();
}

function onSuccess(position){
    //const {latitude, longitude} = position.coords;
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(typeof(lat));
    const latitude = lat.toString();
    const longitude = long.toString();
    console.log(typeof(latitude));

    console.log('lat : ' + latitude);
    console.log('long : ' + longitude);
    api = 'https://weatherdbi.herokuapp.com/data/weather/'+latitude+','+longitude;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    
    
    if(info.code == "0"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }
    else {
        console.log(info);
        console.log('location : ' + info.region);
        console.log('humidity : ' + info.currentConditions.humidity);
        const temp = info.currentConditions.temp;
        var key = Object.keys(temp)[0];
        console.log(key);
        const Temperature = temp[key];

        console.log("Hi");

        const wind = info.currentConditions.wind;
        var key = Object.keys(wind)[0];
        console.log(key);
        const Wind = wind[key];

       
        console.log('Temperature : ' + Temperature);
        console.log('Wind Speed : ' + Wind);
        console.log('Precipitation : ' + info.currentConditions.precip);
        console.log('Weather Description  : ' + info.currentConditions.comment);
        console.log('Current time  : ' + info.currentConditions.dayhour );

        const city_country = info.region;
        const humidity = info.currentConditions.humidity;
        const precip = info.currentConditions.precip;
        const description = info.currentConditions.comment;
        const time = info.currentConditions.dayhour;
        
        weatherPart.querySelector("img").src = info.currentConditions.iconURL;
       // const city = info.name;
       // const country = info.sys.country;
      /* const city_country = info.region;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }*/
       
          
            console.log("Insertion started");
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(Temperature);
        console.log("First insertion");
            weatherPart.querySelector(".weather").innerText = description;
            weatherPart.querySelector(".location span").innerText = city_country;
        // weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        weatherPart.querySelector(".humidity span").innerText = humidity;
        weatherPart.querySelector(".time span").innerText = time;
        weatherPart.querySelector(".wind span").innerText = Wind;
        
        weatherPart.querySelector(".temp .numb-2").innerText = precip;

        for (i = 0; i < 7 ; i++) {
            console.log(info.next_days[i].day);
            document.getElementById("day"+(i+1)).innerHTML = info.next_days[i+1].day
         }

         for (i = 0; i < 7 ; i++) {
            document.getElementById("img"+(i+1)).src = info.next_days[i+1].iconURL
         }

         for (i = 0; i < 7 ; i++) {
            console.log(info.next_days[i].comment);
            document.getElementById("comment"+(i+1)).innerHTML = info.next_days[i+1].comment
         }

         //const temp = info.currentConditions.temp;
       // var key = Object.keys(temp)[0];
       //const Temperature = temp[key];

       for (i = 0; i < 7 ; i++) {
        console.log("HI next max temp");
        const temp = info.next_days[i].max_temp;
        var key = Object.keys(temp)[0];
        const Max_Temp = temp[key];
        console.log(Max_Temp);
        document.getElementById("mxtemp"+(i+1)).innerHTML = Max_Temp;
       }

       for (i = 0; i < 7 ; i++) {
        console.log("HI next Min temp");
        const temp = info.next_days[i].min_temp;
        var key = Object.keys(temp)[0];
        const Min_Temp = temp[key];
        console.log(Min_Temp);
        document.getElementById("mntemp"+(i+1)).innerHTML = Min_Temp;
       }
        
        
        /*infoTxt.innerText = "";
        inputField.value = "";*/
        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});