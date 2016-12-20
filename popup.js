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
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

function showNowWeather(result) {
	result = JSON.parse(result);

	var id = result.weather[0].icon;
	var img = "<img src='icons/"+id+".png'></img>";
	document.getElementById("now_icon").innerHTML = img;

	var d = new Date(result.dt*1000);
	document.getElementById("now_week").innerHTML = weekday[d.getDay()];

	var temp = result.main.temp;
	temp = Math.round(temp-273.15);
	document.getElementById("now_temp").innerHTML = temp+"<p>℃</div>";
	if(temp <= -10){
		document.getElementById("now_temp").style.width = "160px";
	}else if(temp>=0 && temp<=9){
		document.getElementById("now_temp").style.width = "120px";
	}else{
		document.getElementById("now_temp").style.width = "140px";
	}

	var city = result.name;
	document.getElementById("now_city").innerHTML = city;

	var table = "<table>";
	table += "<tr><td><img src='icons/humidity.png'></img></td><td>"+result.main.humidity+"%</td></tr>";
	table += "<tr><td><img src='icons/windspeed.png'></img></td><td>"+Math.round(result.wind.speed)+"m/s</td></tr>";
	table += "<tr><td><img src='icons/clouds.png'></img></td><td>"+result.clouds.all+"%</td></tr>";
	table += "</table>";
	document.getElementById("now").innerHTML = table;
}

function showHourlyWeather(result) {
	result = JSON.parse(result);
	var list = result.list;
	var table = "<table>";
	table += "<tr>";
	for(var i in list){
		var id = list[i].weather[0].icon;
		table += "<td><img src='icons/"+id+".png'></img></td>";	
	}
	table += "</tr>"
	table += "<tr>";
	for(var i in list){
		var d = new Date(list[i].dt*1000);
		table += "<td>"+d.getHours()+"h</td>";
	}
	table += "</tr>";
	table += "<tr>";
	for(var i in list){
		table += "<td>"+Math.round(list[i].main.temp-273.15)+"℃</td>";
	}
	table += "</tr>"
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
		table += "<td>"+weekday[d.getDay()].substr(0,3)+"</td>";
	}
	table += "</tr>";
	table += "<tr>";
	for(var i = 1;i<list.length;i++){
		table += "<td>"+Math.round(list[i].temp.min-273.15)+"℃/"+Math.round(list[i].temp.max-273.15)+"℃</td>";	
	}
	table += "</tr>"
	table += "</table>";
	document.getElementById("daily").innerHTML = table;
}

var city = localStorage.city;
city = city?city:"beijing";
var url;

url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+',china&lang=zh_cn&APPID=65d1bd8ddc51490ee98f0d478e91db85&cnt=5';
httpRequest(url, showNowWeather);

url = 'http://api.openweathermap.org/data/2.5/forecast?q='+city+',china&lang=zh_cn&APPID=65d1bd8ddc51490ee98f0d478e91db85&cnt=5';
httpRequest(url, showHourlyWeather);

url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',china&lang=zh_cn&APPID=65d1bd8ddc51490ee98f0d478e91db85&cnt=5';
httpRequest(url, showDailyWeather);