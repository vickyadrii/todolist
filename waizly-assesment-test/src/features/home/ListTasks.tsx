import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';

import { Task } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import DialogDeleteTask from './DialogDeleteTask';

interface ListTaskProps {
  listTask: Task[];
  removeTodoList: (id: number) => void;
}

const ListTasks = ({ listTask, removeTodoList }: ListTaskProps) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      {listTask.length !== 0 ? (
        listTask.map(({ title, date }, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{dayjs(date).isValid() ? dayjs(date).format('DD MMMM YYYY') : '-'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>this is a content!</p>
                <div className="flex items-center gap-4">
                  <Button size="icon" variant="secondary" className="bg-green-600 hover:bg-green-700">
                    <Pencil1Icon className="text-white" />
                  </Button>
                  <DialogDeleteTask removeTodoList={removeTodoList} id={index} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default ListTasks;
