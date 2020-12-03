function onClick(e) {
  var item = document.querySelector(".active");
  if (item) {
    item.classList.remove("active");
    item.style.display = "none";
  }

  var id = e.target.href.split("#")[1];
  var target = document.getElementById(id);
  target.classList.add("active");
  target.style.display = "block";
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

readFile("./../data/attraction_info.json", function (data) {
  var attraction_info = JSON.parse(data);
  var attraction_info = attraction_info["장소"]["EN"];

  var sidebar = document.getElementById("sidebar");
  var main = document.getElementById("main");
  for (var i = 0; i < attraction_info.length; i++) {
    // 장소 리스트 생성
    var list = document.createElement("li");
    var link = document.createElement("a");
    link.onclick = onClick;
    link.href = "#" + attraction_info[i]["Link"];
    link.textContent = attraction_info[i]["Name"];
    list.append(link);
    sidebar.appendChild(list);

    // main content 생성
    var item_main = document.createElement("div");
    var header = document.createElement("h1");
    var placeholders = document.createElement("div");
    var placeholder = document.createElement("div");
    var photo = document.createElement("img");
    var pair1 = document.createElement("div");
    var location = document.createElement("h4");
    var desc_loc = document.createElement("p");
    var pair2 = document.createElement("div");
    var description = document.createElement("h4");
    var desc_desc = document.createElement("p");
    item_main.classList.add("item-main");
    item_main.id = attraction_info[i]["Link"];
    item_main.style.display = "none";
    header.classList.add("page-header");
    placeholders.classList.add("row");
    placeholders.classList.add("placeholders");
    placeholder.classList.add("col-xs-12");
    placeholder.classList.add("col-sm-9");
    placeholder.classList.add("col-md-7");
    placeholder.classList.add("placeholder");
    photo.classList.add("img-responsive");
    photo.classList.add("photo");
    pair1.classList.add("pair");
    pair2.classList.add("pair");
    desc_loc.classList.add("text-muted");
    desc_desc.classList.add("text-muted");
    header.textContent = attraction_info[i]["Name"];
    photo.alt = attraction_info[i]["Link"];
    photo.src = attraction_info[i]["Photo"];
    location.textContent = "Location";
    desc_loc.textContent = attraction_info[i][location.textContent];
    description.textContent = "Description";
    desc_desc.textContent = attraction_info[i][description.textContent];
    pair1.append(description);
    pair1.append(desc_desc);
    pair2.append(location);
    pair2.append(desc_loc);
    placeholder.append(photo);
    placeholder.append(pair1);
    placeholder.append(pair2);
    placeholders.append(placeholder);
    item_main.append(header);
    item_main.append(placeholders);
    main.appendChild(item_main);
  }
});
