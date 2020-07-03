var type;
var task_state = {
	"0": "a",
	"1": "b",
	"2": "c",
	"3": "d",
};
var totalPage;
var currentPage = 1;
var queryType = 0;

function loadMissions(type) {
	queryType = type;
	console.log(queryType);
	currentPage = 1;
	$.ajax({
		url: apiUrl + 'queryMissionList',
		type: 'GET',
		data: {
			status: '',
			queryType: type,
			ddUserId: getDdid,
			rowsPerPage: '8',
			currentPage: currentPage.toString(),
			sortField: 't.f_level desc,t.f_createtime desc',
		},
		success: function (result) {
			if (result.resultData.length == 0) {
				//无数据显示
			} else {
				add(result, 3);
				totalPage = result.resultPojo.pages;
				console.log(result.resultData);
				console.log(totalPage);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
		}
	});
}


function init(type) {
	$.ajax({
		url: apiUrl + 'queryMissionList',
		type: 'GET',
		data: {
			status: '',
			queryType: type.toString(),
			ddUserId: getDdid,
			rowsPerPage: '8',
			currentPage: currentPage.toString(),
			sortField: 't.f_level desc,t.f_createtime desc',
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
		console.log(currentPage);
		$.ajax({
			url: apiUrl + 'queryMissionList',
			type: 'GET',
			data: {
				status: '',
				queryType: queryType.toString(),
				ddUserId: getDdid,
				rowsPerPage: '8',
				currentPage: currentPage.toString(),
				sortField: 't.f_level desc,t.f_createtime desc',
			},
			success: function (result) {
				add(result, 2);
				console.log(result);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
			}
		});
		return false;
	} else {
		return true;
	}
}

function refreshDate() {
	currentPage = 1;
	$.ajax({
		url: apiUrl + 'queryMissionList',
		type: 'GET',
		data: {
			status: '',
			queryType: queryType.toString(),
			ddUserId: getDdid,
			rowsPerPage: '8',
			currentPage: currentPage.toString(),
			sortField: 't.f_level desc,t.f_createtime desc',
		},
		success: function (result) {
			if (result.resultData.length == 0) {
				//无数据显示
			} else {
				add(result, 3);
				totalPage = result.resultPojo.pages;
				console.log(result.resultData);
				console.log(totalPage);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
		}
	});
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
		var hurry = obj.level == "1" ? '<span class="hurry">急</span>' : '';
		html += '<a href="javascript:" class="weui-media-box weui-media-box_appmsg" onclick="window.parent.frames.location.href = \'task-detail.html?id=' + obj.missionId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<div class="task_state ' + task_state[obj.status] + '">' +
			'</div>' +
			'<h4 class="weui-media-box__title">' +
			hurry + obj.missionName + '<small>' + obj.hopeDaily + '人/日</small>' +
			'</h4>' +
			'<p class="weui-media-box__desc">' + obj.missionRemark + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.createMan + '→' + obj.handlerMan + '</li>' +
			'<li class="weui-media-box__info__meta">交期：' + obj.finishTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>'
	});
	$('#panel_1 .list').html(html);
	loaded();
}

function addBox(result) {
	var html = "";
	$.each(result.resultData, function (index, obj) {
		var hurry = obj.level == "1" ? '<span class="hurry">急</span>' : '';
		html += '<a href="javascript:" class="weui-media-box weui-media-box_appmsg" onclick="window.parent.frames.location.href = \'task-detail.html?id=' + obj.missionId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<div class="task_state ' + task_state[obj.status] + '">' +
			'</div>' +
			'<h4 class="weui-media-box__title">' +
			hurry + obj.missionName + '<small>' + obj.hopeDaily + '人/日</small>' +
			'</h4>' +
			'<p class="weui-media-box__desc">' + obj.missionRemark + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.createMan + '→' + obj.handlerMan + '</li>' +
			'<li class="weui-media-box__info__meta">交期：' + obj.finishTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>'
	});
	$('#panel_1 .list').append(html);
}

function refreshBox(result) {
	var html = "";
	$.each(result.resultData, function (index, obj) {
		var hurry = obj.level == "1" ? '<span class="hurry">急</span>' : '';
		html += '<a href="javascript:" class="weui-media-box weui-media-box_appmsg" onclick="window.parent.frames.location.href = \'task-detail.html?id=' + obj.missionId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<div class="task_state ' + task_state[obj.status] + '">' +
			'</div>' +
			'<h4 class="weui-media-box__title">' +
			hurry + obj.missionName + '<small>' + obj.hopeDaily + '人/日</small>' +
			'</h4>' +
			'<p class="weui-media-box__desc">' + obj.missionRemark + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.createMan + '→' + obj.handlerMan + '</li>' +
			'<li class="weui-media-box__info__meta">交期：' + obj.finishTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>'
	});
	$('#panel_1 .list').html(html);
}

