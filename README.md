# 과제 제출 및 QR 체크 경로

- 1주차 : https://swtrack.elice.io/courses/80743/lectures/650218
  - 과제 제출 (11/13(월), 11/15(수), 11/17(금))
- 2주차 : https://swtrack.elice.io/courses/80743/lectures/650219
  - 과제 제출 (11/20(월), 11/22(수), 11/24(금))
- 3주차 : https://swtrack.elice.io/courses/80743/lectures/650220
  - 과제 제출 (11/27(월), 11/29(수), 12/01(금))

---

# 스크럼

- 월, 수, 금 오전 10시

---

# 오피스아워 및 회의실

- 프론트 오피스아워 오후 7시
- 11/15(수), 11/17(금), 11/21(화), 11/24(금), 11/28(화), 11/30(목)
- 합동 오피스아워
- 11/13(월), 11/22(수), 12/01(금)
- 회의실 경로 : https://swtrack.elice.io/courses/80742/lecturerooms

---

# 코드리뷰

- 11/18(토), 11/25(토), 12/02(토)

---

# 최종발표

- 12/02(토)

---

# 피그마 경로

- https://www.figma.com/file/6mYR6Mv9JCdoRHtHyPQWfp/%5B5%ED%8C%80%5D-%EC%97%98%EB%A6%AC%EC%8A%A4-2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?type=design&node-id=0-1&mode=design&t=k8q3niXwV8exlcZr-0

---

# 설치된 패키지 사용방법 밎 주의사항

- axios :

  - 백앤드 통신용 패키지입니다.
  - 구현은 /src/Network 안에 Connect.js 입니다.
  - 대중화된 라이브러리라서 쉽고 다른데가도 많이 씁니다.
  - https://github.com/sheaivey/react-axios

- react-cookie:

  - 리액트에서 hook 를 사용해서 쿠키를 다루기위해서 사용합니다.
  - https://github.com/bendotcodes/cookies/tree/main/packages/react-cookie

- react-router-dom :

  - 리액트에서 페이지 전환을 할때 사용하는 패키지 입니다.
  - v5 와 v6 가 혼재되어 있으니 꼭 v6 메뉴얼을 공식홈페이지에서 보시고 사용해주시기 바랍니다.
  - https://github.com/remix-run/react-router#readme

- react-icons:

  - 리액트에서 여러가지 타입의 아이콘이 모여져있는 패키지 입니다.
  - 각종 아이콘 찾으러 다닐필요없이 아래의 사이트에서 검색후 적용해주시면 됩니다.
  - https://react-icons.github.io/react-icons/

- recoil:

  - redux대신에 전역 스테이트 관리를 위해서 사용하는패키지 입니다.
  - react 팀에서 만든 전역 스테이트 관리용 패키지로 차후 redux 를 대신할 수도 있지만 아직은 신생 패키지 라서 react 랑 좀 애매하게 엮이는데 장기적으로는 알아둘 필요가 있습니다.
  - https://recoiljs.org/ko/

- tailwindcss:
  - css 처리를 쉽게하기 위한 css 프레임워크입니다.
  - 리액트 랜더링 문제에 따라 잘 적용이 안될 경우도 있지만
  - css 를만들어서 작업하는거보다 이걸 쓰는게 훨씬 편합니다.
  - https://tailwindcss.com/docs/installation

---

# 폴더 설명

- /src

* /Admin:
  - 관리자 페이지 컴포넌트가 들어있습니다.

- /assets/fonts

  - 이번 프로젝트에 사용하는 폰트가 들어있습니다.

- /Common:

  - 헤더 / 푸터 / 에러페이지 및 커스텀 라이브러리가 들어있습니다.

- /Components:

  - 컴포넌트 폴더 입니다.

- /Network:

  - 백앤드 API 와 통신하는 부분이 들어있습니다.

- /Pages

  - MainNav 가 랩핑되어 있습니다.

- /public

  - 그래픽 리소스가 기본으로 들어가는 위치입니다.

- /resources
  - 상황에 따라 임시 json 데이터가 들어갈 경우 사용될 위치 입니다.

---

# 커스텀 라이브러리 설명

- DateFormat:

* 자바스크립트에서 new Date() 로 받아온 시간값에 대해서 표시방식을 컨버팅 합니다.
* 해당 내용은 DateFormat 최상단에 const의 yyyy_mm_dd 형식을 확인해주시기 바랍니다.
* import 할때에는
* import DateFormat, { TIME_FORMATTER_MM_dd_yy } from "[경로명]";
* 이런식으로 가져와 쓰시면 됩니다.
* 해당 구현 코드는 /Admin/UserList.jsx 에서 보실 수 있습니다.

- CommonAtom:

* Recoil 파일입니다. footer 컴포넌트를 on/off 하는 변수가 들어있습니다.
* Recoil 파일의 경우 해당 파일보다는 각 기능별 Recoil 파일을 생성후 key 값만 중복이 안되게 해주시면됩니다.
* 하나의 파일에 Recoil 작업을 할 경우 코드 컨플릭이 자주 나니 가급적 분리해서 사용해 주시면 될거 같습니다.
* import { footerEnabledRecoil } from "[경로명]";
* const [, setFooterEnabled] = useRecoilState(footerEnabledRecoil); // 푸터를 활성화 할지 말지를 결정합니다.
* useState와 가장 비슷해서 적응하기 쉬운 방식입니다.
* 해당 구현 코드는 /Admin/Main.jsx 에서 보실 수 있습니다.

---

# 라우터 추가 방법

- 이 프로젝트는 라우터를 React-router-dom 을 사용하고 있습니다.
- 해당 라우팅은 App.jsx 에서 설정하게 되며 <BrowserRouter> <Routes> 안에
- <Route path="[접속URL]" element={임포트한 컴포넌트} />
- 를 추가해주시면 됩니다.
- 작업하실 때 별도의 라우팅 작업후 주소를 입력하신뒤 작업 후
- TopNav 에서 라우팅을 연결하면 TopNav 에서 버튼 클릭 후 연결되게 작업될 것입니다.

---

# 최초 실행방법

1. 깃 클론 후 npm install 을 통해서 패키지를 인스톨합니다.
2. npm run dev 를 하면 사이트가 뜨게 됩니다.

- git pull 후에 패키지가 없어서 에러가 난다면 package.json 을 확인해서 없는 패키지를 설치해주거나
- 잘 모르겠으면 그냥 npm install 치면 package.json 을기반으로 없는 패키지를 알아서 깔아줘서 실행에 문제가 없습니다.

---

- //\*crate-react-app 에서 vite 로 변경되었습니다.

---

# vite 주의사항

- tailwind.config.js 에서
- plugins: [require("daisyui")],
- 추가 안해주면 플러그인 제대로 동작 안합니다.

---

# tailwind + vite 설치방법

- 일반적인 tailwind 설치와 조금 달라서 정리해서 올려드리겠습니다.
