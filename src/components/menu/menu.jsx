import "./menu.css";
import addImg from "../../assets/add.png";
import { useState } from "react";

const MenuComponent = () => {
  const [isModalAddTask, setModalOpTask] = useState(false);
  const [formNewTask, setFormNewTask] = useState({
    title: "",
    description: "",
    date: "",
    completed: false,
    listId: 0,
  });
  const handleAddClick = () => {
    setModalOpTask(!isModalAddTask);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormNewTask({
      ...formNewTask,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formNewTask);
    setModalOpTask(false);
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
            <p className="task-numbitem-number">0</p>
            <p className="task-type">Hoje</p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">0</p>
            <p className="task-type">Amanhã</p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">0</p>
            <p className="task-type">Próximos</p>
          </div>
        </li>
        <li>
          <div className="item">
            <p className="item-number">0</p>
            <p className="task-type">Atrasados</p>
          </div>
        </li>
      </ul>
      <ul className="menu-list">
        <div className="title-add">
          <h3>Minhas Listas</h3>
          <button className="button-add">
            <img src={addImg} alt="Adicionar" />
          </button>
        </div>
        <li>
          <li>
            <div className="item">
              <p className="item-number">0</p>
              <p className="task-type">Casa</p>
            </div>
          </li>
        </li>
      </ul>
      {isModalAddTask && (
        <div className="add-overlay">
          <div className="add-content">
            <h2>Adicionar Nova Tarefa</h2>
            <div className="add-inputs">
                <label htmlFor="add-inputs-title">Título</label>
                <input 
                    className="add-inputs-text"
                    id="add-inputs-title"
                    type="text"
                    name="title"
                    placeholder="Título"
                    onChange={handleChange}
                />
                <label htmlFor="add-inputs-description">Descrição</label>
                <textarea
                    className="add-inputs-text"
                    id="add-inputs-description"
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    onChange={handleChange}
                />
                <label htmlFor="add-inputs-date">Data</label>
                <input
                    id="add-inputs-date"
                    type="date"
                    name="date"
                    onChange={handleChange}
                />
                <button onClick={handleAddClick}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
