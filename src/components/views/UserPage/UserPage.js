import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './UserPage.module.scss';
import clsx from 'clsx';


class UserPage extends React.Component {
  state = {
    tasks: [],
    taskName: '',
  };

  removeTask = (taskId) => {
    const { tasks } = this.state;
    const tasksList = tasks.filter(task => task.id !== taskId );
    this.setState({
      tasks: tasksList,
    });
  };
  handleRemoveTask(taskId) {
    this.removeTask(taskId);
  }

  handleChange(event) {
    this.setState({
      taskName: event.target.value,
    });
  }
  addTask(taskId, taskName) {
    const { tasks } = this.state;
    this.setState({
      tasks: [...tasks, { id: taskId, name: taskName }],
      taskName: '',
    });
  }
  submitForm(event) {
    const { taskName } = this.state;
    const taskId = uuidv4();
    event.preventDefault();
    this.addTask(taskId, taskName);
  }
  updateTask(updatedTasks) {
    this.setState({
      tasks: updatedTasks,
    });
  }

  render() {
    const { tasks, taskName, className } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        <section className={styles.tasksSection} id='tasks-section'>
          <h2>Tasks</h2>

          <ul className={styles.tasksSection__list} id='tasks-list'>
            {tasks === undefined || tasks.length < 1
              ? ''
              : tasks.map((task) => (
                <li key={task.id} className={styles.task}>
                  {task.name}
                  <button
                    className={`${styles.btn} ${styles.btnRed}`}
                    onClick={() => this.handleRemoveTask(task.id)}
                  >
                      Remove
                  </button>
                </li>
              ))}
          </ul>

          <form id='add-task-form' onSubmit={(event) => this.submitForm(event)}>
            <input
              className={styles.textInput}
              autoComplete='off'
              type='text'
              placeholder='Type your description'
              id='task-name'
              value={taskName}
              onChange={(event) => this.handleChange(event)}
            />
            <button className={styles.btn} type='submit'>
              Add
            </button>
          </form>
          <button className={`${styles.btn} ${styles.btnGray}`}>
              Logout
          </button>
        </section>
      </div>
    );
  }
}

export default UserPage;
