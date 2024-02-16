import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';

import { Task } from '@/types/types';

interface ListTaskProps {
  listTask: Task[];
}

const ListTasks = ({ listTask }: ListTaskProps) => {
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
              <div className="">
                <p>this is a content!</p>
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
