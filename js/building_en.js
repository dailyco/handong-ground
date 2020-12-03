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

readFile("./../data/building_info.json", function (data) {
  var building_infos = JSON.parse(data);
  var building_info = building_infos["건물"]["EN"];
  var facility_info = building_infos["시설"]["EN"];

  var sidebar = document.getElementById("sidebar");
  var main = document.getElementById("main");
  for (var i = 0; i < building_info.length; i++) {
    // 건물 리스트 생성
    var list = document.createElement("li");
    var link = document.createElement("a");
    link.onclick = onClick;
    link.href = "#" + building_info[i]["Link"];
    link.textContent = building_info[i]["Name"];
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
    item_main.id = building_info[i]["Link"];
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
    header.textContent = building_info[i]["Name"];
    photo.alt = building_info[i]["Link"];
    photo.src = building_info[i]["Photo"];
    location.textContent = "Location";
    desc_loc.textContent = building_info[i][location.textContent];
    description.textContent = "Description";
    desc_desc.textContent = building_info[i][description.textContent];
    pair1.append(description);
    pair1.append(desc_desc);
    pair2.append(location);
    pair2.append(desc_loc);
    placeholder.append(photo);
    if (building_info[i]["Institutional Facilities"]) {
      var pair3 = document.createElement("div");
      var inst_fac = document.createElement("h4");
      var inst_fac_arr = building_info[i]["Institutional Facilities"];
      var inst_fac_desc = document.createElement("ul");

      inst_fac.textContent = "Institutional Facilities";
      inst_fac_desc.classList.add("chip-bar");
      pair3.classList.add("pair");
      for (var j = 0; j < inst_fac_arr.length; j++) {
        var inst_fac_list = document.createElement("li");
        inst_fac_list.classList.add("chip");
        inst_fac_list.textContent = inst_fac_arr[j];
        inst_fac_desc.append(inst_fac_list);
      }
      pair3.append(inst_fac);
      pair3.append(inst_fac_desc);
      placeholder.append(pair3);
    }
    placeholder.append(pair1);
    placeholder.append(pair2);
    if (building_info[i]["How to Rent"]) {
      var pair4 = document.createElement("div");
      var rent = (document = document.createElement("h4"));
      var rent_desc = document.createElement("p");

      rent.textContent = "How to Rent";
      pair4.classList.add("pair");
      rent_desc.classList.add("text-muted");
      rent_desc.textContent = building_info[i][rent.textContent];
      pair4.append(rent);
      pair4.append(rent_desc);
      placeholder.append(pair4);
    }
    placeholders.append(placeholder);
    item_main.append(header);
    item_main.append(placeholders);
    main.appendChild(item_main);
  }

  for (var i = 0; i < facility_info.length; i++) {
    // 시설 리스트 생성
    var list = document.createElement("li");
    var link = document.createElement("a");
    link.onclick = onClick;
    link.href = "#" + facility_info[i]["Link"];
    link.textContent = facility_info[i]["Name"];
    list.append(link);
    sidebar.appendChild(list);

    // main content 생성
    var item_main = document.createElement("div");
    var header = document.createElement("h1");
    var placeholders = document.createElement("div");
    var placeholder = document.createElement("div");
    var photo = document.createElement("img");
    var pair5 = document.createElement("div");
    var location = document.createElement("h4");
    var desc_loc = document.createElement("p");
    var pair6 = document.createElement("div");
    var description = document.createElement("h4");
    var desc_desc = document.createElement("p");
    item_main.classList.add("item-main");
    item_main.id = facility_info[i]["Link"];
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
    pair5.classList.add("pair");
    pair6.classList.add("pair");
    desc_loc.classList.add("text-muted");
    desc_desc.classList.add("text-muted");
    header.textContent = facility_info[i]["Name"];
    photo.alt = facility_info[i]["Link"];
    photo.src = facility_info[i]["Photo"];
    location.textContent = "Location";
    desc_loc.textContent = facility_info[i][location.textContent];
    description.textContent = "Description";
    desc_desc.textContent = facility_info[i][description.textContent];
    pair5.append(description);
    pair5.append(desc_desc);
    pair6.append(location);
    pair6.append(desc_loc);
    placeholder.append(photo);
    if (facility_info[i]["Institutional Facilities"]) {
      var pair7 = document.createElement("div");
      var inst_fac = document.createElement("h4");
      var inst_fac_arr = facility_info[i]["Institutional Facilities"];
      var inst_fac_desc = document.createElement("ul");

      inst_fac.textContent = "Institutional Facilities";
      inst_fac_desc.classList.add("chip-bar");
      pair7.classList.add("pair");
      for (var j = 0; j < inst_fac_arr.length; j++) {
        var inst_fac_list = document.createElement("li");
        inst_fac_list.classList.add("chip");
        inst_fac_list.textContent = inst_fac_arr[j];
        inst_fac_desc.append(inst_fac_list);
      }
      pair7.append(inst_fac);
      pair7.append(inst_fac_desc);
      placeholder.append(pair7);
    }
    placeholder.append(pair5);
    placeholder.append(pair6);
    if (facility_info[i]["How to Rent"]) {
      var pair8 = document.createElement("div");
      var rent = (document = document.createElement("h4"));
      var rent_desc = document.createElement("p");

      rent.textContent = "How to Rent";
      pair8.classList.add("pair");
      rent_desc.classList.add("text-muted");
      rent_desc.textContent = facility_info[i][rent.textContent];
      pair8.append(rent);
      pair8.append(rent_desc);
      placeholder.append(pair8);
    }
    placeholders.append(placeholder);
    item_main.append(header);
    item_main.append(placeholders);
    main.appendChild(item_main);
  }
});
