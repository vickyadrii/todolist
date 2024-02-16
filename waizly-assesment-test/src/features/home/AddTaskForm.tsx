'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Task } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.'
    })
    .max(50),
  date: z.string()
});

interface Props {
  handleOnOpenChange: () => void;
  handleAddTodoList: (task: Task) => void;
}

const AddTaskForm = ({ handleOnOpenChange, handleAddTodoList }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: ''
    }
  });

  const handleOnSubmit = (values: z.infer<typeof formSchema>) => {
    const existingData = localStorage.getItem('todo-lists');
    const existingArray = existingData ? JSON.parse(existingData) : [];

    existingArray.push(values);
    localStorage.setItem('todo-lists', JSON.stringify(existingArray));

    form.reset({
      date: '',
      title: ''
    });
    handleAddTodoList(values);
    handleOnOpenChange();
  };

  return (
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
  );
};

export default AddTaskForm;
