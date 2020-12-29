import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Main from './components/Main';
import { StateProvider} from "./context/store";

function App() {
  return (
    <StateProvider>
      <div className="App">
        <header>
          Navbar
        </header>
        <Main />
      </div>
    </StateProvider>
  );
}

export default App;
