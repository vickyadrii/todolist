'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Task } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Pencil1Icon } from '@radix-ui/react-icons';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.'
    })
    .max(50),
  date: z.string()
});

interface DialogEditTaskProps {
  data: Task;
  handleEditTodoList: (data: Task, id: string) => void;
  id: string
}

const DialogEditTask = ({ data, handleEditTodoList, id }: DialogEditTaskProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dataTask, setDataTask] = useState<Task>(data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: dataTask.title,
      date: '',
    }
  });

  const handleOnOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    form.reset({ date: '' }); 
    handleEditTodoList(values, id);
    handleOnOpenChange();

    toast({
      title: 'Success!',
      description: 'Edit data successfully!',
      duration: 2500
    });
    window.location.reload();
  };

  useEffect(() => {
    setDataTask(data);
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary" className="bg-green-600 hover:bg-green-700">
          <Pencil1Icon className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit To-Do List</DialogTitle>
        </DialogHeader>
        <DialogDescription>Edit your to-do list :)</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Input your title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditTask