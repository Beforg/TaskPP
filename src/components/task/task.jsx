import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import edit from "../../assets/edt.png";
import del from "../../assets/del.png";
import res from "../../assets/res.png";
import done from "../../assets/done.png";
import "./task.css";
import classNames from "classnames";
import Pagination from "../pagination/pagination";

const TaskComponent = ({
  tasks,
  taskLists,
  updateTask,
  deactivateTask,
  currentPage,
  totalPages,
  onPageChange,
  updateTaskStatus,
  deleteTask,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalEditTask, setModalEditTask] = useState(false);
  const [formEditTask, setFormEditTask] = useState({
    title: "",
    description: "",
    date: "",
    idList: "",
  });
  const nodeRefs = useRef(
    tasks.reduce((acc, task) => {
      acc[task.id] = React.createRef();
      return acc;
    }, {})
  );

  const handleCheckTask = async (id) => {
    try {
      await updateTaskStatus(id);
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  };

  const handleTaskClick = (taskId) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  };

  const handleCheckboxChange = (id) => {
    console.log("Mudou", id);
    handleCheckTask(id);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };

  const handleEditClick = (task) => {
    setModalEditTask(!isModalEditTask);
    setFormEditTask({
      title: task.title,
      description: task.description,
      date: task.date,
      idList: task.idList || "",
    });
  };

  const handleChange = (e) => {
    setFormEditTask({
      ...formEditTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditTask = () => {
    console.log(formEditTask);
    updateTask(formEditTask, selectedTask);
    setModalEditTask(!isModalEditTask);
  };

  const handleDeactivateTask = () => {
    deactivateTask(selectedTask);
  };

  const handleDeleteTask = () => {
    if (window.confirm("Deseja excluir permanentemente a tarefa?")) {
      deleteTask(selectedTask);
    }
  };

  return (
    <ul id="task-list" key={tasks.length}>
      {tasks.length === 0 && <p id="no-tasks">Nenhuma tarefa encontrada.</p>}
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => handleTaskClick(task.id)}
          className={classNames("task-item", {
            completed: task.completed,
          })}
        >
          <div className="task-name">
            <div>
              {!task.deactivated && (
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(task.id);
                  }}
                  onClick={handleCheckboxClick}
                />
              )}
              <p
                className={classNames("task-title", {
                  "task-title-completed": task.completed,
                })}
              >
                {task.title}
              </p>
              {task.completed && (
                <span>
                  <img src={done} alt="Iconde de Concluído" />
                </span>
              )}
            </div>
            <p className="tag">
              <strong className="list-name-tag">Lista:</strong>{" "}
              {task.listName !== "" ? task.listName : "Sem lista"}
            </p>
          </div>
          <CSSTransition
            in={selectedTask === task.id}
            timeout={300}
            classNames="task-details"
            unmountOnExit
            nodeRef={nodeRefs.current[task.id]}
          >
            <div ref={nodeRefs.current[task.id]}>
              <p className="task-description">{task.description}</p>
              <div className="task-act">
                {task.deactivated ? (
                  <button
                    className="button-task"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeactivateTask();
                    }}
                  >
                    <img src={res} alt="Icone para tirar da lixeira" />
                  </button>
                ) : (
                  <button
                    className="button-task"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(task);
                    }}
                  >
                    <img src={edit} alt="Icone para Editar" />
                  </button>
                )}
                {task.deactivated ? (
                  <button
                    className="button-task"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask();
                    }}
                  >
                    <img src={del} alt="Icone para Excluir" />
                  </button>
                ) : (
                  <button
                    className="button-task"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeactivateTask();
                    }}
                  >
                    <img src={del} alt="Icone para Excluir" />
                  </button>
                )}
              </div>
            </div>
          </CSSTransition>
        </li>
      ))}
      {isModalEditTask && (
        <div className="add-overlay">
          <div className="add-content">
            <button onClick={handleEditClick}>X</button>
            <h2>Editando Tarefa</h2>
            <div className="add-inputs">
              <label htmlFor="add-inputs-title">Título</label>
              <input
                className="add-inputs-text"
                id="add-inputs-title"
                type="text"
                name="title"
                placeholder="Título"
                value={formEditTask.title}
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
                value={formEditTask.description}
                onChange={handleChange}
                maxLength={200}
              />
              <label htmlFor="add-inputs-date">Data</label>
              <input
                className="add-inputs-text"
                type="date"
                name="date"
                id="add-inputs-date"
                value={formEditTask.date}
                onChange={handleChange}
              />
              <label htmlFor="selected-list">Adicionar a Lista</label>
              <select
                className="add-inputs-text"
                name="idList"
                id="selected-list"
                value={formEditTask.idList}
                onChange={handleChange}
              >
                <option value="">Selecione uma lista</option>
                {taskLists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
              <button onClick={handleEditTask}>Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}
      {tasks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </ul>
  );
};

export default TaskComponent;
