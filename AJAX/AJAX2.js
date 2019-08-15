let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if((xhr.readyState ===4) && (xhr.status === 200 || xhr.status === 304 )){
        let result = xhr.responseText; // 获取的结果，一般都是字符串
        return result;
    }
};
xhr.open('get', 'temp.json', true);
xhr.send(null);


