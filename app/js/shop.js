var shop = (function() {
    var xm8 = document.querySelector('.xm8');
    var unit = document.querySelector('.units');
    var xff = document.querySelector('.xff');
    var ramer = document.querySelector('.ramer');
    var memory = document.querySelector('.memory');
    var lucency = document.querySelector('.lucency');
    var shopNone = document.createElement('div');
    var addCart = document.querySelector('.addCart');
    shopNone.className="shopNone";
    xm8.appendChild(shopNone)
    var j_box = document.querySelector('.j-box');
    var xm8sj;
    // var getData = null;
    return {
        init() {
            this.getJson();
            this.event();
        },
        event() {
            var _this = this;
            addCart.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                console.log(target)
                    // 获取自定义属性
                    var index = xm8sj.getAttribute('index');
                    var obj = {
                        count: 1,
                        ..._this.data[index]
                    }
                    console.log(obj);
                    _this.setData(obj);
                }

            
            // j_box.onchange = function(e) {
            //     e = e || window.event;
            //     var target = e.target || e.srcElement;
               
            //         var index = xm8sj.getAttribute('index');
            //         _this.data[index].count = Number(j_box.value);                  
                
            // }
        },
        getJson() {
           var _this = this;
           sendAjax('json/shop.json', {
               success(data) {
                    _this.insertData(JSON.parse(data)); 
                                   }
           }) 
        },
        insertData({code, data}) {
            // getData = data;
            this.data = data;
            if(code == 200) {
                // var str = '';
                 var arr = [];
                data.forEach((item, index) => {
                    var $div = `
                    <div class="xm8sj pop" id="${item.id}" index=${index}>
                <input type="checkbox" class="che">
                <a href="" class="xm8img-box"><img class="xm8img" src="${item.img}" alt=""></a>
                <a href="" class="xm8pm">${item.name} ${item.ramer}内存 ${item.color} ${item.memory}GB</a>
                <span class="unit">${item.price}元</span>
                <p class="jiajian">
                    <button class="jian j-box">-</button>
                    <input type="text" class="count j-box" value="1">
                    <button class="jia j-box">+</button>
                </p>
                <span class="subtotal">${item.price}元</span>
                <button class="dele">X</button>
            </div>`
                    arr.push($div);


                    // unit.innerHTML = item.price;
                    // ramer.innerHTML = item.ramer;
                    // memory.innerHTML = item.memory;
                    // lucency.innerHTML = item.color;
                    // xff.innerHTML = item.name;
                })
                // // 数组拼接效率比字符串拼接效率高
               
                shopNone.innerHTML = arr.join((''));
                console.log(data);
                
            } else {
                alert('你没有获取数据的权限')
            }
        },
        // 把数据存储到本地
        setData(data) {
            //[{}]
            // debugger
            var shoplist = localStorage.getItem('shoplist') || '[]';
            shoplist = JSON.parse(shoplist);
            // var flag = true;
            // 如果商品不存在，添加一条新数据
            // 如果商品已经存在,数量累加即可
            for(var i = 0; i < shoplist.length; i++) {
                var item = shoplist[i];
                if(item.id == data.id) {
                    // flag = false
                    // 商品已经存在
                    item.count += data.count;
                    break;
                } 
            }
            // if(flag) {

            // }
            if(i == shoplist.length) {
                // 商品不存在
                shoplist.push(data);
            }
            localStorage.shoplist = JSON.stringify(shoplist);
            alert('加入购物车成功')
        }
    }
}())
shop.init();