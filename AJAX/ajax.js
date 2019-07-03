~function () {
    class AjaxClass {
        // => send ajax
        init(){
            // => this = example
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && /^[23]\d{2}$/.test(xhr.status.toString())){
                    let result = xhr.responseText;
                    //=> DATATYPE
                    switch (this.dataType.toUpperCase()) {
                        case 'TEXT':
                        case 'HTML':
                            break;
                        case 'JSON':
                            result = JSON.parse(result);
                            break;
                        case 'XML':
                            result = xhr.responseXML;
                    }
                    this.success(result);
                }
            };
            //=>DATA
            if(this.data !== null){
                this.data = this.formatData(data);
                if(this.isGET){
                    this.url += this.querySymbol() + this.data;
                    this.data = null;
                }
            }
            //=>CACHE
            this.isGET ? this.cacheFn() : null;
            xhr.open(this.method, this.url, this.async);
            xhr.send(this.data);
        }
        // convert object data to string data
        formatData() {
            // this=> example
            if(Object.prototype.toString().call(this.data) === '[object, object]'){
                let obj = this.data,
                    str = ``;
                for (key in obj){
                    if(obj.hasOwnProperty(key)){
                        str += `${key}=${obj[key]}&`;
                    }
                }
                str = str.replace(/&$/g, '');
                this.data = str;
            }
        }

        cacheFn() {
            // this=> example
            !this.cache ? this.url += `${this.querySymbol()}_=${Math.random()}` : null;
        }
        querySymbol() {
            // this=> example
            return this.url.indexOf('?') > -1 ? '&' : '?';
        }
    }
    // => 接收参数初始化 init parameters
    window.ajax = function ({
        url = null,
        method = 'GET',
        type = null,
        data = null,
        dataType = 'json',
        cache = true,
        async = true,
        success = null} = {}) {
        let example =  new AjaxClass();
        example.url = url;
        example.method = type === null ? method : type;
        example.data = data;
        example.dataType = dataType;
        example.cache = cache;
        example.async = async;
        example.success = typeof success === 'function' ? success : new Function();
        example.isGET = /^(GET|DELETE|HEAD)$/i.test(example.method);
        example.init();
        return example;
    };
} ();

