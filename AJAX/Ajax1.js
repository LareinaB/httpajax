let xhr = new XMLHttpRequest();
xhr.open('get', 'temp.json?_='+Math.random(), true);
xhr.setRequestHeader('cookie', 'cache'); //不能是汉字
// 请求头必须在open之后，send之前设置
xhr.timeout = 1;
xhr.ontimeout = () => {
    console.log("请求超时");
    xhr.abort();
};

xhr.onreadystatechange = () => {
    let {readyState:state, status} = xhr;
    // 请求成功  以2或3开头的后面两位数字
    if(! (/^(2|3)\d{2}$/).test(status)) return;

    // 状态为2时就可以获取头信息
    if(state === 2){
        let headAll = xhr.getAllResponseHeaders(),
            serverDate = xhr.getResponseHeader("date");
        // 时间是格林尼治时间差8小时 new Date转化为北京时间
        console.log(headAll, new Date(serverDate));
        return;
    }

    if(state === 4){
        let valueText = xhr.responseText, // 获取的结果，一般都是字符串
            valueXML = xhr.responseXML; //获取到XML格式数据
        console.log(valueText, valueXML);
    }
};
xhr.send(null);
