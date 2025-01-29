import "./menu.css";
import addImg from "../../assets/add.png";
import { useState, useEffect } from "react";
import { getTodayDate, getTomorrowDate } from "../../utils/dateFormat";
import classNames from "classnames";
import Pagination from "../pagination/pagination";
import edit from "../../assets/edt-white.png";
import del from "../../assets/del.png";

const MenuComponent = ({
  addTask,
  addTaskList,
  taskLists,
  setSelectedDate,
  taskListPag,
  getTaskListPag,
  currentPage,
  totalPages,
  onPageChange,
  taskCount,
  updateList,
  deleteList,
}) => {
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
  const [continueAdd, setContinueAdd] = useState(false);
  const [isEditList, setEditList] = useState(false);
  const [labelTaskList, setLabelTaskList] = useState("Adicionar nova Lista");
  const [selectedListId, setSelectedListId] = useState("");
  const [currentMenuPage, setCurrentMenuPage] = useState("hoje");

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const handleAddClick = () => {
    setModalOpTask(!isModalAddTask);
  };

  const handleAddTaskList = () => {
    setModalOpList(!isModalAddList);
  };

  const handleCheck = (e) => {
    setContinueAdd(e.target.checked);
  };

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
    console.log("ID DA LISTA: " + formNewTask.listId);
    if (!continueAdd) {
    setModalOpTask(false);
    }
    setFormNewTask({
      title: "",
      description: "",
      date: "",
      listId: "",
    });
  };

  const handleUpdateList = async () => {
    await updateList(formNewList, selectedListId);
    await getTaskListPag(0);
    handleResetFormList();
    setModalOpList(false);
  };

  const handleOpenEditList = (list) => {
    setEditList(true);
    setLabelTaskList("Editar Lista");
    setFormNewList({
      name: list.name,
      category: list.category,
    });
    setSelectedListId(list.id);
    setModalOpList(!isModalAddList);
  };

  const handleDeleteList = async (id) => {
    if (window.confirm("Deseja realmente deletar esta lista?")) { 
      await deleteList(id);
      await getTaskListPag(0);
    }
  };

  const handleSubmitList = async (e) => {
    e.preventDefault();
    await addTaskList(formNewList);
    await getTaskListPag(0);
    handleResetFormList();
    setModalOpList(false);
  };

  const handleResetFormList = () => {
    setFormNewList({
      name: "",
      category: "",
    });
    setLabelTaskList("Adicionar nova Lista");
    setEditList(false);
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
            <p className="item-number">{taskCount.todayTask}</p>
            <p
              className={classNames("task-type", {
                "task-type active": currentMenuPage === "today"
              })}
              onClick={() => {handleSelectedDate(getTodayDate()); setCurrentMenuPage("today");}}
            >
              Hoje
            </p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{taskCount.tomorrowTask}</p>
            <p
              className={classNames("task-type", {
                "task-type active": currentMenuPage === "tomorrow"
              })}
              onClick={() => {handleSelectedDate(getTomorrowDate()); setCurrentMenuPage("tomorrow");}}
            >
              Amanhã
            </p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{taskCount.nextTasks}</p>
            <p className={classNames("task-type", {
              "task-type active": currentMenuPage === "next"
            })} onClick={() => {handleSelectedDate("next"); setCurrentMenuPage("next");}}>
              Próximos
            </p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{taskCount.lateTasks}</p>
            <p className={classNames("task-type", {
              "task-type active": currentMenuPage === "late"
            })} onClick={() => {handleSelectedDate("late"); setCurrentMenuPage("late");}}>
              Atrasados
            </p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">{taskCount.deactivatedTasks}</p>
            <p
              className={classNames("task-type", {
                "task-type active": currentMenuPage === "trash"
              })}
              onClick={() => {handleSelectedDate("trash"); setCurrentMenuPage("trash");}}
            >
              Lixeira
            </p>
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
        {taskListPag.content.map((list) => (
          <li key={list.id}>
            <div className="item">
              <p className="item-number">{list.tasks}</p>
              <p
                className={classNames("task-type", {
                  "task-type active": currentMenuPage === "list" && selectedListId === list.id
                })}
                onClick={() => {handleSelectedDate(list.id); setCurrentMenuPage("list"); setSelectedListId(list.id)} }
              >
                {list.name}
              </p>
            </div>
            <div className="item-buttons">
              <button
                className="button-add"
                onClick={() => handleOpenEditList(list)}
              >
                <img src={edit} alt="Icone para Editar a Lista" />
              </button>
              <button className="button-add" onClick={() => handleDeleteList(list.id)}>
                <img src={del} alt="Icone para Deletar Lista" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagContent">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
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
                maxLength={100}
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
                maxLength={200}
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
            <button
              onClick={() => {
                handleAddTaskList();
                handleResetFormList();
              }}
            >
              X
            </button>
            <h2>{labelTaskList}</h2>
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
                maxLength={15}
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
              {isEditList == true ? (
                <button onClick={handleUpdateList}>Salvar</button>
              ) : (
                <button onClick={handleSubmitList}>Adicionar Lista</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
