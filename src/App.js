import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Outlet } from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Sidepanel from './components/Sidepanel';
import jsonData from "./data/data.json"
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Sidepanel />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
