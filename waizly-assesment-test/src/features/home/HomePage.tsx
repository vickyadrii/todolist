'use client';

import { useEffect, useState } from 'react';

import Header from '@/features/home/Header';
import ListTasks from '@/features/home/ListTasks';
import { Task, Weather } from '@/types/types';
import { useToast } from '@/components/ui/use-toast';
import DialogAddTask from './DialogAddTask';

interface HomePageProps {
  dataWeather: Weather;
}

const HomePage = ({ dataWeather }: HomePageProps) => {
  const { toast } = useToast();
  const [listTask, setListTask] = useState<Task[]>([]);

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

  const handleMarkAsCompleted = (id: string, is_completed: boolean) => {
    setListTask(
      listTask.map((list) => {
        if (list.id === id) {
          return { ...list, is_completed };
        }
        return list;
      })
    );

    if (is_completed) {
      toast({
        title: 'Success!',
        description: 'Mark as completed successfully!',
        duration: 2500
      });
    }
  };

  useEffect(() => {
    const list = localStorage.getItem('todo-lists');
    const parsedlist = list ? JSON.parse(list) : [];
    if (parsedlist.length !== 0) {
      setListTask(parsedlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-lists', JSON.stringify(listTask));
  }, [listTask]);

  return (
    <div className="max-w-7xl m-auto p-5">
      <Header dataWeather={dataWeather} />
      <DialogAddTask handleAddTodoList={handleAddTodoList} />
      <ListTasks
        listTask={listTask}
        removeTodoList={removeTodoList}
        handleEditTodoList={handleEditTodoList}
        handleMarkAsCompleted={handleMarkAsCompleted}
      />
    </div>
  );
};

export default HomePage;
