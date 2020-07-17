var apiUrl = 'http://139.224.229.86/templete/phone/';
//var apiUrl = 'http://192.168.31.121:8083/phone/';

var getDdid = getCookieValue('ddid');
var tabNo;

$(function () {
	var currentUrl = window.location.pathname;
	if (getDdid == "") {
		if (currentUrl.indexOf('login.html') >= 0) {
			return;
		}
		window.parent.frames.location.href = "login.html";
	}
});
