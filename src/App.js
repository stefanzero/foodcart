import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Main from './components/Main';
import { StateProvider} from "./context/store";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <header>
          Navbar
        </header>
        <Main />
      </StateProvider>
    </div>
  );
}

export default App;
