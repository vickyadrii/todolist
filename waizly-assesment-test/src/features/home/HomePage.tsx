'use client';

import { useEffect, useState } from 'react';

import Header from '@/features/home/Header';
import ListTasks from '@/features/home/ListTasks';
import { Task } from '@/types/types';
import { v4 as uuid } from 'uuid';

const HomePage = () => {
  const [listTask, setListTask] = useState<Task[]>(() => {
    const list = localStorage.getItem('todo-lists');
    return list ? JSON.parse(list) : [];
  });

  const handleAddTodoList = (data: Task) => {
    setListTask([...listTask, data]);
  };

  const removeTodoList = (id: string) => {
    setListTask(listTask.filter((list) => list.id !== id));
  };

  const handleEditTodoList = (data: Task, id: string) => {
    setListTask(
      listTask.map((list) => {
        if (list.id === id) {
          return { ...list, title: data.title };
        }
        return list;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('todo-lists', JSON.stringify(listTask));
  }, [listTask]);

  return (
    <div className="max-w-7xl m-auto p-5">
      <Header handleAddTodoList={handleAddTodoList} />
      <ListTasks listTask={listTask} removeTodoList={removeTodoList} handleEditTodoList={handleEditTodoList} />
    </div>
  );
};

export default HomePage;
