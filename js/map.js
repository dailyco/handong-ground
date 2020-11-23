var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.10311570534553, 129.38840428465357), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
var positions = [
  {
    content: "<div>학생회관</div>",
    latlng: new kakao.maps.LatLng(36.10230001553607, 129.3892951920244),
  },
  {
    content: "<div>히딩크 드림필드</div>",
    latlng: new kakao.maps.LatLng(36.102306173903806, 129.3876412047641),
  },
  {
    content: "<div>한동국제학교</div>",
    latlng: new kakao.maps.LatLng(36.104295301428294, 129.38601008368497),
  },
  {
    content: "<div>오석관</div>",
    latlng: new kakao.maps.LatLng(36.10279268344524, 129.38699332953976),
  },
  {
    content: "<div>느헤미야홀</div>",
    latlng: new kakao.maps.LatLng(36.10374721869036, 129.38748876349763),
  },
  {
    content: "<div>언어교육원</div>",
    latlng: new kakao.maps.LatLng(36.1047279265436, 129.38948171252625),
  },
  {
    content: "<div>효암채플</div>",
    latlng: new kakao.maps.LatLng(36.1044808425526, 129.39051385085241),
  },
  {
    content: "<div>농구장</div>",
    latlng: new kakao.maps.LatLng(36.10279268343672, 129.38949336560768),
  },
  {
    content: "<div>GS25 편의점</div>",
    latlng: new kakao.maps.LatLng(36.10202872543681, 129.38995302523406),
  },
  {
    content: "<div>세탁소</div>",
    latlng: new kakao.maps.LatLng(36.103402507115916, 129.39123175346384),
  },
  {
    content: "<div>우체국</div>",
    latlng: new kakao.maps.LatLng(36.104025523765735, 129.38846442595624),
  },
  {
    content: "<div>알파문구</div>",
    latlng: new kakao.maps.LatLng(36.10215516384245, 129.39008766032907),
  },
  {
    content: "<div>UN 반기문센터</div>",
    latlng: new kakao.maps.LatLng(36.102427, 129.38209),
  },
  {
    content: "<div>갈대상자관</div>",
    latlng: new kakao.maps.LatLng(36.102893, 129.383625),
  },
  {
    content: "<div>이디야커피숍</div>",
    latlng: new kakao.maps.LatLng(36.10215295463942, 129.39044727818617),
  },
  {
    content: "<div>에벤에셀</div>",
    latlng: new kakao.maps.LatLng(36.1032114487141, 129.39183333830093),
  },
  {
    content: "<div>현동홀</div>",
    latlng: new kakao.maps.LatLng(36.1040366561183, 129.3888226241534),
  },
  {
    content: "<div>창업보육센터</div>",
    latlng: new kakao.maps.LatLng(36.10339958059779, 129.38573181085266),
  },
  {
    content: "<div>비전관</div>",
    latlng: new kakao.maps.LatLng(36.10288173053251, 129.39157853906917),
  },
  {
    content: "<div>창조관</div>",
    latlng: new kakao.maps.LatLng(36.10256574433517, 129.3914582035391),
  },
  {
    content: "<div>로뎀관</div>",
    latlng: new kakao.maps.LatLng(36.10199048414889, 129.39121753247898),
  },
  {
    content: "<div>벧엘관</div>",
    latlng: new kakao.maps.LatLng(36.10226596138338, 129.39134789596986),
  },
  {
    content: "<div>은혜관</div>",
    latlng: new kakao.maps.LatLng(36.10149708630192, 129.39068660639225),
  },
  {
    content: "<div>제1행복관</div>",
    latlng: new kakao.maps.LatLng(36.10174077710473, 129.39007381652493),
  },
  {
    content: "<div>국제관</div>",
    latlng: new kakao.maps.LatLng(36.101671151238186, 129.3913520578888),
  },
  {
    content: "<div>뉴턴홀</div>",
    latlng: new kakao.maps.LatLng(36.103285348245755, 129.38706955014868),
  },
  {
    content: "<div>올네이션스홀</div>",
    latlng: new kakao.maps.LatLng(36.10316218233525, 129.386284477877),
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
