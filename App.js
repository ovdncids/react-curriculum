import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import Members from './components/contents/Members.js';
import Search from './components/contents/Search.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header></Header>
        <hr />
        <div className="container">
          <Nav></Nav>
          <hr />
          <section className="contents">
            <Switch>
              <Route exact={true} path="/members" render={props => <Members {...props} testProps={true} />} />
              <Route exact={true} path="/search" component={Search} />
              <Redirect to={{pathname: "/members"}} />
            </Switch>
          </section>
          <hr />
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
