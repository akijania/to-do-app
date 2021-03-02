import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserPage.module.scss';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {
  getAllTasks,
  fetchPublishedTasks,
  addTaskRequest,
  removeTaskRequest,
  editTask,
  editTaskRequest,
} from '../../../redux/tasksRedux';

class Component extends React.Component {
  state = {
    taskName: '',
    token: '',
  };
  componentDidMount() {
    const { fetchPublishedTasks } = this.props;
    const token = localStorage.getItem('token');
    this.setState({
      token: token,
    });
    fetchPublishedTasks(token);
  }

  handleRemoveTask = (taskId) => {
    const { removeTaskRequest } = this.props;
    removeTaskRequest(taskId);
  };

  handleChange(event) {
    this.setState({
      taskName: event.target.value,
    });
  }
  handleChangeTask(id, event) {
    const { editTask } = this.props;
    let name = event.target.value;
    editTask({id, name});

  }

  submitForm(event) {
    const { taskName, token } = this.state;
    const { addTaskRequest } = this.props;
    const data = {
      task: taskName,
      userId: token,
    };
    event.preventDefault();
    addTaskRequest(data);
    this.setState({
      taskName: '',
    });
  }
  updateTask(updatedTasks) {
    this.setState({
      tasks: updatedTasks,
    });
  }
  editTask(event, id, task) {
    const { editTaskRequest } = this.props;
    event.preventDefault();
    editTaskRequest({id, task});
  
    
  }

  render() {
    const { taskName, className, token } = this.state;
    const { tasks } = this.props;
    if (!token) return <Login />;
    else
      return (
        <div className={clsx(className, styles.root)}>
          <section className={styles.tasksSection} id="tasks-section">
            <h2>Tasks</h2>

            <ul className={styles.tasksSection__list} id="tasks-list">
              {tasks === undefined || tasks.length < 1
                ? ''
                : tasks.map((task) => (
                  <li key={task.id}>
                    <form className={styles.task}
                      id="add-task-form"
                      onSubmit={(event) =>
                        this.editTask(event, task.id, task.task)
                      }
                    >
                      <input
                        className={styles.textInput}
                        autoComplete="off"
                        type="text"
                        placeholder={task.task}
                        id={task.id}
                        value={task.task}
                        onChange={(event) =>
                          this.handleChangeTask(task.id, event)
                        }
                      />
                      <div>
                        <button
                          className={`${styles.btn} ${styles.btnGray}`}
                          type="submit"
                        >
                          Save
                        </button>
                        <button
                          className={`${styles.btn} ${styles.btnRed}`}
                          onClick={() => this.handleRemoveTask(task.id)}
                        >
                          Remove
                        </button>
                      </div>
            
                    </form>
                  </li>
                ))}
            </ul>

            <form
              id="add-task-form"
              onSubmit={(event) => this.submitForm(event)}
            >
              <input
                className={`${styles.textInput} ${styles.textInputAdd}`}
                autoComplete="off"
                type="text"
                placeholder="Type your description"
                id="task-name"
                value={taskName}
                onChange={(event) => this.handleChange(event)}
              />
              <button className={styles.btn} type="submit">
                Add
              </button>
            </form>
            <Link to="/">
              <button
                className={`${styles.btn} ${styles.btnGray}`}
                onClick={() => localStorage.clear()}
              >
                Logout
              </button>
            </Link>
          </section>
        </div>
      );
  }
}
Component.propTypes = {
  tasks: PropTypes.array,
  fetchPublishedTasks: PropTypes.func,
  addTaskRequest: PropTypes.func,
  removeTaskRequest: PropTypes.func,
  editTask: PropTypes.func,
  editTaskRequest: PropTypes.func,
};

const mapStateToProps = (state) => ({
  tasks: getAllTasks(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedTasks: (token) => dispatch(fetchPublishedTasks(token)),
  addTaskRequest: (task) => dispatch(addTaskRequest(task)),
  removeTaskRequest: (id) => dispatch(removeTaskRequest(id)),
  editTask: (value) => dispatch(editTask(value)),
  editTaskRequest: (value) => dispatch(editTaskRequest(value)),
  
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as UserPage, Component as UserPageComponent };
