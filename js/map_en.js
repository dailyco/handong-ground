var markers = {};
var mapContainer = document.getElementById("map"); // 지도를 표시할 div
var mapOption = {
  center: new kakao.maps.LatLng(36.103091, 129.388415), // 지도의 중심좌표
  level: 3, // 지도의 확대 레벨
};
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 마우스 드래그와 모바일 터치를 이용한 지도 이동을 막는다
// map.setDraggable(false);
// 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막는다
// map.setZoomable(false);

function onClick(e) {
  var m = markers["active"];
  if (m) m.marker.setMap(null);

  var id = e.target.href.split("#")[1];
  markers[id].marker.setMap(map);
  markers["active"] = markers[id];
  map.setCenter(markers[id].position);
  map.setLevel(2);
}

// JSON 파일을 읽어오는 함수
function readFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

readFile("./../data/campus_map.json", function (data) {
  var map_info = JSON.parse(data);
  map_info = map_info["캠퍼스 맵"]["EN"];

  var sidebar = document.getElementById("sidebar");
  for (var i = 0; i < map_info.length; i++) {
    // 캠퍼스 맵 리스트 생성
    var list = document.createElement("li");
    var link = document.createElement("a");
    link.onclick = onClick;
    link.href = "#" + map_info[i]["Link"];
    link.textContent = map_info[i]["Name"];
    list.append(link);
    sidebar.appendChild(list);

    var position = new kakao.maps.LatLng(
      map_info[i]["Position"][0],
      map_info[i]["Position"][1]
    );

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: position,
    });

    // 마커에 표시할 인포윈도우를 생성합니다
    var label = document.createElement("div");
    label.classList.add("item-info");
    label.textContent = map_info[i]["Name"];

    var infowindow = new kakao.maps.InfoWindow({
      content: label, // 인포윈도우에 표시할 내용
    });
    infowindow.a.classList.add("outer-item");

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(
      marker,
      "mouseover",
      makeOverListener(map, marker, infowindow)
    );
    kakao.maps.event.addListener(
      marker,
      "mouseout",
      makeOutListener(infowindow)
    );

    markers[map_info[i]["Link"]] = {
      marker: marker,
      position: position,
      infowindow: infowindow,
    };
  }
});
