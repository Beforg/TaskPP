import { useState, useEffect, use } from 'react';
import './App.css';
import MenuComponent from './components/menu/menu';
import TaskComponent from './components/task/task';
import { getTaskByDay, create, getLateTasks, getNext, updateTask, deactivateTask, getDeactivatedTasks } from './services/taskService';
import { getAllTaskList, createList } from './services/taskListService'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskLists, setTaskLists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let filter = "Hoje";
  let day = "20 de janeiro de 2025"

  useEffect(() => {
    getAllTaskLists();
    if (selectedDate === "late") {
      getLate();
    } else if (selectedDate === "next") {
      getNextTasks();
    } else if (selectedDate === "trash") {
      getDeactivated();
    } else {
      getTasks(selectedDate);
    }
  }, [selectedDate]);

  const getDeactivated = async () => {
    try {
      const { content } = await getDeactivatedTasks(0);
      setTasks(content);
    } catch (error) {
      console.error("Erro ao buscar tarefas desativadas:", error);
    }
  };

  const getNextTasks = async () => {
    try {
      const { content } = await getNext(0);
      setTasks(content);
    } catch (error) {
      console.error("Erro ao buscar próximas tarefas:", error);
    }
  };

  const getTasks = async (date) => {
    try {
      const { content } = await getTaskByDay(date, 0);
      setTasks(content);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };
  const getAllTaskLists = async () => {
    try {
      const data = await getAllTaskList();
      setTaskLists(data);
    } catch (error) {
      console.error("Erro ao buscar listas das tarefas:", error);
    }
  };

  const getLate = async () => {
    try {
      const { content } = await getLateTasks(0);
      setTasks(content);
    } catch (error) {
      console.error("Error ao buscar tarefas atrasadas:", error);
    }
  }

  const addTask = async (newTask) => {
    try {
      await create(newTask);
      getTasks(selectedDate);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const addTaskList = async (newTaskList) => {
    try {
      await createList(newTaskList);
      getAllTaskLists();
    } catch (error) {
      console.error("Erro ao criar lista de tarefas:", error);
    }
  };

  const deactivate = async (id) => {
    try {
      await deactivateTask(id);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Erro ao desativar tarefa:", error);
    }
  }

  const update = async (updatedTask, id) => {
    try {
      await updateTask(updatedTask, id);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  }

  return (
    <div className="App">
      <MenuComponent addTask={addTask} addTaskList={addTaskList} taskLists={taskLists} setSelectedDate={setSelectedDate}/>
      <div id='app-content'>
        <div id='app-content-title'>
           <h1 id="app-type">Tarefas de {filter}</h1>
           <p id='app-day'>{day}</p>
        </div>
        <TaskComponent tasks={tasks} taskLists={taskLists} updateTask={update} deactivateTask={deactivate}/>
      </div>
    </div>
  );
}


export default App;
