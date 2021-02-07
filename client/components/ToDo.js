import React, { Component } from 'react';
import ToDoTasks from './ToDoTasks';
import ToDoComplete from './ToDoComplete';
import ToDoNewTasks from './ToDoNewTasks';

const ToDo = () =>  {
  return (
    <div>
      <ToDoTasks />
      <ToDoComplete />
      <ToDoNewTasks />
    </div>
  )
}

export default ToDo;