// 分页实现的原理
//1、通过Ajax请求数据 total总数
//2、计算显示的页数 totalPage = Math.ceil(total/pageNum) 绑定分页数据
//3、默认展示第一页数据
//4、给实现分页的按钮绑定事件，根据当前页数展示相应内容
var list = document.getElementById('list'),
    page = document.getElementById('page'),
    pageList = document.getElementById("pageList");

// 一、ajax获取数据
var total = 0, totalPage = 0, pageNum = 10, curPage = 1;
list.style.height = pageNum * 30 + "px";
utils.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);
    bindPage();
    bindData(curPage, data);
    // 四、利用事件委托实现分页切换
    page.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if(tar.tagName.toLowerCase() === "li"){
            // 点击分页页码
            page = Number(tar.innerHTML);
            curPage = page;
        }else if(tar.id === "first"){
            curPage = 1;
        }else if(tar.id === "last"){
            curPage = totalPage;
        }else if(tar.id === "prev"){
            if(curPage ===1 ){
               alert("已经是第一页了");
               return;
            }
            curPage --;
        }else if(tar.id === "next"){
            if(curPage === totalPage ){
                alert("已经是最后一页了");
                return;
            }
            curPage ++;
        }else if(tar.id === "search"){
            return;
        }
        bindData(curPage, data);
        changeBg();
    };

    // 六、文本框绑定keyup事件，按下enter键，实现切换
    var search = document.getElementById("search");
    search.onkeyup = function (e) {
        e = e || window.event;
        if(e.keyCode === 13){
            var val = this.value.replace(/(^ +| +$)/g, "");
            if(/^(\d|([1-9]\d+))$/.test(val)){
                if(val < 1 || val > totalPage){
                    this.value = totalPage;
                    val = totalPage;
                }
                curPage = val;
                bindData(curPage, data);
                changeBg();
            }else{
                this.value = "";
                this.focus();
            }
        }
    };
});

// 二、动态绑定分页页码
function bindPage() {
    var str = "";
    for (var i = 1; i <= totalPage; i++) {
        var c = i === curPage ? "select" : null;
        str += "<li class='"+c+"'>" + i + "</li>"
    }
    pageList.innerHTML = str;
}

//三、绑定数据
//第一页 index 0-9；第二页 10-19； ...第n页 (n-1)*pageNum-(n*pageNum-1)
function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, eIndex = page * pageNum - 1;
    var str = "";
    for(var i = sIndex; i <= eIndex; i ++){
        var cur = data[i];
        if(cur){
            var color = i % 2 === 1 ? "even" : null;
            str += "<li class='"+color+"' num = '"+ cur["num"] +"'>";
            for(var key in cur){
                var val = key === "sex" ? (cur[key] === 1 ? "男" : "女") : cur[key];
                str += "<span>" + val + "</span>"
            }
            str += "</li>";
        }
    }
    list.innerHTML = str;
    // 给每个li绑定点击事件
    var oLis = list.getElementsByTagName("li");
    for(var k = 0; k < oLis.length; k ++){
        oLis[k].onclick = function () {
            window.location.href = "detail.html?num=" + this.getAttribute("num");
        };
    }
}

//五、分页选中样式切换
function changeBg() {
    var oLis = pageList.getElementsByTagName("li");
    for(var i = 0; i < oLis.length; i ++){
        oLis[i].className = i === (curPage-1) ? "select": null;
    }
}

//详情页是根据地址栏的不同来区分的, 详情页都是一个页面


