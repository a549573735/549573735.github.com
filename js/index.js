	$(function() {   
      	(function (){
		var oList=document.getElementById("list_head");
		var aDiv=oList.getElementsByTagName("div");
		var aBtn=document.getElementsByTagName("input");
		var oTimer=null;
		var oBoxParent=document.getElementById('nav_box');
		var aNavBox=oBoxParent.children;		
		var oClientWidth=document.documentElement.clientWidth;
		oList.style.left=oClientWidth/2+200+'px';
        var aPos=[];
        var oListApp=document.getElementById('list_app');
        var oBtn=document.getElementById('startBtn');
       
        var oStop=document.getElementById('tradeBtn');
        var arr=['JAVASCRIPT','HTML5','CSS3'];
        
        createLi(0)
       
	        var aApp=oListApp.children;
	        var len=oListApp.children.length;
	        oListApp.style.width=oListApp.children[0].offsetWidth*len+len*10+'px';
	        oListApp.style.marginLeft=-oListApp.offsetWidth/2+'px';
	        var aPosApp=[];
	        var R=200;
			var w=(oListApp.offsetWidth/2)-225;
		
        autoPlay();

        function autoPlay(){
        	var aApp=oListApp.children;
	        var len=oListApp.children.length;
	        oListApp.style.width=oListApp.children[0].offsetWidth*len+len*10+'px';
	        oListApp.style.marginLeft=-oListApp.offsetWidth/2+'px';
            
        
        for(var i=0;i<aApp.length;i++){
         aPosApp[i]={left:aApp[i].offsetLeft,top:aApp[i].offsetTop};
         aApp[i].style.left=aPosApp[i].left+'px';
         aApp[i].style.top=aPosApp[i].top+'px';
        }
        for(var i=0;i<aApp.length;i++){
       	 aApp[i].style.position='absolute';
       	 aApp[i].style.margin=0;
       	 aApp[i].style.WebkitTransform="scale(2.5)"; 
       	 aApp[i].style.MozTransform="scale(2.5)"; 
        }
        setTimeout(show,100);
         function show()
		{  
			for(var i=0;i<aApp.length;i++)
			{      	          
				aApp[i].style.transition=".5s "+(aApp.length-i)*300+"ms";
				aApp[i].style.WebkitTransform="scale(1)";
				aApp[i].style.MozTransform="scale(1)";
				aApp[i].style.opacity=1;

			}
		}
	};
		var iNow=0;
        oStop.onclick=function (){
           iNow++;
           if(iNow==arr.length){
             	iNow=0;
           }
           /*for(var i=0;i<oListApp.children.length;i++){
           	        oListApp.children[i].style.transition='1s'+i*100+'ms ease';
                    oListApp.children[i].style.WebkitTranform='scale(2)';
                    oListApp.children[i].style.MozTranform='scale(2)';                    
           }*/
           oListApp.innerHTML='';         
           
           createLi(iNow);

           autoPlay();
           
        }
        function createLi(iNow){
	        for(var i=0;i<arr[iNow].length;i++){
	        	var oLi=document.createElement('li');
	        	oListApp.appendChild(oLi);
	        	oLi.innerHTML=arr[iNow][i];
	        	oLi.className='active'+iNow;
	        }
        }

        var bClick=false;
	oBtn.onclick=function (){
       var w=(oListApp.offsetWidth/2)-225;
			bClick=!bClick;
			 var n=0;
			if(bClick){
	           for(var i=0;i<aApp.length;i++){
	           	aApp[i].style.transition='';
	           	aApp[i].index=i;
	           }

	           var timer=setInterval(function (){
	              (function (index){
	              	console.log(oBtn.offsetLeft)
	              $(aApp[n]).animate({left:oListApp.offsetWidth/2-25},{duration:1000,easing:'easeInOutBounce',
	              	complete:function(){
		                 if(index==aApp.length-1){
		                 	var i=0;
	                        timer=setInterval(function(){
	                         var a = 360/aApp.length*i;
	                          stratMove(aApp[i],a,w)
	                          i++
	                          if(i==aApp.length){
	                          	clearInterval(timer)
	                          }
	                         },30) 
	                        }
	                   }})
	                })(n)
	               n++;
	               if(n==aApp.length){
	               	clearInterval(timer)
	               }
	           },30)
           }else{

           	   var timer =setInterval(function (){
           	   	  (function (index){
	                   stratMove(aApp[n],0,w,function (){
	                       if(index==aApp.length-1){
                             timer=setInterval(function (){
                              $(aApp[index]).animate({left:aPosApp[index].left,top:aPosApp[index].top},{duration:1000,easing:'easeInOutBounce'})
                               index--
                               if(index==-1){
                               	clearInterval(timer);
                               }
                              },1000/60) 
                             
	                       }
	                   })
                   })(n)
                   n++;
                   if(n==aApp.length){
                   	clearInterval(timer);
                   }
           	   },1000/60)   	   	          
           }
     }

     function stratMove(obj,iTarget,w,fn){
		var start = obj.a || 0;
		var dis = iTarget - start;
		var time = 1300;
		var count = Math.round(time/30);
		var n = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			n++;
			
			var cur = start + dis/count*n;  //角度
			
			obj.a = cur;
			
			obj.style.left =(w||0)+ R + Math.sin(d2a(cur))*R + "px";
			obj.style.top  = R - Math.cos(d2a(cur))*R + "px";
			
			if(n == count){
				clearInterval(obj.timer);
				fn&&fn();
			}
			
		},30);
	}      
        function d2a(n){
			return n*Math.PI/180;	
		}  
	
		
        $(oList).animate({'opacity':1,'top':'10'},{duration:2000, easing:'easeInOutBounce'})
        for(var i=0;i<aNavBox.length;i++){
           aPos[i]={left:aNavBox[i].offsetLeft+oBoxParent.offsetLeft,top:aNavBox[i].offsetTop}
           aNavBox[i].style.left=aPos[i].left+'px';
           aNavBox[i].style.top=aPos[i].top+'px';
        }
          
        for(var i=0;i<aNavBox.length;i++){
           aNavBox[i].style.position='absolute'
           aNavBox[i].style.margin='0';  
           aNavBox[i].style.top='-200px';         
        }
            var n=0;
            var timer=setInterval(function (){           
            $(aNavBox[n]).animate({'top':'0'})
              n++;
            if(n==aNavBox.length){
            	clearInterval(timer);
             }
           },100)
		oList.onmouseout=function()
		{
			var i=aDiv.length-1;
			clearInterval(oTimer);
			oTimer=setInterval(function(){
				aDiv[i].className="";
				i--;
				if(i<0)
				{
					clearInterval(oTimer);
				}
			},50);	
		};
		oList.onmouseover=function()
		{
			var i=0;
			clearInterval(oTimer);
			oTimer=setInterval(function(){
				aDiv[i].className="open";
				i++;
				if(i==aDiv.length)
				{
					clearInterval(oTimer);
				}
			},100);
		};
	
		})()
	$.fn.fullpage({
		slidesColor: ['#000000', '#5c492b', '#6b0d0d', '#092a2d', '#4c0430'],
		anchors: ['page1', 'page2', 'page3', 'page4','page5'],
		css3:true,
		navigation: true,
    afterLoad:function(anchorLink, index){
       if(index==1){
       	(function (){
	       var oList=document.getElementById("list_head");
	       var n=0;
	       var oBoxParent=document.getElementById('nav_box');
		   var aNavBox=oBoxParent.children;
           
           var timer=setInterval(function (){           
            $(aNavBox[n]).animate({'top':'0'})
              n++;
            if(n==aNavBox.length){
            	clearInterval(timer);
             }
           },100) 
	       $(oList).animate({'opacity':1,'top':'10'},{duration:2000, easing:'easeInOutBounce'})
	      

	      
	    })()

         }else if(index==2){
			(function (){
			var oList=document.getElementById("list");
			var aLi=oList.children;
			var iZ=document.documentElement.clientWidth/2;
			var iNow=0;
			var aBtns=document.getElementById("btns").children;
			var oText=document.getElementById('banner_text');
			var aTextValue=oText.children;
           
			oList.style.WebkitTransformOrigin="center center "+iZ+"px";
			oList.style.MozTransformOrigin="center center "+iZ+"px";
			window.onresize=function()
			{
				iZ=document.documentElement.clientWidth/2;
				oList.style.WebkitTransformOrigin="center center "+iZ+"px";
				oList.style.MozTransformOrigin="center center "+iZ+"px";
			}
			 move(oList,{opacity:1})
			for(var i=0;i<aBtns.length;i++)
			{   aBtns[i].style.display='block'
		        move(aBtns[i],{opacity:1})
				aBtns[i].index=i;

				var oClientHeight=document.documentElement.clientHeight;
				aBtns[i].style.top=oClientHeight+'px';
				aBtns[i].onclick=function()
				{
					if(iNow==this.index)
					{
						return;
					}
					for(var i=0;i<aTextValue.length;i++){
						$(aTextValue[i]).animate({opacity:0})
					}
					aBtns[iNow].className="";
					tab(iNow,this.index);
					iNow=this.index;
					aBtns[iNow].className="active";
					$(aTextValue[iNow]).animate({opacity:1})
					
				};
			}
			function tab(iOld,iNow)
			{
				oList.style.transition=".5s";
				oList.addEventListener("webkitTransitionEnd",end,false);
				oList.addEventListener("mozTransitionEnd",end,false);
				
				if(iOld>iNow)
				{
					aLi[iNow].className="prev";
					oList.style.WebkitTransform="rotateY(-90deg)";
					oList.style.MozTransform="rotateY(-90deg)";
				}
				else
				{   

					aLi[iNow].className="next";
					oList.style.WebkitTransform="rotateY(90deg)";
					oList.style.MozTransform="rotateY(90deg)";

				}
				function end()
				{
					aLi[iOld].className="";
                    
					oList.style.transition="none";
					aLi[iNow].className="active";
					oList.style.WebkitTransform="rotateY(0deg)";
					oList.style.MozTransform="rotateY(0deg)";
				}
			   }
			 })()
			}else if(index==3){
              (function (){
	            var oUl=document.getElementById('content').getElementsByTagName('ul')[0];	            
	            var aBtn=document.getElementById('list_aBtn').getElementsByTagName('a');
	            var aPos=[]; 
	            oUl.innerHTML='';
	            var arr=['img_list/0.jpg','img_list/1.jpg','img_list/2.jpg','img_list/3.jpg','img_list/4.jpg','img_list/5.jpg']
	            var aTextArr=['手风琴','网易轮播','拖拽轮播','放大镜','无限滚动','瀑布流']

	            for(var i=0;i<6;i++){
                var oLi=document.createElement('li');                 
                     oUl.appendChild(oLi);  
	            }
	            var aLi= oUl.children;
	            for(var i=0;i<aLi.length;i++){
                   aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop}
                   aLi[i].style.left=aPos[i].left+'px';
                   aLi[i].style.top=aPos[i].top+'px';
                   aLi[i].style.WebkitTransform="scale(2)"; 
                   aLi[i].style.MozTransform="scale(2)"; 
	             }
	            for(var i=0;i<aLi.length;i++){
	             	aLi[i].style.position='absolute';
	             	aLi[i].style.margin='0';
	             	var oImg=new Image();
	             	oImg.src='img_list/'+i+'.jpg';
				    aLi[i].appendChild(oImg);
	             	aLi[i].index=i;
	             }	            
	             
	             var timer=null;
	             setTimeout(show,100);
	             function show()
				{  
		
					for(var i=0;i<aLi.length;i++)
					{   
					
						var oA=document.createElement('a');
						
						aLi[i].appendChild(oA); 
						oA.href="javascript:;"; 	          
						aLi[i].style.transition=".5s "+(aLi.length-i)*300+"ms";
						aLi[i].style.WebkitTransform="scale(1)";
						aLi[i].style.MozTransform="scale(1)";
						aLi[i].style.opacity=1;
						aLi[i].setAttribute('date',aTextArr[i]);						
						lago(aLi[i]);
					}
				}
	             var bClick=false;
                 var iIndex=0;
                 for(var i=0;i<aBtn.length;i++){
                 	aBtn[i].index=i;
                 	(function (iNow){
                 	aBtn[i].onclick=function (){

                       if(iIndex==this.index){
                       	console.log(iNow,this.index)
                       	  return;
                       }
                    var  This=this;
                    console.log(This.offsetLeft) 
                        
                    var n=0;

                    if(!bClick){
                      bClick=true;
                      iIndex=this.index;
                      timer=setInterval(function (){ 
                          (function(index){ 
                           aLi[n].style.transition="";
                           move(aLi[n],{opacity:0,left:This.offsetLeft-This.parentNode.offsetWidth,top:This.offsetTop-This.parentNode.offsetHeight,width:0,height:0},
                           	{complete:function (){
                               if(index==aLi.length-1){
                               	  if(bClick)
                               	  {
						            timer=setInterval(function (){
                                    (function (index){
                                    	
                                   if(iNow==1){
	                                   	for(var i=0;i<aLi.length;i++){
	                                   	  aLi[i].innerHTML='<img src=img_list/'+(i+1)+'.jpg />'+'<a href="javascript:;"'+aTextArr[i]+'</a>';
	                                   	    
	                                   	}

                                   } else {
                                    	for(var i=0;i<aLi.length;i++){
	                                   	  aLi[i].innerHTML='<img src=img_list/'+(i)+'.jpg />'+'<a href="javascript:;"'+aTextArr[i]+'</a>';
	                                   	}
                                   }	
                               	     move(aLi[index],{left:aPos[index].left,top:aPos[index].top,width:300,height:150,opacity:1},
                               	     	{complete:function (){
                                             if(index==0){
                                                bClick=false;
                                               
                                             }
                               	     	}})
                               	     })(index)
                               	     index--;
                               	     if(index==-1){
                               	     	clearInterval(timer);
                               	     }
                               	     },100)
						          }
                                  }
                              }})
                           })(n)
                           n++;
                           
                           if(n>=aLi.length){	                        
                           	clearInterval(timer)
                           	
                           }    
                      },100)
					 }
                   }
               })(i)
                 }

				function direction(obj,oEvent){
					
					var x = oEvent.clientX - obj.offsetLeft -obj.parentNode.offsetLeft- obj.offsetWidth/2;
					var y = obj.offsetHeight/2 + obj.offsetTop+obj.parentNode.offsetTop-oEvent.clientY;		
					var a = Math.atan2(y,x);
					return Math.round((a*180/Math.PI + 180)/90)%4;	
	            }
	
	function lago(oDiv){

		oDiv.onmouseover = function(ev){
						
			var oEvent = ev || event;
			var oSrc = oEvent.formElememnt || oEvent.relatedTarget;

			if(oDiv.contains(oSrc)){
				return;
			}
			
			var oSpan = this.children[1];
			oSpan.innerHTML=this.getAttribute('date');
			var n = direction(oDiv,oEvent);
			
			switch(n){
				case 0:// 0 左 
				oSpan.style.left = "-300px";
				oSpan.style.top = "0";
				break;
				case 1://  1下
				oSpan.style.left = "0";
				oSpan.style.top = "150px";
				break;
				case 2://  2 右 
				oSpan.style.left = "300px";
				oSpan.style.top = "0";
				break;
				case 3:// 3 上
				oSpan.style.left = "0";
				oSpan.style.top = "-150px";
				break;
			}
			
			move(oSpan,{left:0,top:0});
		};
		
		oDiv.onmouseout = function(ev){
			var oSpan = this.children[1];
            
			var oEvent = ev || event;
			var oTo = oEvent.toElement || oEvent.relatedTarget;			
			if(oDiv.contains(oTo)){
				return;
			}
			var n = direction(oDiv,oEvent);
			
			switch(n){
				case 0:
			     move(oSpan,{left:-300,top:0});
				break;
				case 1:
				 move(oSpan,{left:0,top:150});
				break;
				case 2:
				 move(oSpan,{left:300,top:0});
				break;
				case 3:
				  move(oSpan,{left:0,top:-150});
				break;
			}
		};	
	}

              })()
			}else if(index==4){
                 (function (){
                 	//message
		             var oMessDiv=document.getElementById('message');
		             var aUl=oMessDiv.children;
		             var aPosUl=[];
		             var aPosLi1=[];
		             var aPosLi2=[];

		             for(var i=0;i<aUl.length;i++){
		                aPosUl[i]={left:aUl[i].offsetLeft,top:aUl[i].offsetTop};
		                aUl[i].style.left=aPosUl[i].left+'px';
		                aUl[i].style.top=aPosUl[i].top+'px';
		                var aLi=aUl[i].children;
                     }
                    for(var i=0;i<aUl.length;i++){
		             	  aUl[i].style.position='absolute';
		             	  aUl[i].style.margin='0';
		             	  aUl[i].index=i;
		             
		             	  if(i>0){
		             	  	 aUl[i].style.left='100%';
		             	  }else {
                             aUl[i].style.left='-100%';
		             	  }
		             }
                     var aLi1=aUl[0].children;
		             var aLi2=aUl[1].children;
                    for(var i=0;i<aUl.length;i++){
                    	(function (index){
                    	$(aUl[i]).animate({left:aPosUl[i].left,top:aPosUl[i].top,opacity:1},{duration:1300,easing:'easeOutBack',complete:function(){
                             if(index==aUl.length-1){
                             	 var n=0;
				                    var timer=setInterval(function (){
				                        $(aLi1[n]).animate({opacity:1},{duration:300, easing:'linear'})
				                        $(aLi2[n]).animate({opacity:1},{duration:300, easing:'linear'})          
				                               n++;
				                               if(n==aLi1.length){
				                               	clearInterval(timer)
				                               }
				                    },100)
                             }
                    	}})
                    	})(i)
                    }
                 })()

			}else if(index==5){
				(function (){
				var oBox=document.getElementById("curriculum");
				var oClos=oBox.getElementsByTagName("a")[0];
				var oUlInfor=document.getElementById("information");
				var aLi=oUlInfor.children;
				oBox.style.opacity=1;
				var timer=null;
				var n=0;
				var aPos=[];
				for(var i=0;i<aLi.length;i++){
					aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
				     aLi[i].style.left=aPos[i].left+'px';
				     aLi[i].style.top=aPos[i].top+'px';   
				}
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.position='absolute';
					aLi[i].style.margin='0';
					aLi[i].index=i;
					aLi[i].style.top='400px'
				}
                
                	$(oBox).animate({height:'400px',top:'100px'},{complete:function(){
                          platText();

                	}})
				
			    function platText(){
				timer=setInterval(function (){
                  $(aLi[n]).animate({top:aPos[n].top,opacity:1},{duration:1500})
                  n++
         
                  if(n==aLi.length-1){
                     clearInterval(timer);
                  }

                },300)
                }
				oClos.onclick=function()
				{
					oBox.style.transition=".8s height,.6s top,0.4s opacity .2s";
					oBox.style.height="40px";
					oBox.style.top="320px";
					oBox.style.opacity=0;
				};
           })()
		  }

		} ,onLeave:function(index, direction){
				if(index==3){
				var oUl=document.getElementById('content').getElementsByTagName('ul')[0];	
				var aLi=oUl.children;

				function hide()
					{  
						for(var i=0;i<aLi.length;i++)
						{   					       
							aLi[i].style.transition=".5s "+(aLi.length-i)*300+"ms";
							aLi[i].style.WebkitTransform="scale(1.5)";
							aLi[i].style.opacity=0;
							
						}
					}	
				setTimeout(hide,300);				
				     	
				}else if(index==1){
					(function (){
               var oList=document.getElementById("list_head");
               var oBoxParent=document.getElementById('nav_box');
			   var aNavBox=oBoxParent.children;
               $(oList).animate({'opacity':0,'top':'-200'},{duration:500, easing:'easeInOutBounce'})
               $(aNavBox).css('top','-200px');     
                     })()
				}else if(index==2){
				    var oList=document.getElementById("list");
					var aBtns=document.getElementById("btns").children;
                   move(oList,{opacity:0})
                   for(var i=0;i<aBtns.length;i++){

                   	    aBtns[i].style.display='none';
		                move(aBtns[i],{opacity:0});								
                   }
				}else if(index==4){
					

					(function (){
				     var oMessDiv=document.getElementById('message');
		             var aUl=oMessDiv.children;

		             $(aUl).animate({opacity:0});
		               for(var i=0;i<aUl.length;i++){
                        var aLi=aUl[i].children;                
                        $(aLi).css('transition','10');       
                        $(aLi).stop().animate({opacity:0},{duration:100})
                       }
		             
					})()

				}else if(index==5){
					(function (){
                 var oBox=document.getElementById("curriculum");
                 var oUlInfor=document.getElementById("information");
				 var aLi=oUlInfor.children;
				 $(aLi).animate({opacity:0});
                    oBox.style.transition=".8s height,.6s top,0.4s opacity .2s";
                    oBox.style.MozTransition=".8s height,.6s top,0.4s opacity .2s";
					oBox.style.height="40px";
					oBox.style.top="320px";
					oBox.style.opacity=0;
})()
					
				}
			}
    });     
});	

	
 



