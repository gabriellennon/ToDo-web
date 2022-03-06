import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle !== ''){
      const objectTask = {
        id: generateId(),
        title: newTaskTitle,
        isComplete: false,
      }
      setTasks((oldValue) => [
        ...oldValue,
        objectTask
      ]);

      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    //Como temos estados imutáveis, criei uma cópia e modifiquei o booleano para depois setá-lo no nosso estado global
    //We have imutable states, so i create a copy and modify the boolean to after change in the my global state
    const allTasks = [...tasks];
    allTasks.forEach((task) => {
      if(task.id === id){
        task.isComplete = !task.isComplete;
      }
    });

    setTasks([...allTasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
  }

  function generateId(){
    //Max number to o ID
    //número máximo que o id pode atingir
    const maxIdRangeNumber = Math.pow(10,10);
    //Generate ID
    let id = Math.floor(Math.random()* maxIdRangeNumber);

    //Verify if existing equal ID
    const taskWithSameId = tasks.find((task) => task.id === id);

    //Gerar outro ID caso exista
    //Generate other ID case existing
    if(taskWithSameId){
      id = generateId();
    }

    return id;

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}