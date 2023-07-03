import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import NutritionCount from './Components/NutritionCount.js';
import UserSelection from './Components/UserSelection.js';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path = "/">
                <Redirect to ="/userselection" />
            </Route>
            <Route path = "/nutrition">
                <NutritionCount />
            </Route>
            <Route path = "/userselection">
                <UserSelection />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
