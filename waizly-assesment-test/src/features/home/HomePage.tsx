'use client';

import { useEffect, useState } from 'react';

import Header from '@/features/home/Header';
import ListTasks from '@/features/home/ListTasks';
import { Task } from '@/types/types';

const HomePage = () => {
  const [listTask, setListTask] = useState<Task[]>(() => {
    const list = localStorage.getItem('todo-lists');
    return list ? JSON.parse(list) : [];
  });

  const handleAddTodoList = (data: Task) => {
    const { title, date } = data;

    setListTask([
      ...listTask,
      {
        title,
        date
      }
    ]);
  };

  useEffect(() => {
    localStorage.setItem('todo-lists', JSON.stringify(listTask));
  }, [listTask]);

  console.log(listTask);

  return (
    <div className="max-w-7xl m-auto p-5">
      <Header handleAddTodoList={handleAddTodoList} />
      <ListTasks listTask={listTask} />
    </div>
  );
};

export default HomePage;
