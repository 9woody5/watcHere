설치된 패키지 사용방법 밎 주의사항

axios :
백앤드 통신용 패키지입니다.
구현은 /src/Network 안에 Connect.js 입니다.
대중화된 라이브러리라서 쉽고 다른데가도 많이 씁니다.
https://github.com/sheaivey/react-axios

react-cookie:
리액트에서 hook 를 사용해서 쿠키를 다루기위해서 사용합니다.
https://github.com/bendotcodes/cookies/tree/main/packages/react-cookie

react-router-dom :
리액트에서 페이지 전환을 할때 사용하는 패키지 입니다.
v5 와 v6 가 혼재되어 있으니 꼭 v6 메뉴얼을 공식홈페이지에서 보시고 사용해주시기 바랍니다.
https://github.com/remix-run/react-router#readme

react-icons:
리액트에서 여러가지 타입의 아이콘이 모여져있는 패키지 입니다.
각종 아이콘 찾으러 다닐필요없이 아래의 사이트에서 검색후 적용해주시면 됩니다.
https://react-icons.github.io/react-icons/

recoil:
redux대신에 전역 스테이트 관리를 위해서 사용하는패키지 입니다.
react 팀에서 만든 전역 스테이트 관리용 패키지로 차후 redux 를 대신할 수도 있지만 아직은 신생 패키지 라서 react 랑 좀 애매하게 엮이는데 장기적으로는 알아둘 필요가 있습니다.
https://recoiljs.org/ko/

tailwindcss:
css 처리를 쉽게하기 위한 css 프레임워크입니다.
리액트 랜더링 문제에 따라 잘 적용이 안될 경우도 있지만
css 를만들어서 작업하는거보다 이걸 쓰는게 훨씬 편합니다.
https://tailwindcss.com/docs/installation

최초 업데이트 된 패키지 설명

/src
/Common:
메인 페이지 / 푸터 / 에러페이지가 들어있습니다.

/Contents:
메인 컨텐츠 표시부와 탑 네비게이션이 들어있습니다.
/Network:
백앤드 API 와 통신하는 부분이 들어있습니다.

App.js
기본 라우팅과 lazy 로딩 샘플이 작업되어있습니다.

index.js
리액트 쿠키가 작업되어있습니다.

/public
그래픽 리소스가 기본으로 들어가는 위치입니다.

/resources
상황에 따라 임시 json 데이터가 들어갈 경우 사용될 위치 입니다.

최초 실행방법

1. 깃 클론 후 npm install 을 통해서 패키지를 인스톨합니다.
2. npm start 를 하면 사이트가 뜨게 됩니다.
3. 메인사이트에서 검색 버튼을 누르면 컨텐츠 사이트로 넘어가게 되는데 iframe으로 tmdb 사이트를 긁어오고 lazy 작업되어있어서 반응이 느립니다. 3초정도 기다려 주셔야할 수도 있습니다.

위에 데이터는 임시로 작업된 내용이기 때문에 구조만 보시고 새롭게 작업하시면 좋을거 같습니다.

git pull 후에 패키지가 없어서 에러가 난다면 package.json 을 확인해서 없는 패키지를 설치해주거나
잘 모르겠으면 그냥 npm install 치면 package.json 을기반으로 없는 패키지를 알아서 깔아줘서 실행에 문제가 없습니다.

차후 CI/CD 구성이 되면 .env 작업을 진행할수도 있습니다.
