import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';

import { Task } from '@/types/types';
import DialogDeleteTask from './DialogDeleteTask';
import DialogEditTask from './DialogEditTask';

interface ListTaskProps {
  listTask: Task[];
  removeTodoList: (id: string) => void;
  handleEditTodoList: (data: Task, id: string) => void;
}

const ListTasks = ({ listTask, handleEditTodoList, removeTodoList }: ListTaskProps) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      {listTask.length !== 0 ? (
        listTask.map((data, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription>
                {dayjs(data.date).isValid() ? dayjs(data.date).format('DD MMMM YYYY') : '-'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>this is a content!</p>
                <div className="flex items-center gap-4">
                  <DialogEditTask data={data} handleEditTodoList={handleEditTodoList} id={data.id || ''} />
                  <DialogDeleteTask removeTodoList={removeTodoList} id={data.id || ''} />
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
