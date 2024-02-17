'use client';

import { useCallback, useEffect, useState } from 'react';

import Header from '@/features/home/Header';
import ListTasks from '@/features/home/ListTasks';
import { Task, Weather } from '@/types/types';
import { useToast } from '@/components/ui/use-toast';
import DialogAddTask from './DialogAddTask';
import { Input } from '@/components/ui/input';

interface HomePageProps {
  dataWeather: Weather;
}

const HomePage = ({ dataWeather }: HomePageProps) => {
  const { toast } = useToast();
  const [listTask, setListTask] = useState<Task[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [filteredList, setFilteredList] = useState<Task[]>(listTask);

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

  const handleSearch = useCallback(() => {
    const filteredData = listTask.filter((list) => {
      return list.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredList(filteredData);
  }, [listTask, keyword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [handleSearch]);

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
      <div className="p-5 flex items-center justify-between gap-2">
        <DialogAddTask handleAddTodoList={handleAddTodoList} />
        <Input type="search" onChange={(e) => setKeyword(e.target.value)} className="w-1/5 py-5" placeholder="Search..." />
      </div>
      <ListTasks
        listTask={keyword.length > 0 ? filteredList : listTask}
        removeTodoList={removeTodoList}
        handleEditTodoList={handleEditTodoList}
        handleMarkAsCompleted={handleMarkAsCompleted}
      />
    </div>
  );
};

export default HomePage;
