//点击坐标
var startX = 0;
var startY = 0;
//移动的坐标
var moveX = 0;
var moveY = 0;
//移动的距离
var X = 0;
var Y = 0;
//蛇头的坐标
var x = 0;
var y = 0;

//蛇对象
var python = {
  color:'#ff0000',
  x:0,
  y:0,
  w:20,
  h:20
}
//蛇身体
var pythonBody = [];
//方向
var fx = null;
var pythonfx = 'right';

Page({
    canvasStart:function(e){
      // console.log(e);
      startX = e.touches[0].x;
      startY = e.touches[0].y;
  },
  canvasMove:function(e){
    moveX = e.touches[0].x;
    moveY = e.touches[0].y;
    
    X = moveX - startX;
    Y = moveY - startY;

    if(Math.abs(X) > Math.abs(Y) && X > 0){
      fx = 'right'
    }else if(Math.abs(X) > Math.abs(Y) && X < 0){
      fx = 'left'
    }else if(Math.abs(X) < Math.abs(Y) && Y > 0){
      fx = 'buttom'
    }else{
      fx = 'top'
    }
  },
  canvasEnd:function(){
   
    pythonfx = fx;
  },
  onReady: function(){
        var cvs = wx.createContext();
        //帧数,模拟机60桢每秒
        var zs = 0;
        function draw(obj){
           cvs.setFillStyle(obj.color);
            cvs.beginPath();
            cvs.rect(obj.x, obj.y, obj.w, obj.h); 
            cvs.closePath();
            cvs.fill();
        }
        function animate(){
            zs++;
            if(zs%20 == 0){
              //给蛇身体添加一节
              pythonBody.push({
                x:python.x,
                y:python.y,
                w:20,
                h:20,
                color:"#00ff00"
              })
              //获取方向
              switch(pythonfx){
                case "right":
                  python.x += python.w;
                break;
                case "left":
                  python.x -= python.w;
                break;
                case "top":
                  python.y -= python.h;
                break;
                case "buttom":
                  python.y += python.h;
                break;
              }
              if(pythonBody.length > 4){
                pythonBody.shift()
              }
          }

          //绘制蛇头
          draw(python);

          //绘制身体
          for(var i=0; i<pythonBody.length; i++){
            var pythonBodys = pythonBody[i];
            draw(pythonBodys)
          }
          wx.drawCanvas({
            canvasId: 'String',
            actions: cvs.getActions()
          })
          requestAnimationFrame(animate);
        }
        animate();
    }
})

 