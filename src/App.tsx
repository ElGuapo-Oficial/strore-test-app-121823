import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AppRouter from './router/Router';

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;