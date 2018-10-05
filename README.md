# 리액트 커리큘럼

<!-- ## Wifi
    xkzm9889 / u21wrbh@ -->

## 용어
**Markup**: 디자인을 HTML, CSS로 변환 하는 과정 또는 HTML 파일을 뜻함. HTML, CSS로 변환 된다. 퍼블리싱이라고도 함.

**Markdown**: 주로 README.md 파일로 많이 쓰이고, 현재 이 문서도 Markdown으로 만들어짐. 화려한 레이아웃 업이 Text로 정보 전달 할때 많이 사용한다.

## NVM
Node.js 설치 버전을 관리하는 프로그램. 심볼릭 링크를 이용하여 Node.js 버전을 그때 그때 변경한다.
Node.js 버전 별로 자유롭게 설치, 이동, 삭제 가능하다. 현재는 Node.js v6, v8이 주류를 이룬다.

**Mac OS Node 삭제 방법**: https://gomugom.github.io/how-to-remove-node-from-macos/

<!-- **VSCode에서 터미널 호출시 버전을 못 찾을 때**: https://github.com/Microsoft/vscode-docs/blob/master/docs/editor/integrated-terminal.md#why-is-nvm-complaining-about-a-prefix-option-when-the-integrated-terminal-is-launched -->

**Mac OS**: https://gist.github.com/falsy/8aa42ae311a9adb50e2ca7d8702c9af1

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

**Windows**: https://github.com/coreybutler/nvm-windows/releases

https://nodejs.org

    nvm ls
        // 설치 된 node.js 리스트를 본다.
    nvm install 8.12.0
        // 해당 버전을 설치 한다.
    nvm uninstall 8.12.0
        // 해당 버전을 삭제 한다.
    nvm use 8.12.0
        // 해당 버전을 사용 한다.

<!-- v6.14.4 -->

## NPM
    npm install -g npm
        // 상위 버전으로 업 한다. 현재 v6.4.1

## Create React App 설치
https://github.com/facebook/create-react-app
https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment

    npx create-react-app my-app
        // React의 스케폴딩을 쉽게 만들고 작업 후 쉽게 빌드 할 수 있다.
        // npx는 npm v.5.2 이후 부터 npm과 같이 설치 된다.

    npm run test
    npm run build
    npm install -g serve
    serve -s build

## Git .gitignore
    # packege.json
    package-lock.json
    yarn-lock.json
        // 가끔 이 파일 때문에 클라이언트와 서버 사이에 버전이 안 맞아서 오류가 발생한다.
        // 용량도 크고 npm install 할때 마다 생성되는 파일이니 .gitignore 목록에 넣는다.

    # .idea
    .idea
        // JetBrains 제품인 IntelliJ, WebStorm 설정 파일

## Git push
    git push

## VSCode 확장 Git History 설치

## Sass 설치
css를 프로그램화 하여 색상 테마를 변수에 넣을 수 있고, 반복 부분을 저장하고 불러 올 수 있다. 이름은 Sass지만 파일명은 scss이다.

https://sass-guidelin.es/ko/

    npm install --save node-sass

## 기본 디렉토리 구조 잡기
    src
        /app
        /shared

 ## Markup
src/app/App.js

      <div>
        <header><h1>React Study</h1></header>
        <hr />
        <div className="container">
          <div className="nav">
            <nav>
              <ul>
                <li><h2>CRUD</h2></li>
                <li><h2>Search</h2></li>
              </ul>
            </nav>
          </div>
          <hr />
          <div className="contents">
            <section>
              <h3>CRUD</h3>
              <p>Contents</p>
            </section>
          </div>
          <hr />
        </div>
        <footer>Copyright</footer>
      </div>

src/index.scss

    // common
    .pointer {
      cursor: pointer;
    }

    .relative {
      position: relative;
    }

    .d-none {
      display: none;
    }

    .d-block {
      display: block;
    }

    .flex {
      display: flex;
      align-items: stretch;
      & .wrap {
        flex-wrap: wrap;
      }
      & .empty, .full {
        flex-grow: 1;
      }
    }

    // Markup
    hr {
      display: none;
    }

    h1, footer {
      margin: 0.5rem;
    }

    .container {
      @extend .flex;
      min-height: 300px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      .nav {
        min-height: 300px;
        background-color: skyblue;
        ul {
          list-style: none;
          margin: 0.5rem 0 0.5rem 0;
          padding: 0;
          h2 {
            margin: 0;
            padding: 0.5rem;
          }
        }
      }
      .contents {
        margin-left: 1rem;
      }
    }

## CSS Flex
https://opentutorials.org/course/2418/13526

**현재 브라우저 상황**: YouTube IE11 부터 지원. IE11 부터 Flex 사용 가능.

## React Component 만들기
Header, Nav, Footer 이렇게 Component 별로 파일을 나눈다.

## React Router DOM 설치
https://reacttraining.com/react-router/

    npm install --save react-router-dom

## Router 만들기
src/app/App.js

    import { BrowserRouter, Switch, Route } from 'react-router-dom';

    <BrowserRouter>
        <Switch>
            <Route exact={true} path="/search" component={Search}/>
            <Route component={CRUD}/>
        </Switch>
    </BrowserRouter>

src/app/components/Nav.js

    <li><h2><Link to="CRUD">CRUD</Link></h2></li>
    <li><h2><Link to="search">Search</Link></h2></li>

**BrowserRouter와 HashRouter 차이점**: BrowserRouter 사용 할 경우 IE11 이전 브라우저에서 오류가 발생 해서 HashRouter를 써야함

## CRUD Conpenent Markup
src/app/components/contents/CRUD.js

      <div>
        <h3>CRUD</h3>
        <hr className="d-block" />
        <div>
          <h4>Read</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Created Date</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>횽길동</td>
                <td>39</td>
                <td>2018-10-04</td>
                <td>
                  <button>Update</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="d-block" />
        <div>
          <h4>Create</h4>
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Age" />
          <button>Create</button>
        </div>
      </div>

## MobX 설치
https://github.com/mobxjs/mobx

    npm install --save mobx
    npm install --save mobx-react

## CRUD Store 만들기
shared/stores/CRUDStore.js

    import { observable } from 'mobx';

    export default class CRUDStore {
      member = {
          name: '',
          age: ''
      }

      // setMemberInit() {
      //  this.member = {
      //    name: '',
      //    age: ''
      //  }
      // }

      // create() {
      //   console.log('create')
      // }
    }

    decorate(CRUDStore, {
      member: observable
    })

    export const crudStore = new CRUDStore();

<!-- ## VSCode experimentalDecorators 에러 발생시
tsconfig.json

    {
      "compilerOptions": {
        "experimentalDecorators": true,
        "allowJs": true
      }
    } -->

## CRUD Store 등록하기
src/index.js

    import { Provider } from 'mobx-react';
    import { crudStore } from './shared/stores/CRUDStore';

    <Provider
      crudStore={crudStore}
    >
      <App />
    </Provider>

## CRUD Conpenent Store inject & observer
src/app/components/contents/CRUD.js

    import { inject, observer } from 'mobx-react';

    create() {
      const { crudStore } = this.props;
      crudStore.create();
    }

    const { crudStore } = this.props;
    const { member } = crudStore;

    <input
      type="text" placeholder="Name" value={member.name}
      onChange={e => {member.name = e.target.value}}
    />
    <input
      type="number" placeholder="Age" value={member.age}
      onChange={e => {member.age = e.target.value}}
    />
    <button onClick={() => this.create()}>Create</button>

    // Life cycle
    componentDidMount() {
      const { crudStore } = this.props;
      crudStore.setMemberInit();
    }

    CRUD = inject('crudStore')(observer(CRUD))

### render 함수 설명 하기

## Axios(서버 연동), toastr(메시지 창), spin.js(로딩 스피너), lodash(배열, 오브젝트 유틸리티), moment(시간관련 유틸리티) 설치
    npm install --save axios toastr spin.js nprogress lodash moment

## debugger 설명
    debugger;

## Validation with toastr
https://github.com/CodeSeven/toastr

shared/utils.js

    import Toastr from 'toastr';
    import 'toastr/build/toastr.min.css';

    export const toastr = () => {
      return Toastr;
    };

    Toastr.options.closeButton = true;
    Toastr.options.hideDuration = 200;

shared/stores/CRUDStore.js

    import * as utils from '../utils';

    // validation
    if (!this.member.name) {
      utils.toastr().warning('Please text your name.');
      return;
    }
    if (!Number(this.member.age) || Number(this.member.age) <= 0) {
      utils.toastr().warning('Please text your age and upper than 0.');
      return;
    }

## Spin.js
https://spin.js.org/

shared/utils.js

    import { Spinner } from 'spin.js';
    import 'spin.js/spin.css';

    export const spinner = () => {
      return new Spinner({scale: 0.5});
    };


src/app/components/contents/CRUD.js

    create(target) {
      const { crudStore } = this.props;
      crudStore.create(target);
    }

    <button className="relative pointer" onClick={e => this.create(e.target)}>Create</button>


shared/stores/CRUDStore.js

    create(spinnerTarget) {
      utils.spinner().spin(spinnerTarget);
    }

## node.js 서버 실행
    npm install -g nodemon
    nodemon index.js

## Axios 서버 연동
https://github.com/axios/axios

### Create
shared/utils.js

    export const apiCommonError = (error, spinner) => {
      console.log(error);
      console.log(error.response);
      const errMessage = (error.response && error.response.data && (error.response.data.message || error.response.data.errMessage || error.response.data.sqlMessage)) || error;
      toastr().error(errMessage);
      if (spinner) {
        spinner.stop();
      }
    };

shared/stores/CRUDStore.js

    import axios from 'axios';

    const spinner = utils.spinner().spin(spinnerTarget);
    axios.post('http://localhost:3100/api/v1/member', this.member).then(response => {
      console.log(response);
      spinner.stop();
      this.read();
      utils.toastr().success(response.data.result);
    }).catch(error => {
      utils.apiCommonError(error, spinner);
    });

    read() {}

### Read
shared/utils.js

    import * as NProgress from 'nprogress';
    import 'nprogress/nprogress.css';

    export const apiCommonError = (error, spinner) => {
      nProgress.done();
    }

    export const nProgress = {
      start: () => NProgress.start(),
      done: () => NProgress.done()
    };

shared/stores/CRUDStore.js

    import { decorate, observable, action } from 'mobx';

    members = []

    read() {
      utils.nProgress.start();
      axios.get('http://localhost:3100/api/v1/member', this.member).then(response => {
        console.log(response);
        this.members = response.data.members;
        utils.nProgress.done();
      }).catch(error => {
        utils.apiCommonError(error);
      });
    }

    decorate(CRUDStore, {
      member: observable,
      members: observable,
      read: action
    })

src/app/components/contents/CRUD.js

    import _ from 'lodash';
    import moment from 'moment';

    const { member, members } = crudStore;

    {_.map(members, (member, key) => (
      <tr key={key}>
        <td>{member.name}</td>
        <td>{member.age}</td>
        <td>{moment(member.createdDate).format('YYYY-MM-DD')}</td>
        <td>
          <button>Update</button>
          <button>Delete</button>
        </td>
      </tr>
    ))}

    crudStore.read();

### Update
src/app/components/contents/CRUD.js

    update(target, key) {
      const { crudStore } = this.props;
      crudStore.update(target, key);
    }

    <input
      type="text" placeholder="Name" value={member.name}
      onChange={e => {member.name = e.target.value}}
    />

    <input
      type="text" placeholder="Age" value={member.age}
      onChange={e => {member.age = e.target.value}}
    />

    <button className="relative pointer" onClick={e => this.update(e.target, key)}>Update</button>

shared/stores/CRUDStore.js

    update(spinnerTarget, key) {
      const member = this.members[key];
      if (!member.name) {
        utils.toastr().warning('Please text your name.');
        return;
      }
      if (!Number(member.age) || Number(member.age) <= 0) {
        utils.toastr().warning('Please text your age and upper than 0.');
        return;
      }
      const spinner = utils.spinner().spin(spinnerTarget);
      axios.put('http://localhost:3100/api/v1/member', {key, member}).then(response => {
        console.log(response);
        spinner.stop();
        this.read();
        utils.toastr().success(response.data.result);
      }).catch(error => {
        utils.apiCommonError(error, spinner);
      });
    }

### delete
src/app/components/contents/CRUD.js

    delete(target, key) {
      const { crudStore } = this.props;
      crudStore.delete(target, key);
    }

    <button className="relative pointer" onClick={e => this.delete(e.target, key)}>Delete</button>

shared/stores/CRUDStore.js

    delete(spinnerTarget, key) {
      if (!window.confirm('Are you sure?')) {
        return;
      }
      const spinner = utils.spinner().spin(spinnerTarget);
      axios.delete(`http://localhost:3100/api/v1/member/${key}`).then(response => {
        console.log(response);
        spinner.stop();
        this.read();
        utils.toastr().success(response.data.result);
      }).catch(error => {
        utils.apiCommonError(error, spinner);
      });
    }

## Search Conpenent Markup
src/app/components/contents/Search.js

    <div>
      <h3>Search</h3>
      <hr className="d-block" />
      <div>
        <input type="text" />
        <button>Search</button>
      </div>
      <hr className="d-block" />
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>횽길동</td>
              <td>39</td>
              <td>2018-10-04</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

## Search Store 만들기
shared/stores/SearchStore.js

    import { decorate, observable, action } from 'mobx';
    import axios from 'axios';
    import * as utils from '../utils';

    class SearchStore {
      member = {
        name: ''
      }

      members = []

      setSearchInit() {
        this.member = {
          name: ''
        }
      }

      search() {
        utils.nProgress.start();
        axios.get(`http://localhost:3100/api/v1/search?name=${this.member.name}`, this.member).then(response => {
          console.log(response);
          this.members = response.data.members;
          utils.nProgress.done();
        }).catch(error => {
          utils.apiCommonError(error);
        });
      }
    }

    decorate(SearchStore, {
      member: observable,
      members: observable,
      search: action
    })

    export const searchStore = new SearchStore();

## Search Store 등록하기
src/index.js

    import { searchStore } from './shared/stores/SearchStore';

    searchStore={searchStore}

## Search Conpenent Store inject & observer
src/app/components/contents/Search.js

    import { inject, observer } from 'mobx-react';
    import _ from 'lodash';
    import moment from 'moment';

    search() {
      const { searchStore } = this.props;
      searchStore.search();
    }

    keyPress(e) {
      if (e.charCode === 13) {
        this.search();
      }
    }

    const { searchStore } = this.props;
    const { member, members } = searchStore;

    <input
      type="text" value={member.name}
      onChange={e => {member.name = e.target.value}}
      onKeyPress={(e) => this.keyPress(e)}
    />
    <button className="relative pointer" onClick={e => this.search()}>Search</button>

    {_.map(members, (member, key) => (
      <tr key={key}>
        <td>{member.name}</td>
        <td>{member.age}</td>
        <td>{moment(member.createdDate).format('YYYY-MM-DD')}</td>
      </tr>
    ))}

    // Life cycle
    componentDidMount() {
      console.log('componentDidMount');
      const { searchStore } = this.props;
      searchStore.setSearchInit();
      searchStore.search();
    }

    Search = inject('searchStore')(observer(Search))

## Search Conpenent 파라미터 변경과 새로고침 적용
src/app/components/contents/Search.js

    const querystring = require('querystring');

    search() {
      const { history, searchStore } = this.props;
      const { member } = searchStore;
      history.push(`/search?name=${member.name}`);
    }

    // Life cycle
    componentDidMount() {
      console.log('componentDidMount');
      const { location, searchStore } = this.props;
      // searchStore.setSearchInit();
      const { name } = querystring.parse(location.search.split('?')[1]);
      searchStore.member.name = name || '';
      searchStore.search();
    }

    componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps');
      const { searchStore } = this.props;
      const { name } = querystring.parse(nextProps.location.search.split('?')[1]);
      searchStore.member.name = name || '';
      searchStore.search();
    }

## Proxy 설정
package.json

    "proxy": "http://localhost:3100"

http://localhost:3100/api -> /api 수정 하기

# 수고 하셨습니다.
