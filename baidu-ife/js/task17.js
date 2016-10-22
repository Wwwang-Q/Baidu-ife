/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
//console.log(aqiSourceData)
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() { 
    var time=pageState.nowGraTime;
    var city=pageState.nowSelectCity;
    var txt="";
    for(v in chartData){
    	txt+='<div class="box '+time+'" style="height:'+chartData[v]+'px;background:'+getRandomColor()+';" title="'+v+':'+chartData[v]+'"></div>';
    }
 
    document.getElementsByClassName('aqi-chart-wrap')[0].innerHTML=txt;
}
  /**
     * 获取随机颜色
     */
    function getRandomColor(){
        return '#' + (function(h){
            return new Array(7 - h.length).join("0") + h
        }
                )((Math.random() * 0x1000000 << 0).toString(16))
    }
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(time) {  
  // 确定是否选项发生了变化
  // 设置对应数据
  // 调用图表渲染函数
 
   if(time==pageState.nowGraTime){
   	 return; 	
   }
   else{
   	pageState.nowGraTime=time; 
   	initAqiChartData();
   	renderChart();
   }
  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  // 设置对应数据
  // 调用图表渲染函数

  	initAqiChartData();
   	renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {   
    var r=document.getElementById("form-gra-time");
    r.addEventListener('click',function(e){ 
    	if(e.target.name==="gra-time"){
    		graTimeChange(e.target.value); //在graTimeChange里面判断，是否切换
    	}
    })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
   var s="<option value='-1'>请选择城市</option>";
   var v=document.getElementById("city-select");
   for(city in aqiSourceData){
   	 s+="<option value='"+city+"'>"+city+"</option>";
   }
   v.innerHTML=s; 
   v.addEventListener('click',function(){
   	 if(v.value!=pageState.nowSelectCity){
   	 pageState.nowSelectCity=v.value;
   	 citySelectChange(pageState.nowSelectCity); //在这里判断是否切换，切换才调用
   } 
   })
  
   
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var time=pageState.nowGraTime;
  var city=pageState.nowSelectCity;
  switch (time){
  	case "day":
  	  chartData=aqiSourceData[city];
  		break;
  	case "week":
  	  var arr=aqiSourceData[city];    
  		 var total=0,date,i;
  		 var count=0,average=0,n=1; 
  		 chartData={};   	
  	 for(var week in arr){
  	 	date=new Date(week);  //getDay的对象是Date对象
  		 i=date.getDay();  //i从0-6
  		if(i==6){  
  			total+=arr[week];
  			count++;
  			average=Math.ceil(total/count);  			
  			chartData["week"+n]=average;
  			n++;
  			total=0;
  			count=0;
  		}
  		else{
  			total+=arr[week];
  			count++;
  		}  	
  	 }
  		average=total/count;
  		chartData["week"+n]=average;
  	//console.log(chartData);
  	break;
  	case "month":
  	  var arr=aqiSourceData[city];    
  		 var total=0,date,i;
  		 var count=0,average=0; 
  		 chartData={}; 
  		 for(month in arr){
  		 	var date=new Date(month);
  		 	var i=date.getMonth(); 
  		 	var j=date.getDate();
  		 	if(i+1==2)length=29;
  		 	else length=31;
  		 	if(j==length){
  		 		total+=arr[month];
  		 		count++;
  		 		average=Math.ceil(total/count);
  		 		chartData[i+1+"月："]=average;  		 		
  		 	}
  		 	else{
  		 		total+=arr[month];
  		 		count++;
  		 	}
  		 }
  		 average=Math.ceil(total/count);
  		 		chartData[i+1+"月："]=average;  
  	break;
  	default:
  		break;
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm(); 
  initCitySelector();
  initAqiChartData();
}

init();