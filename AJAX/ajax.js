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
                    try {
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
                    } catch (e) {

                    }
                    this.success(result);
                }
            };
            //=>DATA
            if(this.data !== null){
                this.formatData();
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
            if(Object.prototype.toString.call(this.data) === '[object Object]'){
                let obj = this.data,
                    str = ``;
                for (let key in obj){
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
        // init parameters
        url = null,
        method = 'GET',
        type = null,
        data = null,
        dataType = 'json',
        cache = true,
        async = true,
        success = null} = {}) {
        let _this =  new AjaxClass();
        // 批量处理的方式
        ['url', 'method', 'data', 'dataType', 'cache', 'async', 'success'].forEach((item) => {
            if(item === 'method'){
                _this.method = type === null ? method : type;
                return;
            }
            if(item === 'success'){
                _this.success = typeof success === 'function' ? success : new Function();
                return;
            }
            _this[item] = eval(item);
        });
        _this.isGET = /^(GET|DELETE|HEAD)$/i.test(_this.method);
        _this.init();
        return _this;
    };
} ();

