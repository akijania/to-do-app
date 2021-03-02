import React from 'react';
import {shallow} from 'enzyme';
import {UserPageComponent} from './UserPage';

describe('Component UserPage', () => {
    
  it('should render without crashing', () => {
    const tasks = [];
    const fetchPublishedTasks = () =>{};
    const addTaskRequest = () =>{};
    const removeTaskRequest = () =>{};
    const editTask = () =>{};
    const editTaskRequest = () =>{};
    const component = shallow(<UserPageComponent tasts={tasks} fetchPublishedTasks={fetchPublishedTasks} addTaskRequest={addTaskRequest} removeTaskRequest={removeTaskRequest} editTask={editTask} editTaskRequest={editTaskRequest} />);
    expect(component).toBeTruthy();
  });
  it('should return empty object if called without required props', () => {
    const fetchPublishedTasks = () =>{};
    const addTaskRequest = () =>{};
    const removeTaskRequest = () =>{};
    const editTask = () =>{};
    const editTaskRequest = () =>{};
    const component = shallow(<UserPageComponent fetchPublishedTasks={fetchPublishedTasks} addTaskRequest={addTaskRequest} removeTaskRequest={removeTaskRequest} editTask={editTask} editTaskRequest={editTaskRequest}/>);
    expect(component).toEqual({});
  });
  it('should render Login when there is no token', () => {
    const tasks = [{id:123, task:'abc'},{id:123, task:'abc'},{id:124, task:'abc'}];
    const fetchPublishedTasks = () =>{};
    const addTaskRequest = () =>{};
    const removeTaskRequest = () =>{};
    const editTask = () =>{};
    const editTaskRequest = () =>{};
    const component = shallow(<UserPageComponent tasts={tasks} fetchPublishedTasks={fetchPublishedTasks} addTaskRequest={addTaskRequest} removeTaskRequest={removeTaskRequest} editTask={editTask} editTaskRequest={editTaskRequest}/>);
    const Login = component.find('Login');
    expect(Login.length).toEqual(1);
  });
});