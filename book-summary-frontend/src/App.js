import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import ListBookComponent from './components/ListBookComponent';
import CreateBookComponent from './components/CreateBookComponent';
import ViewBookComponent from './components/ViewBookComponent';
import UpdateBookComponent from './components/UpdateBookComponent';


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch>
                          <Route path = "/" exact component = {ListBookComponent}></Route>
                          <Route path = "/books" component = {ListBookComponent}></Route>
                          <Route path = "/add-books/:id" component = {CreateBookComponent}></Route>
                          <Route path = "/view-book/:id" component = {ViewBookComponent}></Route>
                          <Route path = "/update-book/:id" component = {UpdateBookComponent}></Route>
                    </Switch>
                </div>
        </Router>
    </div>
  );
}

export default App;
