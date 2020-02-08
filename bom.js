function showBrowser(){
  //For navigator
document.getElementById("appName").innerHTML = navigator.appName;
document.getElementById("engine").innerHTML = navigator.product;
document.getElementById("ver").innerHTML = navigator.appVersion;
document.getElementById("agent").innerHTML = navigator.userAgent;
document.getElementById("platform").innerHTML = navigator.platform;
document.getElementById("lang").innerHTML = navigator.language;

//for window
document.getElementById("inHeight").innerHTML = window.innerHeight +"px";
document.getElementById("inWidth").innerHTML = window.innerWidth +"px";

//screen
document.getElementById("screenWidth").innerHTML = screen.width+"px";
document.getElementById("screenHeight").innerHTML = screen.height+"px";
document.getElementById("avalWidth").innerHTML = screen.availWidth+"px";
document.getElementById("avalHeight").innerHTML = screen.availHeight+"px";
document.getElementById("colorDepth").innerHTML = screen.colorDepth+"bits";
document.getElementById("pixelDepth").innerHTML = screen.pixelDepth+"bits";

//location
document.getElementById("href").innerHTML = window.location.href;
document.getElementById("hName").innerHTML = window.location.hostname;
document.getElementById("pName").innerHTML = window.location.pathname;
document.getElementById("protocol").innerHTML = window.location.protocol;

//geolocation
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
}
else {
	document.getElementById("lati").innerHTML = "Geolocation is not supported by this browser.";
	document.getElementById("longti").innerHTML = "Geolocation is not supported by this browser.";
}
}
function showPosition(position){
  document.getElementById("lati").innerHTML = "Latitude: " + position.coords.latitude;
  document.getElementById("longti").innerHTML = "Longitude: " + position.coords.longitude;
}
