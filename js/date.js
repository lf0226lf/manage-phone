var type;
var totalPage = 30;
var currentPage;

function init() {
	$.ajax({
		url: 'http://123.com',
		dataType: "json",
		success: function (result) {
			add(result, 1);
			console.log(result);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
		}
	})
}

function addDate() {
	$.ajax({
		url: 'http://123.com',
		dataType: "json",
		success: function (result) {
			add(result, 2);
			console.log(result);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
		}
	})
}

function refreshDate() {
	$.ajax({
		url: 'http://123.com',
		dataType: "json",
		success: function (result) {
			add(result, 3);
			console.log(result);
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
	$.each(result.list, function (index, obj) {
		html += '<a class="weui-media-box weui-media-box_appmsg item" href="daily-detail-audit.html">' +
			'<div class="weui-media-box__bd">' +
			'<h4 class="weui-media-box__title">' + obj.title +
			'<small>' + obj.hours + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + obj.intro + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.name + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.datetime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>';
	});
	$('#panel_1 .list').append(html);
	loaded();
}

function addBox(result) {
	var html = "";
	$.each(result.list, function (index, obj) {
		html += '<a class="weui-media-box weui-media-box_appmsg item" href="daily-detail-audit.html">' +
			'<div class="weui-media-box__bd">' +
			'<h4 class="weui-media-box__title">' + obj.title +
			'<small>' + obj.hours + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + obj.intro + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.name + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.datetime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>';
	});
	$('#panel_1 .list').append(html);
}

function refreshBox(result) {
	var html = "";
	$.each(result.list, function (index, obj) {
		html += '<a class="weui-media-box weui-media-box_appmsg item" href="daily-detail-audit.html">' +
			'<div class="weui-media-box__bd">' +
			'<h4 class="weui-media-box__title">' + obj.title +
			'<small>' + obj.hours + '人/日</small></h4>' +
			'<p class="weui-media-box__desc">' + obj.intro + '</p>' +
			'<ul class="weui-media-box__info">' +
			'<li class="weui-media-box__info__meta">' + obj.name + '</li>' +
			'<li class="weui-media-box__info__meta">' + obj.datetime + '</li>' +
			'</ul>' +
			'</div>' +
			'</a>';
	});
	$('#panel_1 .list').html(html);
}
