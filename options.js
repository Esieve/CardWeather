var city = localStorage.city || "北京";
document.getElementById("city").value=city;
document.getElementById("save").onclick = function () {
	localStorage.city = document.getElementById("city").value;
	alert("Success!");
}