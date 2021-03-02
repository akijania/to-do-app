import Axios from 'axios';

/* selectors */
export const getAllTasks = ({tasks}) => tasks.data;

/* action name creator */
const reducerName = 'tasks';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const LOAD_TASKS = createActionName('LOAD_TASKS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const loadTasks = (payload) => ({ payload, type: LOAD_TASKS });


/* thunk creators */
export const fetchPublishedTasks = (userId) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted({ name: 'LOAD_TASKS' }));

    Axios.get(`http://localhost:8000/tasks/${userId}`)
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

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_TASKS:
      return { ...statePart, data: [...action.payload] };
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
