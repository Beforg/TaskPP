import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./task.css";

const TaskComponent = () => {  
  const [selectedTask, setSelectedTask] = useState(null);  
  const tasks = [
    {
        id: 1,
        title: "Estudar React",
        description: "Aprender sobre componentes, props e state.",
        completed: false,
      },
      {
        id: 2,
        title: "Praticar JavaScript",
        description: "A programação é uma habilidade essencial no mundo digital. Estudar tecnologias como Java, Python e C# pode abrir muitas portas, tanto para quem busca uma carreira sólida quanto para projetos pessoais.",
        completed: true,
      }
  ]
  const handleTaskClick = (taskId) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  }
  return (
    <ul id="task-list">
      {tasks.map((task) => (
              <li key={task.id} onClick={() => handleTaskClick(task.id)} className="task-item">
              <div className="task-name">
                <input type="checkbox" checked={task.completed}/>
                <p className="task-title">{task.title}</p>
              </div>
              {/* {selectedTask === task.id && (
                <>
                <div>
                <p className="task-description">
                    {task.description}
                </p>
                <div className="task-act">
                    <button className="button-task">Editar</button>
                    <button className="button-task">Excluir</button>
                    <button className="button-task">Lista</button>
                </div>
              </div>
                </>
              )} */}
            <CSSTransition
            in={selectedTask === task.id}
            timeout={300}
            classNames="task-details"
            unmountOnExit
          >
            <div>
              <p className="task-description">{task.description}</p>
              <div className="task-act">
                <button className="button-task">Editar</button>
                <button className="button-task">Excluir</button>
                <button className="button-task">Lista</button>
              </div>
            </div>
          </CSSTransition>
            </li>
      ))}  
    </ul>
  );
};

export default TaskComponent;
