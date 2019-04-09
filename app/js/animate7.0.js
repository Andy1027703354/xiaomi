//传入元素，对象，回调函数
function animate(ele,obj,fn){
    /*var fn = function(){
            
        }*/
    /*
     * var attrObj = {
            opacity:20,
            width:300,
            height:300,
            left:400,
            top:300
        }
     */
    //所有属性一起运动
    if(!obj.time){
        obj.time = 20;
    }
    clearInterval(ele.timer);
    ele.timer = setInterval(function(){
        
        
        //console.log(getStyle(ele,attr));
        //将透明度扩大100百进行操作
        //如何判断操作的是透明度
        //以下所有一串执行过程 ，交给所有的属性一起执行
        //width,heith,let,top{
        //遍历对，拿到所有的属性和目标值	
        //定义一个控制开头，要求所有的属性运动都达互了目标值才对定时器进行清除操作，否则不清除。
        var flag = true;//表示所有属性都到达了目标值了。
        for(var attr in obj.param){
            var current = 0;
            if(attr == "opacity"){
                current = getStyle(ele,attr)*100;
                console.log(current);
            }else{
                current = parseInt(getStyle(ele,attr));
            }
            //var speed = (target - current)/10;
            var speed = (obj.param[attr] - current)/10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //if(current == attrObj[attr]){//到达目标值
                //最快到达目标值 的这个属性运动会把其它的还没有到达目标值的属性动画都给清除了。所以其它属性达不到目标值
                //clearInterval(ele.timer);
//					}else{
//						if(attr == "opacity"){
//							ele.style[attr] = (current + speed)/100;
//						}else{
//							ele.style[attr] = current + speed + "px";
//						}
//					}
            //属性未到达目标值的时候 flag = false;
            if(current != obj.param[attr]){
                flag = false;
            }
            
            if(attr == "opacity"){
                ele.style[attr] = (current + speed)/100;
            }else if(attr == "zIndex"){
                ele.style[attr] = obj.param[attr];
            }else{
                ele.style[attr] = current + speed + "px";
            }
            
        }
        
        if(flag){//所有属性都到达了目标值了。
            clearInterval(ele.timer);
            //到达目标值后，可以在这里做点其它事件？
            //如何做？
            //调用某种方法，可以执行某种功能
            if(fn){
                fn();
            }
        }
        //}
    },obj.time);
}

function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}