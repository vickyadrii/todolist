'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Task } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuid} from 'uuid';

const formSchema = z.object({
  id: z.string(),
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
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuid(), 
      title: '',
      date: ''
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
      title: 'Successfully!',
      description: 'Added data successfully!',
      duration: 2500
    });
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