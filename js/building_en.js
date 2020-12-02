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
    // if (i == 0) {
    //   var semantic_text = document.createElement("span");
    //   semantic_text.classList.add("sr-only");
    //   semantic_text.textContent = "(current)";

    //   list.classList.add("active");
    //   link.append(semantic_text);
    // }
    list.append(link);
    sidebar.appendChild(list);

    // main content 생성
    var item_main = document.createElement("div");
    var header = document.createElement("h1");
    var placeholders = document.createElement("div");
    var placeholder = document.createElement("div");
    var photo = document.createElement("img");
    var location = document.createElement("h4");
    var desc_loc = document.createElement("p");
    var description = document.createElement("h4");
    var desc_desc = document.createElement("p");
    item_main.classList.add("item-main");
    item_main.id = building_info[i]["Link"];
    item_main.style.display = "none";
    header.classList.add("page-header");
    placeholders.classList.add("row");
    placeholders.classList.add("placeholders");
    placeholder.classList.add("col-xs-6");
    placeholder.classList.add("col-sm-6");
    placeholder.classList.add("placeholder");
    photo.classList.add("img-responsive");
    desc_loc.classList.add("text-muted");
    desc_desc.classList.add("text-muted");
    header.textContent = building_info[i]["Name"];
    photo.alt = building_info[i]["Link"];
    photo.src = building_info[i]["Photo"];
    photo.width = 200;
    // photo.dataholderrendered = true;
    location.textContent = "Location";
    desc_loc.textContent = building_info[i][location.textContent];
    description.textContent = "Description";
    desc_desc.textContent = building_info[i][description.textContent];
    placeholder.append(photo);
    placeholder.append(description);
    placeholder.append(desc_desc);
    placeholder.append(location);
    placeholder.append(desc_loc);
    if (building_info[i]["Institutional Facilities"]) {
      var inst_fac = document.createElement("h4");
      var inst_fac_arr = building_info[i]["Institutional Facilities"];
      var inst_fac_desc = document.createElement("ul");

      inst_fac.textContent = "Institutional Facilities";
      for (var j = 0; j < inst_fac_arr.length; j++) {
        var inst_fac_list = document.createElement("li");
        inst_fac_list.textContent = inst_fac_arr[j];
        inst_fac_desc.append(inst_fac_list);
      }
      placeholder.append(inst_fac);
      placeholder.append(inst_fac_desc);
    }

    if (building_info[i]["How to Rent"]) {
      var rent = (document = document.createElement("h4"));
      var rent_desc = document.createElement("p");

      rent.textContent = "How to Rent";
      rent_desc.textContent = building_info[i][rent.textContent];
      placeholder.append(rent);
      placeholder.append(rent_desc);
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
    var location = document.createElement("h4");
    var desc_loc = document.createElement("p");
    var description = document.createElement("h4");
    var desc_desc = document.createElement("p");
    item_main.classList.add("item-main");
    item_main.id = facility_info[i]["Link"];
    item_main.style.display = "none";
    header.classList.add("page-header");
    placeholders.classList.add("row");
    placeholders.classList.add("placeholders");
    placeholder.classList.add("col-xs-6");
    placeholder.classList.add("col-sm-6");
    placeholder.classList.add("placeholder");
    photo.classList.add("img-responsive");
    desc_loc.classList.add("text-muted");
    desc_desc.classList.add("text-muted");
    header.textContent = facility_info[i]["Name"];
    photo.alt = facility_info[i]["Link"];
    photo.src = facility_info[i]["Photo"];
    photo.width = 200;
    // photo.dataholderrendered = true;
    location.textContent = "Location";
    desc_loc.textContent = facility_info[i][location.textContent];
    description.textContent = "Description";
    desc_desc.textContent = facility_info[i][description.textContent];
    placeholder.append(photo);
    placeholder.append(description);
    placeholder.append(desc_desc);
    placeholder.append(location);
    placeholder.append(desc_loc);
    if (building_info[i]["Institutional Facilities"]) {
      var inst_fac = document.createElement("h4");
      var inst_fac_arr = building_info[i]["Institutional Facilities"];
      var inst_fac_desc = document.createElement("ul");

      inst_fac.textContent = "Institutional Facilities";
      for (var j = 0; j < inst_fac_arr.length; j++) {
        var inst_fac_list = document.createElement("li");
        inst_fac_list.textContent = inst_fac_arr[j];
        inst_fac_desc.append(inst_fac_list);
      }
      placeholder.append(inst_fac);
      placeholder.append(inst_fac_desc);
    }

    if (building_info[i]["How to Rent"]) {
      var rent = (document = document.createElement("h4"));
      var rent_desc = document.createElement("p");

      rent.textContent = "How to Rent";
      rent_desc.textContent = building_info[i][rent.textContent];
      placeholder.append(rent);
      placeholder.append(rent_desc);
    }
    placeholders.append(placeholder);
    item_main.append(header);
    item_main.append(placeholders);
    main.appendChild(item_main);
  }
});
