var createXHR = (function () {
    if("XMLHttpRequest" in window){
        return function () {
            return new XMLHttpRequest();
        }
    }
    if(new ActiveXObject("Microsoft.XMLHTTP")){
        return function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if(new ActiveXObject("Msxml2.XMLHTTP")){
        return function () {
            return ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    if(new ActiveXObject("Msxml3.XMLHTTP")){
        return function () {
            return ActiveXObject("Msxml3.XMLHTTP");
        }
    }
})();
var utils = {
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")")
    },
    ajax: function (url, callback) {
        var _this = this;
        var xhr = createXHR();

        url += url.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
        xhr.open("get", url);
        xhr.onreadystatechange = () => {
            if(xhr.readyState ===4 && xhr.status === 200){
                var val = xhr.responseText;
                val = _this.toJSON(val);
                typeof callback === "function" ? callback(val) : null;
            }
        };
        xhr.send();
    }
};
