### SalesLogWeb

SalesLog Web Application

## Installation

```npm config set @theklab:registry https://npm.theklab.co```

```npm install```

```yarn start``` or ```npm start```

SalesLogWeb uses following framework and third-party 

### Framework

| framework    | Desc                                                   | Note                       |
|--------------|--------------------------------------------------------|----------------------------|
|react.js   | javascript view 라이브러리               |                            |
| data    |  react-redux, redux-saga, redux-persist(상태관련 라이브러리)                    |                            |
| routing     | react-router, react-router-dom, react-router-auth, react-router-redux(라우팅 관련 라이브러리)|                            |
| webpack   |  파일을 구성할 수 있는 자바스크립트 모듈       |                            |
| babel  |    javascript 컴파일러   |                            |

## UI Library
| UI Library    | Desc                                                   | Note                       |
|--------------|--------------------------------------------------------|----------------------------|
| bootstrap, reactstrap   | CSS 관련 ribrary               |                            |
| node-sass    |                      |                            |
| react-bootstrap     | (date-picker, table,  table-next, table2-paginator)|                            |
| react   | (dates, flatpickr, csv, loadable, perfect-scroolbar)        |                            |
| chart.js     | (recharts, react-apexcharts, react-google-charts)      |                            |
| select       | react-select, rc-select                                |                            |
| loader      | loader-sass, load-style, loader-url                     |                             |
| wow.js       |                                              |                            |
| d3.js        |                          |                            |
| excel.js      | Excel 관련 ribrary                               |                             |
| print.js      |   출력 관련 ribrary                                                   |                            |
| xlxs          |        엑셀 확장자 관련 ribrary                                          |                            |

## Test
eslint
jest
react-testing-library

## Side Effect
react-helmet
react-pollyfill-app

## Business Logic & TheKlab Component
@theklab/saleslog
@theklab/klab-oauth2

# Structure

| Directory    | Desc                                                   | Note                       |
|--------------|--------------------------------------------------------|----------------------------|
| model        | model과 관련된 directory                               |                            |
| assets       | scss, image, font 관련 directory                       |                            |
| constants     | Redux action, Redux reducer Constant 관련 directory    |                            |
| components   | 주요 Component(Sidebar, topbar, Footer) 관련 directory |                            |
| helpers      | authUtil(session 설정 및 인증 관련) 관련                |                            |
| pages         | 각 Page별로 구성된 Directory                           |                            |
| -board       | 공지사항 Page                                          |                             |
| -landing       | 랜딩 Page                                          |                             |
| -main        | Main Component 및 대시보드 Page                        |                            |
| -manage      | 일지조회 및 업로드 Page                                |                             |
| -notificatin | 알림 Page                                              |                            |
| -organization| 조직도 변경 Page                                       |                            |
| -profile     | 유저 정보 Page                                         |                            |
| -report      | 리포트 생성 Page                                       |                            |
| -search      | 영업일지 기록 검색 Page                                |                            |
| -settings    | 환경 설정 Page                                         |                            |
| redux        | redux 관련 directory                                   |                            |
| routes.js    | React-router 라우팅 정보 관련                          |                             |

- Hook, Functional Component based
- CSR(Client Side Rendering)
- create-react-app based
- es6 based

## Branch

1. master branch
  main branch. jenkins hook on this branch. if change detect on master branch, start deploying

2. develop branch
  development branch

## Proxy Setting (Development)

Default Api Endpoint is

`"proxy": "https://api-v2.saleslog.co"`


## Proxy Setting (Production)

Add scripts to `conf.d\virtual.conf`(ami) or `site-enabled\default`(ubuntu)

```
    server {
        listen 80;
        server_name __ test.saleslog.co theklab.saleslog.co ... <alias>; # ALIAS ADD HERE

        resolver 8.8.8.8 ipv6=off; 
        set $server api.saleslog.co;

        # API PROXY PASS
        location /dev { 
             proxy_pass https:/$server;
        }

        # HTTP -> HTTPS redirect
        if ($http_x_forwarde_proto = 'http') {
             return 301 https://$host$request_uri;
        }

        # PRODUCTION BUILD LOCATION
        location / {
            root /home/<user>/build;
            index index.html;
        }
    }
 ```
 
 after modifying 

 `sudo service nginx reload`

### Install private module

```npm config set @theklab:registry https://npm.theklab.co```

install private module with

```npm install @theklab/saleslog```

### Documentation

See more info on [TheKlab Dev Wiki](https://www.notion.so/73aab53f7082443d9fc72440e7f25b79?v=f93c8841f2e6451398185900be50897d);

### Jenkins Deploy Pipeline Script

[CI/CD Server](https://deploy.saleslog.co)

### etc.

reademe author: 박준우(junu.park@theklab.co, pkjoho95@gmail.com), (author add here)
last-modified: 2020.09.28
