var myScroll;
var pullDownFlag, pullUpFlag;
var pullDown, pullUp;
var spinner;

function loaded() {
    pullDownFlag = 0;
    pullUpFlag = 0;
    pullDown = $(".pulldown");
    pullUp = $(".pullup");
    spinner = $("#spinner");
    myScroll = new IScroll('.wrapper', {
        probeType: 3,
        //        momentum: false,//关闭惯性滑动
        mouseWheel: true, //鼠标滑轮开启
        scrollbars: true, //滚动条可见
        fadeScrollbars: true, //滚动条渐隐
        interactiveScrollbars: true, //滚动条可拖动
        shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
        useTransform: true, //CSS转化
        useTransition: true, //CSS过渡
        bounce: true, //反弹
        freeScroll: false, //只能在一个方向上滑动
        startX: 0,
        startY: 0,
        //        snap: "li",//以 li 为单位
    });
    myScroll.on('scroll', positionJudge);
    myScroll.on("scrollEnd", action);
}

function positionJudge() {
    if (this.y > 80) { //判断下拉
        pullDown.html("放开刷新页面");
        pullDownFlag = 1;
        $('.scroller').css('margin-top', '40px');
    }
    if (this.y < (this.maxScrollY - 80)) { //判断上拉
        pullUp.html("加载中…");
        pullUpFlag = 1;
    }
}
//动作判断
function action() {
    if (pullDownFlag == 1) {
        pullDownAction();
        setTimeout(function () {
            $('.scroller').animate({
                marginTop: "0"
            });
        }, 2000);
        setTimeout(function () {
            pullDown.html("下拉刷新…");
            pullDownFlag = 0;
        }, 3000);
    }
    if (pullUpFlag == 1) {
        pullUpAction();
        setTimeout(function () {
            pullUp.html("上拉加载…");
            pullUpFlag = 0;
        }, 3000);
    }
}
//下拉刷新动作
function pullDownAction() {
    //    spinner.css('display', 'block');
    pullDown.html("正在刷新…");
    setTimeout(function () {
        //        var ul = $(".list");
        //        var lis = ul.find(".item");
        //        for (var i = 0; i < lis.length; i++) {
        //            lis[i].innerHTML = "下拉刷新" + i;
        //        }
        //        var html = '';
        //        for (var i = 0; i < 6; i++) {
        //            html += '<a class="weui-media-box weui-media-box_appmsg item">' +
        //                '<div class="weui-media-box__bd">' +
        //                '<h4 class="weui-media-box__title">考试系统' +
        //                i +
        //                '<small>0.5人/日</small></h4>' +
        //                '<p class="weui-media-box__desc">日报内容日报内容日报内容日报内容</p>' +
        //                '<ul class="weui-media-box__info">' +
        //                '<li class="weui-media-box__info__meta">刘飞</li>' +
        //                '<li class="weui-media-box__info__meta">2020-05-12 17:17:06</li>' +
        //                '</ul>' +
        //                '</div>' +
        //                '</a>';
        //        }
        //        ul.html(html);
        refreshDate();
        pullDown.html("刷新完成…");
        //        spinner.css('display', 'none');
        setTimeout(function () {
            myScroll.refresh();
        }, 100);
    }, 1000);
}
//上拉加载动作
function pullUpAction() {
    setTimeout(function () {
        //        var ul = $(".list");
        //        var html = '';
        //        for (var i = 0; i < 6; i++) {
        //            html += '<a class="weui-media-box weui-media-box_appmsg item">' +
        //                '<div class="weui-media-box__bd">' +
        //                '<h4 class="weui-media-box__title">考试系统 <small>0.5人/日</small></h4>' +
        //                '<p class="weui-media-box__desc">日报内容日报内容日报内容日报内容</p>' +
        //                '<ul class="weui-media-box__info">' +
        //                '<li class="weui-media-box__info__meta">刘飞</li>' +
        //                '<li class="weui-media-box__info__meta">2020-05-12 17:17:06</li>' +
        //                '</ul>' +
        //                '</div>' +
        //                '</a>';
        //        }
        //        ul.append(html);
        addDate();
        setTimeout(function () {
            myScroll.refresh();
        }, 100);
    }, 1000);
}

function updatePosition() {
    pullDown.innerHTML = this.y >> 0;
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);