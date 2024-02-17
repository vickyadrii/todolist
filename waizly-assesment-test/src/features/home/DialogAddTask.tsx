'use client';

import { useState } from 'react';
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
import { PlusIcon } from '@radix-ui/react-icons';
import { v4 as uuid } from 'uuid';

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.'
    })
    .max(50),
  date: z.string(),
  is_completed: z.boolean()
});

interface DialogAddTaskProps {
  handleAddTodoList: (task: Task) => void;
}

const DialogAddTask = ({ handleAddTodoList }: DialogAddTaskProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnOpenChange = () => {
    setIsOpen(!isOpen);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuid(),
      title: '',
      date: '',
      is_completed: false
    }
  });

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    form.reset({
      date: '',
      title: ''
    });
    handleAddTodoList(values);
    handleOnOpenChange();

    toast({
      title: 'Success!',
      description: 'Added data successfully!',
      duration: 2500
    });
  };

  return (
    <div className='px-5 pt-5'>
      <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
        <DialogTrigger asChild>
          <Button size="lg" className="flex items-center gap-1">
            <PlusIcon /> New Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add To-Do List</DialogTitle>
          </DialogHeader>
          <DialogDescription>Add your to-do list :)</DialogDescription>
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
    </div>
  );
};

export default DialogAddTask;
