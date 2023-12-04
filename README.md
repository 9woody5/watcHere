# 스크럼

- 월, 수, 금 오전 10시

---

## 프론트엔드

- 정우진 : 메인 페이지 / 검색 결과 조회 페이지 / 404 페이지
- 김태욱 : 로그인 / 마이 페이지
- 서지수 : 컨텐츠 상세페이지
- 조은나래 : 카테고리 / 관리자 페이지(유저 관리, 리뷰 관리)

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

- /router(11-18 NEW!!!)

  - react-router-dom 이 v5 에서 v6 문법으로 변경되고 outlet 를 사용함에 따라 content site 와 admin site 를 분리하게 되었습니다.
  - router 폴더는 해당 라우팅을 담당하는 파일이 존재하고 있습니다.

---


# 최초 실행방법

1. 깃 클론 후 npm install 을 통해서 패키지를 인스톨합니다.
2. npm run dev 를 하면 사이트가 뜨게 됩니다.

- git pull 후에 패키지가 없어서 에러가 난다면 package.json 을 확인해서 없는 패키지를 설치해 주세요.
