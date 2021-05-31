/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./UserPage.module.scss";
import Login from "../Login/Login";
import { Link } from "react-router-dom";
import clsx from "clsx";

import {
  fetchPublishedTasks,
  addTaskRequest,
  removeTaskRequest,
  editTask,
  editTaskRequest,
} from "../../../redux/tasksRedux";

const UserPage = ({ className }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.data);
  const [taskName, setTaskName] = useState("");
  const [token, setToken] = useState("");

  const handleChangeTaskName = (event) => setTaskName(event.target.value);
  const handleChangeToken = (token) => setToken(token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    handleChangeToken(token);
    fetchPublishedTasks(token)(dispatch);
  }, []);

  const handleRemoveTask = (taskId) => {
    dispatch(removeTaskRequest(taskId));
  };

  const handleChangeTask = (id, event) => {
    let name = event.target.value;
    dispatch(editTask({ id, name }));
  };

  const submitForm = (event) => {
    const data = {
      task: taskName,
      userId: token,
    };
    event.preventDefault();
    dispatch(addTaskRequest(data));
    handleChangeTaskName("");
  };

  const handleEditTask = (event, id, task) => {
    event.preventDefault();
    dispatch(editTaskRequest({ id, task }));
  };
  if (!token) return <Login />;
  else
    return (
      <div className={clsx(className, styles.root)}>
        <section className={styles.tasksSection} id="tasks-section">
          <h2>Tasks</h2>

          <ul className={styles.tasksSection__list} id="tasks-list">
            {tasks === undefined || tasks.length < 1
              ? ""
              : tasks.map((task) => (
                  <li key={task.id}>
                    <form
                      className={styles.task}
                      id="add-task-form"
                      onSubmit={(event) =>
                        handleEditTask(event, task.id, task.task)
                      }
                    >
                      <input
                        className={styles.textInput}
                        autoComplete="off"
                        type="text"
                        placeholder={task.task}
                        id={task.id}
                        value={task.task}
                        onChange={(event) => handleChangeTask(task.id, event)}
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
                          onClick={() => handleRemoveTask(task.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </form>
                  </li>
                ))}
          </ul>

          <form id="add-task-form" onSubmit={(event) => submitForm(event)}>
            <input
              className={`${styles.textInput} ${styles.textInputAdd}`}
              autoComplete="off"
              type="text"
              placeholder="Type your description"
              id="task-name"
              value={taskName}
              onChange={(event) => handleChangeTaskName(event)}
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
};

UserPage.propTypes = {
  tasks: PropTypes.array,
  fetchPublishedTasks: PropTypes.func,
  addTaskRequest: PropTypes.func,
  removeTaskRequest: PropTypes.func,
  editTask: PropTypes.func,
  editTaskRequest: PropTypes.func,
};

export default UserPage;
