'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import AddTaskForm from './AddTaskForm';

import { Task } from '@/types/types';

interface HeaderProps {
  handleAddTodoList: (task: Task) => void;
}

const Header = ({ handleAddTodoList }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center border-b p-5">
      <h1 className="text-2xl font-semibold">To-Do</h1>
      <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
        <DialogTrigger asChild>
          <Button size="lg" className="flex items-center gap-1">
            <PlusIcon /> New Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Link</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
          <AddTaskForm handleOnOpenChange={handleOnOpenChange} handleAddTodoList={handleAddTodoList} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
