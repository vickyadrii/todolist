export interface Task {
  id?: string | undefined;
  title: string;
  date: string;
  is_completed?: boolean;
}

// export const

interface Clouds {
  description?: string;
  icon?: string;
  id?: number,
  main: string
}

export interface Weather {
  coord?: {
    dt?: number;
    id?: number;
  };
  id?: number;
  main?: {
    feels_like?: number;
    grnd_level?: number;
    humidity?: number;
    pressure?: number;
    sea_level?: number;
    temp?: number;
    temp_max?: number;
    temp_min?: number;
  };
  name?: string;
  sys?: {
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timezone?: number;
  visibility?: number;
  weather?: Clouds[],
  wind?: {
    deg?: number;
    gust?: number;
    speed?: number;
  };
}
