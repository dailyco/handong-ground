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

readFile("./../data/building_info.json", function (data) {
  var building_infos = JSON.parse(data);
  var building_info = building_infos["건물"];
  var facility_info = building_infos["시설"];

  var sidebar = document.getElementById("sidebar");
  for (var i = 0; i < building_info.length; i++) {
    // 건물 리스트 생성
    var list = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = building_info[i]["이름"];
    if (i == 0) {
      var semantic_text = document.createElement("span");
      semantic_text.classList.add("sr-only");
      semantic_text.textContent = "(current)";

      list.classList.add("active");
      link.append(semantic_text);
    }
    list.append(link);
    sidebar.appendChild(list);
  }

  for (var i = 0; i < building_info.length; i++) {
    // 시설 리스트 생성
    var list = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = facility_info[i]["이름"];
    list.append(link);
    sidebar.appendChild(list);
  }
});
