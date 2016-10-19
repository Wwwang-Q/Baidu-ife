/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData ={};
var aqilist=[];
var cityInput=document.getElementById('aqi-city-input');
var airInput=document.getElementById("aqi-value-input");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
var city=cityInput.value.trim();
var air=airInput.value.trim();
aqiData[city]=air;
console.log(aqiData);
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById("aqi-table"); 
    	var tt="";
        tt+="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";        
    for(city in aqiData){
    	tt+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button>"
    }
    table.innerHTML=tt;
//  var node=document.createElement("tr");
//  var data=aqiData.pop();
//  node.innerHTML="<td>"+data[0]+"</td><td>"+data[1]+"</td><td><button class='delete'>删除</button>";
//  table.appendChild(node);
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
var add=document.getElementById('add-btn');
add.addEventListener("click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("aqi-table").addEventListener("click",function(event){
  if(event.target.nodeName.toLowerCase()==="button") 
  console.log(event.target);
  console.log(event.target.dataset);
  delBtnHandle.call(null,event.target.dataset.city);
  })

}


init();

