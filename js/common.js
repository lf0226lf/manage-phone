//	var apiUrl = 'http://139.224.229.86/templete/phone/';
var apiUrl = 'http://192.168.1.112:8083/phone/';
$(function () {
	var getDdid = getCookieValue('ddid');
	var currentUrl = window.location.pathname;
	if (currentUrl != '/login.html') {
		if (getDdid == "") {
			$(window).attr('location', 'login.html');
		}
	}
});