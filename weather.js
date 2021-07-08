
let icons = document.getElementById("icon");
const temperature = document.getElementById("temperature");
const button = document.querySelector('button');
const inputBox = document.getElementById('tb');
const place = document.getElementById('Location');
const iconDescription = document.getElementById('icon-meaning')
button.addEventListener('click',search);

inputBox.addEventListener('keyup',function(event){
    if (event.defaultPrevented) {
        return;
    }
    var key = event.key || event.keyCode;
    if(key === 'Enter'){
        search();
        console.log("entetered");
    }
});
console.log(iconDescription)


if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(success,console.log);
    
   } 
function success(pos){
    var crd = pos.coords;
    var lat = crd.latitude;
    var long =crd.longitude;
       
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=faf375a31402cd30679fba4a7efe51ed`)
.then(response => response.json())
.then(data => {
   
    console.log(data);
    var iconId = data.weather[0].icon;
    var temp = data.main.temp;
    var loc = data.name + " | "+ data.sys.country;;
    var fetchedDescription = data.weather[0].description;
    console.log(fetchedDescription)
    setLocation(loc,place);
    setIcon(iconId,icons);
    setTemperature(temp,temperature);
    setIconDescription(fetchedDescription,iconDescription);
    })
    .catch(err => console.log(err))
}

function search(){
   let query = document.getElementById("tb").value
    
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=faf375a31402cd30679fba4a7efe51ed`)
.then(response => response.json())
.then(data => {
   
    var iconId = data.weather[0].icon;
    var fetchedDescription = data.weather[0].description;
    var loc = data.name + " | "+ data.sys.country;
    setLocation(loc,place);
   setIcon(iconId,icons);
    setTemperature(getTemperature(data),temperature);
    setIconDescription(fetchedDescription,iconDescription);
    
})

.catch(err => console.log(err))




   
}
function setTemperature(temperature,element){
let convertedTemperature = temperature+(-272.15);
element.innerHTML = convertedTemperature.toFixed(2) + "°C";
}
function setLocation(locName,element){

 element.innerHTML = locName;

}
function setIcon(iconId,element){
    let icon = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
   return element.setAttribute('src',icon);

}
function getTemperature(temp){
    let tempObj = temp.main.temp;

   return tempObj;
}
function setIconDescription(descriptionName,element){
    let capitalDescription = capitalizeFirstLetter(descriptionName)
    element.innerHTML = capitalDescription;
    console.log(capitalDescription)
}
function capitalizeFirstLetter(string) {
    const words = string.split(" ")
       
for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);

}
return words.join(" ");
}