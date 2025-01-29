import { useState, useEffect } from "react";
import "./App.css";
import MenuComponent from "./components/menu/menu";
import TaskComponent from "./components/task/task";
import {
  getTaskByDay,
  create,
  getLateTasks,
  getNext,
  updateTask,
  deactivateTask,
  getDeactivatedTasks,
  getTaskByListId,
  updateTaskStatus,
  countTasks,
  deleteTask
} from "./services/taskService";
import {
  getAllTaskList,
  createList,
  getTaskList,
  updateList,
  deleteList
} from "./services/taskListService";
import { formatDate, getTodayDate } from "./utils/dateFormat";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskLists, setTaskLists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [currentPageTask, setCurrentPageTask] = useState(1);
  const [totalPagesTask, setTotalPagesTask] = useState(0);
  const [currentPageList, setCurrentPageList] = useState(1);
  const [totalPagesList, setTotalPagesList] = useState(1);
  const [counter, setCounter] = useState(
    {
      todayTask: 0,
      tomorrowTask: 0,
      nextTasks: 0,
      lateTasks: 0,
      deactivatedTasks: 0
    }
  );
  const [taskListPaged, setTaskListPaged] = useState({
    content: [],
    totalElements: 0,
  });
  const [selectedDateCache, setSelectedDateCache] = useState("");
  const [filterTitle, setFilterTitle] = useState("");


  useEffect(() => {
    getTaskCount();
    if (selectedDate !== selectedDateCache) {
      resetPages();
    }
    getAllTaskLists();
    if (selectedDate === "late") {
      getLate();
      setFilterTitle("Tarefas Atrasadas");

    } else if (selectedDate === "next") {
      getNextTasks();
      setFilterTitle("Próximas Tarefas");
    } else if (selectedDate === "trash") {
      getDeactivated();
      setFilterTitle("Tarefas da Lixeira");
      
    } else if (selectedDate.toString().length > 10) {
      setFilterTitle("Tarefas da Lista");
      getTbyLid(selectedDate);
      
    } 
      else {
      setFilterTitle("Tarefas de " + formatDate(selectedDate));    
      getTasks(selectedDate);
    }
    getTaskListP();
    setSelectedDateCache(selectedDate);
  }, [selectedDate, currentPageTask, currentPageList]);

  const getTbyLid = async (listId) => {
    try {
      const { content, totalPages } = await getTaskByListId(listId, currentPageTask - 1);
      setTasks(content);
      setTotalPagesTask(totalPages)
    } catch (error) {
      console.error("Erro ao buscar tarefas por lista:", error);
    }
  }

  const updList = async (taskList, id) => {
    try {
      await updateList(taskList, id);
      getAllTaskLists();
      getTaskListP();
    } catch (error) {
      console.error("Erro ao atualizar lista de tarefas:", error);
    }
  }

  const delList = async (id) => {
    try {
      await deleteList(id);
      getAllTaskLists();
      getTaskListP();
    } catch (error) {
      console.error("Erro ao deletar lista de tarefas:", error);
    }
  }

  const getTaskCount = async () => {
    try {
      const data = await countTasks();
      setCounter(data);
    } catch (error) {
      console.error('Error fetching task count:', error);
    }
  }

  const resetPages = () => {
    setCurrentPageTask(1);
    setCurrentPageList(1);
  }

  const deleteT = async (id) => {
    try {
      await deleteTask(id);
      getDeactivated();
      getTaskCount();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  const getTaskListP = async () => {
    try {
      const { content, totalPages, totalElements } = await getTaskList(currentPageList - 1);
      setTaskListPaged({ content, totalElements });
      setTotalPagesList(totalPages);
    } catch (error) {
      console.error("Erro ao buscar listas de tarefas:", error);
    }
  };

  const getDeactivated = async () => {
    try {
      const { content, totalPages } = await getDeactivatedTasks(currentPageTask - 1);
      setTotalPagesTask(totalPages);
      setTasks(content);
    } catch (error) {
      console.error("Erro ao buscar tarefas desativadas:", error);
    }
  };

  const getNextTasks = async () => {
    try {
      const { content, totalPages } = await getNext(currentPageTask - 1);
      setTotalPagesTask(totalPages);
      setTasks(content);
    } catch (error) {
      console.error("Erro ao buscar próximas tarefas:", error);
    }
  };

  const getTasks = async (date) => {
    try {
      const { content, totalPages } = await getTaskByDay(date, currentPageTask - 1);
      setTotalPagesTask(totalPages);
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
      const { content, totalPages } = await getLateTasks(currentPageTask - 1);
      setTotalPagesTask(totalPages);
      setTasks(content);
    } catch (error) {
      console.error("Error ao buscar tarefas atrasadas:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
      await create(newTask);
      getTasks(selectedDate);
      getTaskCount();
      getTaskListP();
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
      getTaskListP()
      getTaskCount();
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao desativar tarefa:", error);
    }
  };

  const update = async (updatedTask, id) => {
    try {
      await updateTask(updatedTask, id);
      getTasks(selectedDate);
      getTaskCount();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const updateTstatus = async (id) => {
    try {
      await updateTaskStatus(id);
      getTasks(selectedDate);
      getTaskCount();
    } catch (error) {
  }
  }

  const handlePageChangeTask = (page) => {
    setCurrentPageTask(page);
  }

  const handlePageChangeList = (page) => {
    setCurrentPageList(page);
  }

  return (
    <div className="App">
      <MenuComponent
        addTask={addTask}
        addTaskList={addTaskList}
        taskLists={taskLists}
        setSelectedDate={setSelectedDate}
        taskListPag={taskListPaged}
        getTaskListPag={getTaskListP}
        currentPage={currentPageList}
        totalPages={totalPagesList}
        onPageChange={handlePageChangeList}
        taskCount={counter}
        updateList={updList}
        deleteList={delList}
      />
      <div id="app-content">
        <div id="app-content-title">
          <h1 id="app-type">{filterTitle}</h1>
          <div id="app-content-title-info">
            <p id="app-title-info">Task++</p>
            <p className="author">Feito por Bruno Forgiarini</p>
          </div>

        </div>
        <TaskComponent
          tasks={tasks}
          taskLists={taskLists}
          updateTask={update}
          deactivateTask={deactivate}
          currentPage={currentPageTask}
          totalPages={totalPagesTask}
          onPageChange={handlePageChangeTask}
          updateTaskStatus={updateTstatus}
          deleteTask={deleteT}
        />
      </div>
    </div>
  );
}
export default App;
