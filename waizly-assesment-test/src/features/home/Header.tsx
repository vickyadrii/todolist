'use client';

import { useState } from 'react';


import { Task } from '@/types/types';
import DialogAddTask from './DialogAddTask';

interface HeaderProps {
  handleAddTodoList: (task: Task) => void;
}

const Header = ({ handleAddTodoList }: HeaderProps) => {
  

  return (
    <div className="flex justify-between items-center border-b p-5">
      <h1 className="text-2xl font-semibold">To-Do</h1>
      <DialogAddTask handleAddTodoList={handleAddTodoList} />
    </div>
  );
};

export default Header;
