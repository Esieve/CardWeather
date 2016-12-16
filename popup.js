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
function showDailyWeather(result){
	result = JSON.parse(result);
	var daily = result.results[0].daily;
	var table = "<table>";
	// table += "<tr>";
	// for(var i in result.daily){
	// 	var id = list[i].weather[0].icon;
	// 	table += "<td><img src='icons/"+id+".png'></img></td>";	
	// }
	// table += "</tr>"
	table += "<tr>";
	for(var i in daily){
		var d = new Date(daily[i].date);
		table += "<td>"+weekday[d.getDay()]+"</td>";
	}
	table += "</tr>";
	table += "<tr>";
	for(var i in daily){
		table += "<td>"+Math.round(daily[i].low)+"°C/"+Math.round(daily[i].high)+"°C</td>";	
	}
	table += "</tr>"
	table += "</table>";
	document.getElementById("week").innerHTML = table;

	
}

var city = localStorage.city;
city = city?city:"北京";
var url = "https://api.thinkpage.cn/v3/weather/now.json?key=iahvkbtk2wnfdv1k&location="+city+"&language=zh-Hans&unit=c";

url = "https://api.thinkpage.cn/v3/weather/daily.json?key=iahvkbtk2wnfdv1k&location="+city+"&language=zh-Hans&unit=c&start=0&days=5"
httpRequest(url, showDailyWeather);