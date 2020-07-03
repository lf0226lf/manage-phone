var type;
var process_type = {
	"0": "日报",
	"1": "项目立项",
	"2": "报价"
};
var daily_type = {
	"0": "商机",
	"1": "项目",
	"2": "其他",
	"3": "行政",
	"4": "企管"
};
var task_state = {
	"0": "a",
	"1": "b",
	"2": "c",
	"3": "d",
};
var totalPage;
var currentPage = 1;

function init() {
	$.ajax({
		url: apiUrl + 'queryProcessDetailList',
		type: 'GET',
		data: {
			ddUserId: getDdid,
			processType: '0',
			rowsPerPage: '8',
			currentPage: currentPage.toString(),
			sortField: 't.f_createtime',
			sortOrder: 'desc'
		},
		success: function (result) {
			if (result.resultData.length == 0) {
				//无数据显示
			} else {
				add(result, 1);
				totalPage = result.resultPojo.pages;
				//console.log(result.resultData);
				//console.log(totalPage);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
		}
	});
}

function addDate() {
	if (currentPage < totalPage) {
		currentPage++;
		//console.log(currentPage);
		$.ajax({
			url: apiUrl + 'queryProcessDetailList',
			type: 'GET',
			async: true,
			data: {
				ddUserId: getDdid,
				processType: '0',
				rowsPerPage: '8',
				currentPage: currentPage.toString(),
				sortField: 't.f_createtime',
				sortOrder: 'desc'
			},
			success: function (result) {
				add(result, 2);
				//console.log(result);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
			}
		})
		return false;
	} else {
		return true;
	}
}

function refreshDate() {
	currentPage = 1;
	$.ajax({
		url: apiUrl + 'queryProcessDetailList',
		type: 'GET',
		async: true,
		data: {
			ddUserId: getDdid,
			processType: '0',
			rowsPerPage: '8',
			currentPage: currentPage.toString(),
			sortField: 't.f_createtime',
			sortOrder: 'desc'
		},
		success: function (result) {
			if (result.resultData.length == 0) {
				//无数据显示
			} else {
				add(result, 3);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
		}
	})

}

function add(result, type) {
	if (type == 1) {
		initBox(result);
	}
	if (type == 2) {
		addBox(result);
	}
	if (type == 3) {
		refreshBox(result);
	}
}

function initBox(result) {
	var html = "";
	$.each(result.resultData, function (index, obj) {
		//console.log(obj);
		var dailyTimes = 0;
		var types = "";
		$.each(obj.dailies, function (index, obj) {
			dailyTimes += Number(obj.dailyTime);
			types += daily_type[obj.type] + '，';
		});
		types = (types).substring(0, types.length-1);
		//console.log(types);
		html += '<a class="weui-media-box weui-media-box_appmsg" onclick="window.parent.frames.location.href = \'daily-detail.html?id=' + obj.processDetailId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<div class="daily_state ' + task_state[obj.status] + '">' +
			'<span></span>' +
			'</div>' +
			'<h4 class="weui-media-box__title">' + process_type[obj.processType] + '<small>' + dailyTimes + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + types + '</p>' +
			'<ul class="weui-media-box__info">' +
			//'<li class="weui-media-box__info__meta">' + obj.creater + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.createTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>';
	});
	$('#panel_3 .list').html(html);
	loaded();
}

function addBox(result) {
	var html = "";
	$.each(result.resultData, function (index, obj) {
		//console.log(obj);
		var dailyTimes = 0;
		var types = "";
		$.each(obj.dailies, function (index, obj) {
			dailyTimes += Number(obj.dailyTime);
			types += daily_type[obj.type] + '，';
		});
		types = (types).substring(0, types.length-1);
		//console.log(types);
		html += '<a class="weui-media-box weui-media-box_appmsg" onclick="window.parent.frames.location.href = \'daily-detail.html?id=' + obj.processDetailId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<div class="daily_state ' + task_state[obj.status] + '">' +
			'<span></span>' +
			'</div>' +
			'<h4 class="weui-media-box__title">' + process_type[obj.processType] + '<small>' + dailyTimes + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + types + '</p>' +
			'<ul class="weui-media-box__info">' +
			//'<li class="weui-media-box__info__meta">' + obj.creater + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.createTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>';
	});
	$('#panel_3 .list').append(html);
}

function refreshBox(result) {
	var html = "";
	$.each(result.resultData, function (index, obj) {
		//console.log(obj);
		var dailyTimes = 0;
		var types = "";
		$.each(obj.dailies, function (index, obj) {
			dailyTimes += Number(obj.dailyTime);
			types += daily_type[obj.type] + '，';
		});
		types = (types).substring(0, types.length-1);
		//console.log(types);
		html += '<a class="weui-media-box weui-media-box_appmsg" onclick="window.parent.frames.location.href = \'daily-detail.html?id=' + obj.processDetailId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<div class="daily_state ' + task_state[obj.status] + '">' +
			'<span></span>' +
			'</div>' +
			'<h4 class="weui-media-box__title">' + process_type[obj.processType] + '<small>' + dailyTimes + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + types + '</p>' +
			'<ul class="weui-media-box__info">' +
			//'<li class="weui-media-box__info__meta">' + obj.creater + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.createTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>';
	});
	$('#panel_3 .list').html(html);
}
