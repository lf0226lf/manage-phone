var Random = Mock.Random;

var data = Mock.mock('http://123.com', {
    //list是一个数组，包含5个元素
    'list|8': [
        {
            'title': '考试系统',
            'hours': '0.5',
            'intro': '日报内容日报内容日报内容日报内容',
            'name': '刘飞',
            'datetime': Random.datetime(),
        }
    ]
})
//每一个层级比上一个多2个空格
//console.log(JSON.stringify(data, null, 2));
;