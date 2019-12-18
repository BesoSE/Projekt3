let api="13a88a3284c65206ec494ecdc27232f2";
let units="metric";
let searchMethod;


let lon=5;
function getSearchMethod(searchTerm){
    if(searchTerm.length===5 && Number.parseInt(searchTerm)+""===searchTerm){
        searchMethod='zip';
    }else{
        searchMethod="q";
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${api}&units=${units}`).then(result=>{
        return result.json();
    }).then(result=>{
        init(result);
        
        
    })
}
function init(resultfromServer){
    let bod= $('body');
   switch(resultfromServer.weather[0].main){
    case "Clear":
        bod.css('backgroundImage','url(cisto.jpg)');
        break;
        case "Clouds":
                bod.css('backgroundImage','url(oblacno.jpg)');
                break;
        case "Rain":
        case "Drizzle":
        case "Mist":
                bod.css('backgroundImage','url(Kisa.jpg)');
             break;
        case "Thunderstorm":
                bod.css('backgroundImage','url(grmljevina.jpg)');
            break;
         case "Snow":
                bod.css('backgroundImage','url(snijeg.jpg)');
             break;
        default:
            break;
   }
   let weatherDescriptionHeader=$('#weatherDescriptionHeader');
   let temp=$('#temp');
   let humidity=$('#humidity');
   let windSpeed=$('#windSpeed');
   let cityHeader=$('#cityHeader');
   let Slika=$('#Slika');
   Slika.attr( 'src',"http://openweathermap.org/img/w/"+ resultfromServer.weather[0].icon+'.png');
   let resultDescription=resultfromServer.weather[0].description;
  weatherDescriptionHeader.text(resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1));
  
  let t=parseInt(resultfromServer.main.temp);
  temp.html(t+'&#176');
   windSpeed.html("Wind speed: "+resultfromServer.wind.speed+"m/s");
   cityHeader.html(resultfromServer.name);
   humidity.html('Humidity: '+resultfromServer.main.humidity+"%");
   setPositionInfo();
}
function setPositionInfo(){
let weatherContainer=$('#weatherContainer');

let weatherContainerHeight=weatherContainer[0].clientHeight;
let weatherContainerWidth=weatherContainer[0].clientWidth;

weatherContainer.css('left',`43%`);
weatherContainer.css('top',`25%`);
weatherContainer.css('visibility','visible');


}

$('#searchBtn').click(function(){
     let searchTerm=$('#searchInput').val();
     if(searchTerm){
         searchWeather(searchTerm);
       
   
     let city=$('#searchInput').val();
     
         work(city);
     }
   
})


function work(city){
    
   
    let weather=$('#weatherContainer');
    
    
     
    $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=13a88a3284c65206ec494ecdc27232f2&units=metric',
        dataType: 'jsonp',
        success: function(result) {
            $("#next").empty();
            $('#frcw').empty();
            let table="";
            
    	for (let i = 6; i < result.list.length; i=i+8) {
           
      	table += "<tr>";
          table += "<td><b>" + result.list[i].dt_txt.split(' ')[0]+'</b>';
         
          
      	table += "<td><img src='http://openweathermap.org/img/w/" + result.list[i].weather[0].icon + ".png'> </td>";
      
      	table += "<td><b>" + result.list[i].weather[0].description + "</b></td>";
      	table += "<td><b>" + result.list[i].main.temp_min + "°C</b></td>";
      	table += "<td><b>" + result.list[i].main.temp_max + "°C</b></td>";
      
      	table += "<td><b>" + result.list[i].main.humidity + "%</b></td>";
      	table += "<td><b>" + result.list[i].wind.speed + "m/s</b></td>";
      
 	     table += "</tr>";
    	}
        $('#frcw').append('<thead><tr><td>Date</td><td>Weather</td><td>Description</td><td>Min temp</td><td>Max Temp</td><td>Humidity</td><td>Wind Speed</td></tr></thead>');
        $("#frcw").append(table);
        $("#next").empty().append("<i><b>Forcast for  " +city+'</b></i>');
    
  	
    }
})     

}
