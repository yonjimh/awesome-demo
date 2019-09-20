// var editorTool, map = new AMap.Map("container", {
//   resizeEnable: true,
//   center: [113.525165, 22.801624], //地图中心点
//   zoom: 13 //地图显示的缩放级别
// });
var map = null
var beginNum = 0;
var clickListener;
var beginPoints;
var beginMarks;
var polygonEditor; // 多边形编辑对象
var rectangleEditor; // 矩形编辑对象
var resPolygon = [];
var resNum = 0;
var Polygon = []
var Rectangle = [] // 矩形
// init();
// 113.525165,22.801624
/**
 * 创建地图
 */
function createMap() {
  // 创建地图
  map = new AMap.Map("container", {
    resizeEnable: true,
    center: [113.525165, 22.801624], //地图中心点
    zoom: 13 //地图显示的缩放级别
  });
}

function init() {
  if (!map) createMap()
  beginPoints = [];
  beginMarks = [];
  beginNum = 0;
  polygonEditor = '';
  clickListener = AMap.event.addListener(map, "click", mapOnClick);

  // 这里转换数据的 好像没什么用
  var str =
    '[{"J":39.91789947393269,"G":116.36744477221691,"lng":116.367445,"lat":39.917899},{"J":39.91184292800211,"G":116.40658356616223,"lng":116.406584,"lat":39.911843},{"J":39.88616249265181,"G":116.37963272998047,"lng":116.379633,"lat":39.886162}]';
  var arr = json2arr(str);
  console.log(JSON.stringify(arr));
  // console.log(JSON.stringify(map));

  // createPolygon(arr);
}

function mapOnClick(e) {

  beginNum++;
  if (beginNum > 6) {
    log.info('超出可指定点的数量！')
    return
  }

  // document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
  beginMarks.push(addMarker(e.lnglat));
  beginPoints.push(e.lnglat);
  console.log(JSON.stringify(beginPoints));
  
  console.log(beginMarks, 'beginMarks 存储点对象'); // 存储点对象

  console.log(beginPoints, 'beginPoints'); // LngLat点的值 LngLat对象

  if (polygonEditor) closeEditPolygon()
  if (rectangleEditor) closeEditRectangle()

  if (beginNum == 2) {
    Rectangle = createRectangle(beginPoints);
    rectangleEditor = createRectangleEditor(Rectangle)
    if (typeof fenceMessage != 'undefined') rectangleTouchend() // 编辑的时候获得初始化的点

    clearMarks();
  }

  // beginNum++;
  if (beginNum >= 3) {
    // log.info(beginNum)

    map.remove(Rectangle);
    clearMarks();
    if (beginNum > 3) {
      // 现在的写的这里的if走不通 现在可以走了
      //清除前一次的多边形
      map.remove(Polygon);
    }
    // AMap.event.removeListener(clickListener);  
    Polygon = createPolygon(beginPoints);
    if (typeof fenceMessage != 'undefined') polygonTouchend() // 编辑的时候获得初始化的点

    // polygonEditor = createEditor(Polygon);
    // clearMarks();
  }

};

// 多边形
function polygonDragging(e) {
  // console.log(e);
  // 获取节点坐标

}

// 多边形
function polygonTouchend(e) {
  console.log(Polygon.getPath());
  // beginMarks.push(addMarker(e.lnglat));
  fenceMessage.mapJson = []
  fenceMessage.mapJson = Polygon.getPath()
  beginPoints = Polygon.getPath();
}

// 矩形事件函数
function rectangleTouchend(e) {
  console.log(Rectangle.getPath());
  console.log(e);

  // -----
  // var southPoint = {
  //   lng: fenceMessage.mapJson[0].lng,
  //   lat: fenceMessage.mapJson[0].lat
  // };
  // var northPoint = {
  //   lng: fenceMessage.mapJson[1].lng,
  //   lat: fenceMessage.mapJson[1].lat
  // };
  // southPoint.lat = e.bounds.southwest.lat;
  // southPoint.lng = e.bounds.southwest.lng;
  // northPoint.lat = e.bounds.northeast.lat;
  // northPoint.lng = e.bounds.northeast.lng;
  fenceMessage.mapJson = []
  fenceMessage.mapJson.push(Rectangle.getBounds().southwest);
  fenceMessage.mapJson.push(Rectangle.getBounds().northeast);
  // -----
  // getPath获取节点的 ，文档没有写但是可以的！！！
  // beginPoints = Rectangle.getPath();
  beginPoints = [Rectangle.getBounds().southwest, Rectangle.getBounds().northeast]
  console.log(JSON.stringify(Rectangle.getBounds()));
  
  console.log(JSON.stringify(beginPoints));
  console.log('rectangleTouchend');
  
  console.log(Rectangle.getBounds(), 111)
}

// 创建矩形对象覆盖物
function createRectangle(arr) {
  var southWest = new AMap.LngLat(116.356449, 39.859008)
  var northEast = new AMap.LngLat(116.417901, 39.893797)
  console.log(arr[0], arr[1]);

  var bounds = new AMap.Bounds(arr[0], arr[1])

  // var rectangle = new AMap.Rectangle({
  //   bounds: bounds,
  //   strokeColor: 'red',
  //   strokeWeight: 6,
  //   strokeOpacity: 0.5,
  //   strokeDasharray: [30, 10],
  //   // strokeStyle还支持 solid
  //   strokeStyle: 'dashed',
  //   fillColor: 'blue',
  //   fillOpacity: 0.5,
  //   cursor: 'pointer',
  //   zIndex: 50,
  // })

  console.log(arr);
  // console.log(new AMap.LngLat(arr[0].lng, arr[0].lat));

  // AMap.Bounds(southWest: LngLat, northEast: LngLat)
  var rectangle = new AMap.Rectangle({
    map: map,
    bounds: bounds,
    // strokeColor: "#0000ff",
    // strokeOpacity: 1,
    // strokeWeight: 3,
    fillColor: "#f5deb3",
    fillOpacity: 0.35,
    strokeColor: 'red',
    strokeWeight: 6,
    strokeOpacity: 0.5,
    strokeDasharray: [30, 10],
    // strokeStyle还支持 solid
    strokeStyle: 'dashed',
    // fillColor: 'transparent',
    // fillOpacity: 0.5,
    cursor: 'pointer',
    zIndex: 50,
    draggable: true
  });
  // rectangle.setMap(map)
  // 缩放地图到合适的视野级别
  // map.setFitView([rectangle])
  console.log(rectangle);
  // rectangle.setMap(map)
  // rectangle.on('dragging', dragging)
  // if (typeof fenceMessage != 'undefined') rectangleTouchend() // 编辑的时候获得初始化的点
  rectangle.on('touchend', rectangleTouchend)
  return rectangle;
}

// 创建多边形覆盖物
function createPolygon(arr) {
  var polygon = new AMap.Polygon({
    map: map,
    path: arr,
    // strokeColor: "#0000ff",
    // strokeOpacity: 1,
    // strokeWeight: 3,
    fillColor: "#f5deb3",
    fillOpacity: 0.35,
    strokeColor: 'red',
    strokeWeight: 6,
    strokeOpacity: 0.5,
    strokeDasharray: [30, 10],
    // strokeStyle还支持 solid
    strokeStyle: 'dashed',
    // fillColor: 'transparent',
    fillOpacity: 0.5,
    cursor: 'pointer',
    zIndex: 50,
    draggable: true
  });
  // if (typeof fenceMessage != 'undefined') polygonTouchend() // 编辑的时候获得初始化的点
  polygon.on('dragging', polygonDragging)
  polygon.on('touchend', polygonTouchend)

  return polygon;
}

// 创建AMap.Polyline、AMap.Polygon编辑对象
function createEditor(polygon) {
  var polygonEditor = new AMap.PolyEditor(map, polygon);
  polygonEditor.open();
  polygonEditor.on('adjust', polygonTouchend)
  polygonEditor.on('removenode', polygonTouchend)
  polygonEditor.on('addnode', polygonTouchend)

  // AMap.event.addListener(polygonEditor, 'end', polygonEnd);
  return polygonEditor;
}

// 创建AMap.rectangle编辑对象
function createRectangleEditor(rectangle) {
  var rectangleEditor = new AMap.RectangleEditor(map, rectangle)
  rectangleEditor.open()
  rectangleEditor.on('adjust', rectangleTouchend)

  return rectangleEditor;
}

// 关闭Polygon编辑功能
function closeEditPolygon() {
  polygonEditor.close();
}
// 关闭Polygon编辑功能
function closeEditRectangle() {
  rectangleEditor.close();
}

// 时间
function polygonEnd(res) {
  resPolygon.push(res.target);
  alert(resPolygon[resNum].contains([116.386328, 39.913818]));
  appendHideHtml(resNum, res.target.getPath());

  resNum++;
  init();
}

function appendHideHtml(index, arr) {
  var strify = JSON.stringify(arr);
  var html = '<input type="hidden" id="index' + index + '" name="paths[]" value="' + strify + '">';
  $('body').append(html);
  console.log(html);
}


/**
 * 清除标记点
 */
function clearMarks() {
  map.remove(beginMarks);
}

// 处理函数
function json2arr(json) {
  var arr = JSON.parse(json);
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    var line = [];
    line.push(arr[i].lng);
    line.push(arr[i].lat);
    res.push(line);
  };
  return res;
}


// 实例化点标记
function addMarker(lnglat) {
  console.log(lnglat, '添加点的坐标');

  var marker = new AMap.Marker({
    icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    position: lnglat
  });
  marker.setMap(map);
  return marker;
}

/**
 * 清除地图上的覆盖物
 */
function clearMap() {
  beginNum = 0;
  clickListener = null;
  beginPoints = [];
  beginMarks = [];
  polygonEditor = null; // 编辑对象
  resPolygon = [];
  resNum = 0;
  Polygon = null
  Rectangle = null // 矩形
  map.clearMap()
}

/**
 * 创建LngLat对象
 * @param {*} arr 
 */
function createLngLats(arr) {
  var points = []
  for (var index = 0; index < arr.length; index++) {
    points.push(new AMap.LngLat(arr[index].lng, arr[index].lat))
  }
  return points
}


/**
 * getUrlParam
 * @param {*} name 
 */
function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
  var r = window
    .decodeURI(window.location.search)
    .substr(1)
    .match(reg); // 匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; // 返回参数值
}