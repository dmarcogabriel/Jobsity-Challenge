type IShowImage = {
  medium: string;
  original: string;
};

type IShowSchedule = {
  time: string;
  days: string[];
};

type IShow = {
  id: number;
  url: string;
  name: string;
  image?: IShowImage;
  genres: string[];
  schedule: IShowSchedule;
};

export type ISerie = {
  show: IShow;
};
