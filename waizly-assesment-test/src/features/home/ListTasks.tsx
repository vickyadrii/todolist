import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';

import { Task } from '@/types/types';
import DialogDeleteTask from './DialogDeleteTask';
import DialogEditTask from './DialogEditTask';
import { Checkbox } from '@/components/ui/checkbox';

interface ListTaskProps {
  listTask: Task[];
  removeTodoList: (id: string) => void;
  handleEditTodoList: (data: Task, id: string) => void;
  handleMarkAsCompleted: (id: string, is_completed: boolean) => void;
}

const ListTasks = ({ listTask, handleEditTodoList, handleMarkAsCompleted, removeTodoList }: ListTaskProps) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      {listTask.length !== 0 ? (
        listTask.map((data) => (
          <Card
            key={data.id}
            className={`${data.is_completed ? 'bg-gray-100' : 'bg-white'} transition-all duration-200 ease-out`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={data.is_completed}
                      onCheckedChange={(value: boolean) => {
                        // setIsChecked(value);
                        handleMarkAsCompleted(data.id || '', value);
                      }}
                      className="w-6 h-6"
                    />
                    <div className='flex flex-col gap-1'>
                      <h2 className={`${data.is_completed ? 'line-through' : ''} text-lg`}>{data.title}</h2>
                      <p className='text-sm font-normal text-gray-700'>{dayjs(data.date).isValid() ? dayjs(data.date).format('DD MMMM YYYY') : '-'}</p>
                    </div>
                  </div>
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <DialogEditTask data={data} handleEditTodoList={handleEditTodoList} id={data.id || ''} />
                    <DialogDeleteTask removeTodoList={removeTodoList} id={data.id || ''} />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default ListTasks;
