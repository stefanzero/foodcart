import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <header>
        Navbar
      </header>
      <section>
        <div className="side-bar"></div>
        <Main />
      </section>
    </div>
  );
}

export default App;
