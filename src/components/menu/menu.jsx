import "./menu.css";
import addImg from "../../assets/add.png";
import { create, countTasks} from "../../services/taskService";
import { useState, useEffect } from "react";
import { getTodayDate, getTomorrowDate } from "../../utils/dateFormat";


const MenuComponent = ({addTask, addTaskList, taskLists, setSelectedDate}) => {
  const [isModalAddTask, setModalOpTask] = useState(false);
  const [isModalAddList, setModalOpList] = useState(false);
  const [formNewTask, setFormNewTask] = useState({
    title: "",
    description: "",
    date: "",
    listId: "",
  });
  const [formNewList, setFormNewList] = useState({
    name: "",
    category: "",
  });
  const [counter, setCounter] = useState(
    {
      todayTask: 0,
      tomorrowTask: 0,
      nextTasks: 0,
      lateTasks: 0,
      deactivatedTasks: 0
    }
  );
  const [continueAdd, setContinueAdd] = useState(false);

  useEffect(() => {

    const getTaskCount = async () => {
      try {
        const data = await countTasks();
        setCounter(data);
      } catch (error) {
        console.error('Error fetching task count:', error);
      }
    }

    getTaskCount();
  }, []);

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    console.log(date);
  }

  const handleAddClick = () => {
    setModalOpTask(!isModalAddTask);
  };

  const handleAddTaskList = () => {
    setModalOpList(!isModalAddList);
  };

  const handleCheck = (e) => {
    setContinueAdd(e.target.checked);
    console.log(continueAdd);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormNewTask({
      ...formNewTask,
      [name]: value,
    });
  };

  const handleChangeList = (e) => {
    const { name, value } = e.target;
    setFormNewList({
      ...formNewList,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(formNewTask);
    setModalOpTask(false);
  };

  const handleSubmitList = async (e) => {
    e.preventDefault();
    await addTaskList(formNewList);
    setModalOpList(false);
  }

  return (
    <div id="menu">
      <h1 id="title">Task++</h1>
      <ul className="menu-list">
        <div className="title-add">
          <h3>Tarefas</h3>
          <button className="button-add" onClick={handleAddClick}>
            <img src={addImg} alt="Adicionar" />
          </button>
        </div>
        <li>
          <div className="item">
            <p className="item-number">{counter.todayTask}</p>
            <p className="task-type" onClick={() => handleSelectedDate(getTodayDate())}>Hoje</p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{counter.tomorrowTask}</p>
            <p className="task-type" onClick={() => handleSelectedDate(getTomorrowDate())}>Amanhã</p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{counter.nextTasks}</p>
            <p className="task-type" onClick={() => handleSelectedDate("next")}>Próximos</p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{counter.lateTasks}</p>
            <p className="task-type" onClick={()=> handleSelectedDate("late")}>Atrasados</p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{counter.deactivatedTasks}</p>
            <p className="task-type" onClick={()=> handleSelectedDate("trash")}>Lixeira</p>
          </div>
        </li>
      </ul>
      <ul className="menu-list">
        <div className="title-add">
          <h3>Minhas Listas</h3>
          <button className="button-add" onClick={handleAddTaskList}>
            <img src={addImg} alt="Adicionar" />
          </button>
        </div>
        <li>
            <div className="item">
              <p className="item-number">0</p>
              <p className="task-type">Casa</p>
            </div>
        </li>
      </ul>
      {isModalAddTask && (
        <div className="add-overlay">
          <div className="add-content">
            <button onClick={handleAddClick}>X</button>
            <h2>Adicionar Nova Tarefa</h2>
            <div className="add-inputs">
              <label htmlFor="add-inputs-title">Título</label>
              <input
                className="add-inputs-text"
                id="add-inputs-title"
                type="text"
                name="title"
                placeholder="Título"
                value={formNewTask.title}
                onChange={handleChange}
              />
              <label htmlFor="add-inputs-description">Descrição</label>
              <textarea
                className="add-inputs-text"
                id="add-inputs-description"
                type="text"
                name="description"
                placeholder="Descrição"
                value={formNewTask.description}
                onChange={handleChange}
              />
              <label htmlFor="add-inputs-date">Data</label>
              <input
                className="add-inputs-text"
                type="date"
                name="date"
                id="add-inputs-date"
                value={formNewTask.date}
                onChange={handleChange}
              />
              <label htmlFor="selected-list">Adicionar a Lista</label>
              <select
                className="add-inputs-text"
                name="listId"
                id="selected-list"
                value={formNewTask.listId}
                onChange={handleChange}
              >
                <option value="">Selecione uma lista</option>
                {taskLists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
              <span>
                <input
                  type="checkbox"
                  name="continue"
                  id="continue-input"
                  onChange={handleCheck}
                />
                <label htmlFor="continue-input">Continuar Adicionando</label>
              </span>
              <button onClick={handleSubmit}>Criar Tarefa</button>
            </div>
          </div>
        </div>
      )}
      {isModalAddList && (
        <div className="add-overlay">
          <div className="add-content">
            <button onClick={handleAddTaskList}>X</button>
            <h2>Adicionar Nova Lista</h2>
            <div className="add-inputs">
              <label htmlFor="add-inputs-title">Nome</label>
              <input
                className="add-inputs-text"
                id="add-inputs-title"
                type="text"
                name="name"
                value={formNewList.name}
                onChange={handleChangeList}
                placeholder="Nome"
              />
                <input
                className="add-inputs-text"
                id="add-inputs-title"
                type="text"
                name="category"
                value={formNewList.category}
                onChange={handleChangeList}
                placeholder="Categoria"
              />
              <button onClick={handleSubmitList}>Adicionar Lista</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
