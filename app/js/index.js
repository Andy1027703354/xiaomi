class Banner{
    constructor(){
        this.tipBox = document.querySelector('#imgIndex');
        this.tipAll = this.tipBox.children;
        this.imgbox = document.querySelector('.imgbox')
        this.imgAll = document.querySelectorAll('.imgbox li');
        this.timer = null;
        this.index = 0;
        this.show_left = document.querySelector('.show_left');
        this.show_right = document.querySelector('.show_right');
        for(let i=0;i<this.tipAll.length;i++){
            this.tipAll[i].index = i;
        }
    }
    init(){
        this.event();
        this.autoplay();
    }
    event(){
        const self = this;
        this.tipBox.onclick = function(e){
            e || event;
            var target = e.target || e.srcElement;
            if(target.nodeName == 'LI'){
                self.index = target.index;
                self.showImg();
                self.autoplay();
            }
        }
        for(var i=0;i<this.imgAll.length;i++){
            this.imgAll[i].onmouseover = function(e){
                e = e || event;
                var target = e.target || e.srcElement;
                if(target.name == 'img'){
                    self.autoplay();
                    clearInterval(self.timer);
                } 
            }
        }
        for(var i=0;i<this.imgAll.length;i++){
            this.imgAll[i].onmouseout = function(e){
                e = e || event;
                var target = e.target || e.srcElement;
                if(target.name == 'img'){
                    self.autoplay();
                } 
            }
        }
        this.show_right.onclick = function(){
            self.index++;
            self.showImg();
            self.autoplay();
        }
        this.show_left.onclick = function(){
            self.index--;
            self.showImg();
            self.autoplay();
        }
    }
    showImg(){
        if(this.index < 0){
            this.index = this.tipAll.length - 1;
        }else if(this.index > this.tipAll.length - 1){
            this.index = 0;
        }
        for(let i=0;i<this.imgAll.length;i++){
            this.tipAll[i].classList.remove('f08');
            this.move(this.imgAll[i],'opacity',0,500,function(obj){
                obj.style.display = 'none';
            })
        }
        this.tipAll[this.index].classList.add('f08');
        this.imgAll[this.index].style.display = 'block';
        this.move(this.imgAll[this.index],'opacity',100,500)
    }
     autoplay(){
         const self = this;
         clearInterval(self.timer);
         self.timer = setInterval(function(){
             self.index++
             self.showImg();
         },2000)
     }
      move(ele, attr, target, time=1000, callback) {
        // 获取非行内样式
        function getStyle(obj, attr) {
        if(window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr];
        }
        return obj.currentStyle[attr];
    }
        var obj = ele;
        // clearInterval(ele.timer);
        if(typeof ele == 'string') {
            obj = document.querySelector(ele);
        }
        clearInterval(obj.timer);
        // 获取初始值
        var init = parseFloat(getStyle(obj, attr));
        if(attr == 'opacity') init *= 100;
        var speed = (target - init) / time * 10;
        // 把定时器存储到dom对象中
        obj.timer = setInterval(() => {
            init += speed;
            if((speed >= 0 && init >= target) || (speed <= 0 && init <= target) ) {
                // 运动终止的条件
                clearInterval(obj.timer);
                init = target;
                // function callback(obj) {
                //     //
                // }
                if(typeof callback == 'function') {
                    callback(obj)
                }
            }
            if(attr == 'opacity') {
                obj.style[attr] = init / 100;
            } else {
                obj.style[attr] = init + 'px';
            }
        }, 10)
    }
    
    
}
window.onload = function(){
    new Banner().init();
}