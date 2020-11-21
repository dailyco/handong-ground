var mapContainer = document.getElementById("map"); // 지도를 표시할 div
var mapOption = {
  center: new kakao.maps.LatLng(36.10311570534553, 129.38840428465357), // 지도의 중심좌표
  level: 3, // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var positions = [
  // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
  {
    content: "<div>학생회관</div>",
    latlng: new kakao.maps.LatLng(36.10234, 129.38923),
  },
  {
    content: "<div>히딩크 드림필드</div>",
    latlng: new kakao.maps.LatLng(36.102362, 129.387525),
  },
  {
    content: "<div>한동국제학교</div>",
    latlng: new kakao.maps.LatLng(36.104215, 129.385886),
  },
  {
    content: "<div>오석관</div>",
    latlng: new kakao.maps.LatLng(36.102871, 129.386937),
  },
  {
    content: "<div>한동국제학교</div>",
    latlng: new kakao.maps.LatLng(36.104215, 129.385886),
  },
  {
    content: "<div>뉴턴홀</div>",
    latlng: new kakao.maps.LatLng(36.103305, 129.387027),
  },
  {
    content: "<div>올네이션스홀</div>",
    latlng: new kakao.maps.LatLng(36.103038, 129.386258),
  },
  {
    content: "<div>느헤미야홀</div>",
    latlng: new kakao.maps.LatLng(36.103801, 129.387149),
  },
  {
    content: "<div>현동홀</div>",
    latlng: new kakao.maps.LatLng(36.104079, 129.388582),
  },
  {
    content: "<div>언어교육원</div>",
    latlng: new kakao.maps.LatLng(36.104703, 129.389498),
  },
  {
    content: "<div>효암채플</div>",
    latlng: new kakao.maps.LatLng(36.104662, 129.389808),
  },
  {
    content: "<div>에벤에셀</div>",
    latlng: new kakao.maps.LatLng(36.103198, 129.391771),
  },
];

for (var i = 0; i < positions.length; i++) {
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[i].latlng, // 마커의 위치
  });

  // 마커에 표시할 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: positions[i].content, // 인포윈도우에 표시할 내용
  });

  // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
  // 이벤트 리스너로는 클로저를 만들어 등록합니다
  // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
  kakao.maps.event.addListener(
    marker,
    "mouseover",
    makeOverListener(map, marker, infowindow)
  );
  kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
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

/* 아래와 같이도 할 수 있습니다 */
/*
for (var i = 0; i < positions.length; i ++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content // 인포윈도우에 표시할 내용
    });

    // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    (function(marker, infowindow) {
        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
        kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, marker);
        });

        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
        kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });
    })(marker, infowindow);
}
*/
