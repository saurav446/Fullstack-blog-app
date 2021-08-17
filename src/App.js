import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { Context } from "./Component/context/Context";
import Topbar from './Component/Topbar/Topbar';
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Settings from './Pages/Settings/Settings';
import Single from './Pages/Single/Single';
import Write from './Pages/Write/Write';

function App() {
   const {user} = useContext(Context);
    
// "proxy" : "https://blooming-tundra-50823.herokuapp.com/api/"
  return (
    <>
    <Router> 
       <Topbar /> 
          <Switch>
            <Route exact path="/"> { user ? <Home /> :<Register />}</Route>
            <Route path="/register"> <Register /> </Route>
            <Route path="/login"> { user ? <Home /> :  <Login /> }</Route> 
            <Route path="/write"> {user ? <Write /> : <Register />}</Route> 
            <Route path="/setting"> {user ? <Settings /> :  <Register />}</Route>
            <Route path="/post/:postId"><Single /></Route>
            
          </Switch>
    </Router>  
     </>
  );
}

export default App;
