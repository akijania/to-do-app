import Axios from 'axios';

/* selectors */
export const getAllTasks = ({ tasks }) => tasks.data;

/* action name creator */
const reducerName = 'tasks';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const LOAD_TASKS = createActionName('LOAD_TASKS');
const ADD_TASK = createActionName('ADD_TASK');
const REMOVE_TASK = createActionName('REMOVE_TASK');
const EDIT_TASK = createActionName('EDIT_TASK');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

export const loadTasks = (payload) => ({ payload, type: LOAD_TASKS });
export const addTask = (payload) => ({ payload, type: ADD_TASK });
export const removeTask = (payload) => ({ payload, type: REMOVE_TASK });
export const editTask = (payload) => ({ payload, type: EDIT_TASK });

export const API_URL = (process.env.NODE_ENV === 'production') ? '/tasks' : 'http://localhost:8000/tasks';

/* thunk creators */
export const fetchPublishedTasks = (userId) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted({ name: 'LOAD_TASKS' }));

    Axios.get(`${API_URL}/${userId}`)
      .then((res) => {
        dispatch(loadTasks(Object.values(res.data)));
        dispatch(fetchSuccess({ name: 'LOAD_TASKS' }));
      })
      .catch((err) => {
        dispatch(
          fetchError({ name: 'LOAD_TASKS', error: err.message || true })
        );
      });
  };
};
export const addTaskRequest = (data) => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'ADD_TASK' }));
    try {
      await Axios.post(`${API_URL}`, data).then((res) => {
        dispatch(addTask(res.data));
        dispatch(fetchSuccess({ name: 'ADD_TASK' }));
      });
    } catch (err) {
      dispatch(fetchError({ name: 'ADD_TASK', error: err.message || true }));
    }
  };
};
export const removeTaskRequest = (id) => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'ADD_TASK' }));
    try {
      await Axios.delete(`${API_URL}/${id}`);
      dispatch(removeTask(id));
      dispatch(fetchSuccess({ name: 'ADD_TASK' }));
    } catch (err) {
      dispatch(fetchError({ name: 'ADD_TASK', error: err.message || true }));
    }
  };
};
export const editTaskRequest = (data) => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: 'EDIT_TASK' }));
    try {
      await Axios.put(`${API_URL}/${data.id}`, data);
      dispatch(fetchSuccess({ name: 'EDIT_TASK' }));
    } catch (err) {
      dispatch(fetchError({ name: 'EDIT_TASK', error: err.message || true }));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_TASKS:
      return { ...statePart, data: [...action.payload] };
    case ADD_TASK:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case REMOVE_TASK:
      return {
        ...statePart,
        data: statePart.data.filter((task) => task.id !== action.payload),
      };
    case EDIT_TASK: {
      const newStatePart = statePart.data.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            task: action.payload.name,
          };       
        }
        return item;
      });
      return {
        data: newStatePart,
      };
    }
    case FETCH_START: {
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            active: false,
            error: false,
          },
          data: action.payload,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            active: false,
            error: action.payload,
          },
        },
      };
    }
    default:
      return statePart;
  }
};
