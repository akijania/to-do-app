import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserPage.module.scss';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getAllTasks, fetchPublishedTasks, addTaskRequest, removeTaskRequest } from '../../../redux/tasksRedux';

class Component extends React.Component {
  state = {
    tasks: [],
    taskName: '',
    token: '',
  };
  componentDidMount() {
    const {fetchPublishedTasks} = this.props;
    const token = localStorage.getItem('token');
    this.setState({
      token: token,
    });
    fetchPublishedTasks(token);
  }

  handleRemoveTask = (taskId) => {
    const {removeTaskRequest} = this.props;
    removeTaskRequest(taskId);
  }

  handleChange(event) {
    this.setState({
      taskName: event.target.value,
    });
  }
  handleChangeTask(taskId, event) {
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            name: event.target.value,
          };
        }
        return { ...task };
      }),
    });
  }

  submitForm(event) {
    const { taskName, token } = this.state;
    const {addTaskRequest} = this.props;
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
  editTask(event, taskId, taskName) {
    event.preventDefault();
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            name: taskName,
          };
        }
        return { ...task };
      }),
      taskName: '',
    });
  }

  render() {
    const { taskName, className, token } = this.state;
    const {tasks} = this.props;
    console.log('taski', tasks);
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
                  <li key={task.id} className={styles.task}>
                    <form
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
                        id="task-name"
                        value={task.task}
                        onChange={(event) =>
                          this.handleChangeTask(task.id, event)
                        }
                      />

                      <button
                        className={`${styles.btn} ${styles.btnRed}`}
                        onClick={() => this.handleRemoveTask(task.id)}
                      >
                          Remove
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnGray}`}
                        type="submit"
                      >
                          Edit
                      </button>
                    </form>
                  </li>
                ))}
            </ul>

            <form
              id="add-task-form"
              onSubmit={(event) => this.submitForm(event)}
            >
              <input
                className={styles.textInput}
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
};

const mapStateToProps = (state) => ({
  tasks: getAllTasks(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedTasks: (token) => dispatch(fetchPublishedTasks(token)),
  addTaskRequest: (task) => dispatch(addTaskRequest(task)),
  removeTaskRequest: (id) => dispatch(removeTaskRequest(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as UserPage, Component as UserPageComponent };

