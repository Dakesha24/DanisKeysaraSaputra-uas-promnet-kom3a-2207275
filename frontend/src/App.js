// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomeComponent from './components/HomeComponent';
import ListItemComponent from './components/ListItemComponent';
import CreateItemComponent from './components/CreateItemComponent';
import ViewItemComponent from './components/ViewItemComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            <Route path="/items" component={ListItemComponent}></Route>
            <Route path="/add-item/:id" component={CreateItemComponent}></Route>
            <Route path="/view-item/:id" component={ViewItemComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
