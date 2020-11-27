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

readFile("./../data/attraction_info.json", function (data) {
  var attraction_info = JSON.parse(data);
  var attraction_info = attraction_info["장소"]["KR"];

  var sidebar = document.getElementById("sidebar");
  for (var i = 0; i < attraction_info.length; i++) {
    // 장소 리스트 생성
    var list = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = attraction_info[i]["이름"];
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
});
