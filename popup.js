function httpRequest(url,callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url,true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4){
			callback(xhr.responseText);
		}
	}
	xhr.send();
}

var weekday=new Array(7);
weekday[0]="Sun";
weekday[1]="Mon";
weekday[2]="Tue";
weekday[3]="Wed";
weekday[4]="Thu";
weekday[5]="Fri";
weekday[6]="Sat";

function showHourlyWeather(result) {
	result = JSON.parse(result);
	var list = result.list;
	var table = "<table>";
	for(var i in list){
		table += "<tr>";
		var id = list[i].weather[0].icon;
		table += "<td><img src='icons/"+id+".png'></img></td>";
		var d = new Date(list[i].dt*1000);
		table += "<td>"+d.getHours()+"</td>";
		table += "<td>"+Math.round(list[i].main.temp-273.15)+"°C</td>";
		table += "</tr>";
	}
	table += "</table>";
	document.getElementById("hourly").innerHTML = table;
}

function showDailyWeather(result){
	result = JSON.parse(result);
	var list = result.list;
	var table = "<table>";
	table += "<tr>";
	for(var i = 1;i<list.length;i++){
		var id = list[i].weather[0].icon;
		table += "<td><img src='icons/"+id+".png'></img></td>";	
	}
	table += "</tr>"
	table += "<tr>";
	for(var i = 1;i<list.length;i++){
		var d = new Date(list[i].dt*1000);
		table += "<td>"+weekday[d.getDay()]+"</td>";
	}
	table += "</tr>";
	table += "<tr>";
	for(var i = 1;i<list.length;i++){
		table += "<td>"+Math.round(list[i].temp.min-273.15)+"°C/"+Math.round(list[i].temp.max-273.15)+"°C</td>";	
	}
	table += "</tr>"
	table += "</table>";
	document.getElementById("daily").innerHTML = table;
}

var city = localStorage.city;
city = city?city:"beijing";
var url;

url = 'http://api.openweathermap.org/data/2.5/forecast?q='+city+',china&lang=zh_cn&APPID=65d1bd8ddc51490ee98f0d478e91db85&cnt=5';
httpRequest(url, showHourlyWeather);

url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',china&lang=zh_cn&APPID=65d1bd8ddc51490ee98f0d478e91db85&cnt=5';
httpRequest(url, showDailyWeather);