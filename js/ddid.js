var getDdid = getCookieValue('ddid');
//	var ddid='0331430927690630';
var ddid;
var corpId = 'dingcb2c55db9b29c67d35c2f4657eb6378f';
if (getDdid == "") {
	dd.runtime.permission.requestAuthCode({
		corpId: corpId,
		onSuccess: function (result) {
			var code = result.code;
			$.ajax({
				type: "GET",
				url: 'http://139.224.229.86/templete/phone/phoneDdLogin?code=' + code,
				async: true,
				//                data: {
				//                    code: code
				//                },
				success: function (data) {
					console.log(data);
					if (data.resultCode == '0') {
						ddid = data.resultData;
						setCookie('ddid', ddid, 0.02083, '/');
					} else {
						ddid = data.resultData;
						window.parent.frames.location.href = "login.html?id=" + ddid;
					}
				}
			});
		},
		onFail: function (err) {

		}
	})
}
