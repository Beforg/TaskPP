import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import edit from '../../assets/edt.png';
import del from '../../assets/del.png';
import {updateTask} from '../../services/taskService';
import "./task.css";

const TaskComponent = ({ tasks, taskLists, updateTask, deactivateTask }) => {  
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalEditTask, setModalEditTask] = useState(false);
  const [formEditTask, setFormEditTask] = useState({
    title: "",
    description: "",
    date: "",
    listId: "",
  })
  const nodeRefs = useRef(tasks.reduce((acc, task) => {
    acc[task.id] = React.createRef();
    return acc;
  }, {}));

  const handleTaskClick = (taskId) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  };

  const handleCheckboxChange = (id) => {
    console.log("Mudou", id);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  }

  const handleEditClick = (task) => {
    setModalEditTask(!isModalEditTask);
    setFormEditTask({
      title: task.title,
      description: task.description,
      date: task.date,
      listId: task.listId,
    })
  }

  const handleChange = (e) => {
    setFormEditTask({
      ...formEditTask,
      [e.target.name]: e.target.value,
    });
  }

  const handleEditTask = () => {
    console.log(formEditTask);
    updateTask(formEditTask, selectedTask);
    setModalEditTask(!isModalEditTask);
  }	

  const handleDeactivateTask = () => {
      deactivateTask(selectedTask);
  }

  return (
    <ul id="task-list">
      {tasks.map((task) => (
        <li key={task.id} onClick={() => handleTaskClick(task.id)} className="task-item">
          <div className="task-name">
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleCheckboxChange(task.id)} 
              onClick={handleCheckboxClick}
            />
            <p className="task-title">{task.title}</p>
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
                <button className="button-task" onClick={(e) => { e.stopPropagation(); handleEditClick(task)}}><img src={edit}/></button>
                <button className="button-task" onClick={(e) => { e.stopPropagation(); handleDeactivateTask()}}><img src={del}/></button>
              </div>
            </div>
          </CSSTransition>
        </li>
      ))}
      {isModalEditTask && (
        <div className="add-overlay">
          <div className="add-content">
            <button onClick={handleEditClick}>X</button>
            <h2>Editar Tarefa</h2>
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
                name="listId"
                id="selected-list"
                value={formEditTask.listId}
                onChange={handleChange}
              >
                <option value="">Selecione uma lista</option>
                {taskLists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-button" onClick={handleEditTask}>Editar</button>
          </div>
        </div>
      )}
    </ul>
  );
};

export default TaskComponent;