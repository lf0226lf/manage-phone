var type;
var process_type = {
	"0": "日报",
	"1": "项目立项",
	"2": "报价"
};
var dailyType = {
	"0": "商机",
	"1": "项目",
	"2": "其他",
	"3": "行政"
};
var totalPage;
var currentPage = 1;

function init() {
	$.ajax({
		url: apiUrl + 'queryTaskList',
		type: 'GET',
		data: {
			ddUserId: getDdid,
			handleStatus: '0',
			processType: '0',
			rowsPerPage: '8',
			currentPage: currentPage.toString(),
			sortField: 't.f_taskid',
			sortOrder: 'desc'
		},
		success: function (result) {
			if (result.resultData.length == 0) {
				//无数据显示
				$('.no-date').show();
			} else {
				add(result, 1);
				$('.no-date').hide();
				totalPage = result.resultPojo.pages;
				//console.log(result.resultData);
				//console.log(totalPage);
				console.log($('.weui-panel').scrollTop());
			}
			if (result.resultData.length < 8){
				$(".pullup").html("加载结束");
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
			url: apiUrl + 'queryTaskList',
			type: 'GET',
			async: true,
			data: {
				ddUserId: getDdid,
				handleStatus: '0',
				processType: '0',
				rowsPerPage: '8',
				currentPage: currentPage.toString(),
				sortField: 't.f_taskid',
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
		url: apiUrl + 'queryTaskList',
		type: 'GET',
		async: true,
		data: {
			ddUserId: getDdid,
			handleStatus: '0',
			processType: '0',
			rowsPerPage: '8',
			currentPage: currentPage.toString(),
			sortField: 't.f_taskid',
			sortOrder: 'desc'
		},
		success: function (result) {
			if (result.resultData.length == 0) {
				//无数据显示
				$('.no-date').show();
			} else {
				$('.no-date').hide();
				add(result, 3);
			}
			if (result.resultData.length < 8){
				$(".pullup").html("加载结束");
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
		html += '<div href="javascript:" class="weui-media-box weui-media-box_appmsg item" onclick="window.parent.frames.location.href = \'daily-detail-audit.html?id=' + obj.taskId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<h4 class="weui-media-box__title">' + process_type[obj.processType] +
			//			'<small>' + obj.hours + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + obj.objName + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.creater + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.createTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</div>';
	});
	$('#panel_1 .list').html(html);
	loaded();
}

function addBox(result) {
	var html = "";
	$.each(result.resultData, function (index, obj) {
		html += '<div href="javascript:" class="weui-media-box weui-media-box_appmsg item" onclick="window.parent.frames.location.href = \'daily-detail-audit.html?id=' + obj.taskId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<h4 class="weui-media-box__title">' + process_type[obj.processType] +
			//			'<small>' + obj.hours + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + obj.objName + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.creater + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.createTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</div>';
	});
	$('#panel_1 .list').append(html);
}

function refreshBox(result) {
	var html = "";
	$.each(result.resultData, function (index, obj) {
		html += '<div href="javascript:" class="weui-media-box weui-media-box_appmsg item" onclick="window.parent.frames.location.href = \'daily-detail-audit.html?id=' + obj.taskId + '\'">' +
			'<div class="weui-media-box__bd">' +
			'<h4 class="weui-media-box__title">' + process_type[obj.processType] +
			//			'<small>' + obj.hours + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + obj.objName + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.creater + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.createTime + '</li>' +
			'</ul>' +
			'</div>' +
			'</div>';
	});
	$('#panel_1 .list').html(html);
}
