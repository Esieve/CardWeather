var city = (localStorage.city || "English only");
document.getElementById("city").value=city;
document.getElementById("save").onclick = function () {
	var result = document.createElement("p");
	result.id = "result";
	if(/.*[\u4e00-\u9fa5]+.*$/.test(document.getElementById("city").value)){
		result.innerText = "English only";
		result.style.color = "#D0104C";
	}else{
		result.innerText = "Success!";
		result.style.color = "#00AA90";
		localStorage.city = document.getElementById("city").value;
	}
	var save = document.getElementById("save");
	(document.getElementsByTagName("body"))[0].replaceChild(result,save);
	setTimeout(function() {
		(document.getElementsByTagName('body'))[0].replaceChild(save,document.getElementById("result"));
	},1500);
}