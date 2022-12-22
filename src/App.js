import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Sidepanel from './components/Sidepanel';
import jsonData from "./data/data.json"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidepanel />
      <Dashboard data={jsonData}/>
    </div>
  );
}

export default App;
