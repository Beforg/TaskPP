import './App.css';
import MenuComponent from './components/menu/menu';
import TaskComponent from './components/task/task';

function App() {
  let filter = "Hoje";
  let day = "20 de janeiro de 2025"
  return (
    <div className="App">
      <MenuComponent/>
      <div id='app-content'>
        <div id='app-content-title'>
           <h1 id="app-type">Tarefas de {filter}</h1>
           <p id='app-day'>{day}</p>
        </div>
        <TaskComponent/>
      </div>
    </div>
  );
}

export default App;
