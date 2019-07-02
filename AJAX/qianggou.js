~function() {
    let box = document.getElementById('box'),
        serverTime = null;
    let fn = ()=>{
        // => 1、计算当前时间和目标时间的差值
        // new Date()获取客户端本机时间，会受客户端自己调整时间的影响
        // 因此要基于相同的服务器时间计算重要的时间参考
        // => 没间隔一秒钟， 需要把第一次获取服务器的时间累加
        serverTime = serverTime + 1000;
        let tarTime = new Date('2019/7/2 21:30:00').getTime(),
            spanTime = tarTime - serverTime;
        // => 2、计算差值中包含多少时分秒
        if(spanTime < 0) {
            // => 已经错过了抢购的时间（已经开抢了）
            clearInterval(autoTimer);
            box.innerHTML = '开抢啦！！！';
            return;
        }
        let hours = Math.floor(spanTime /(1000*60*60));
        spanTime -= hours * 3600000;
        let minutes = Math.floor(spanTime / (1000*60));
        spanTime -= minutes * 60000;
        let seconds = Math.floor(spanTime / 1000);
        box.innerHTML = `距离开抢还剩下${supply(hours)}:${supply(minutes)}:${supply(seconds)}`
    };
    let autoTimer = setInterval(fn, 1000);
    // 每隔一秒钟，执行一次fn


    // => 从服务器端获取服务器时间
    let getServerTime = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('head', 'temp.json', true);
        /*
        * 获取服务器时间总会出现时间差问题，服务器记录的时间到客户端接收的时间有延迟差
        * [尽可能减少时间差，是优化的目标]
        * 1、服务器返回的时间在响应头信息中就有，
        * 只需获取响应头信息，没必要获取响应主体，请求方式用HEAD即可
        * 2、必须使用异步，同步编程无法在状态为2或者3的时候做一些处理，
        * 而在状态为2的时候就可以获取了，所以需要使用异步
        * 3、在状态为2的时候就把服务器的时间获取到
        */

        xhr.onreadystatechange = () => {
            // xhr.readyState 1 2 4 head请求状态码中没有3 不需要等待响应主体内容

            // if(!/^[2|3]\d{2}$/.test(status)) return;
            if(xhr.readyState === 2){
                // 得到服务器时间
                serverTime = new Date(xhr.getResponseHeader('date')).getTime();
            }
            fn();
        };
        xhr.send(null);
    };
    getServerTime();
}();

function supply(time) {
    newTime = time < 10 ? '0' + time : time;
    return newTime;
}
