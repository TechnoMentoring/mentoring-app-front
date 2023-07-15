export interface Request {
    idRequest: number;
    idSchedule: number;
    idUser: number;
    title: string;
    date: Date;
    hour: Date;
    description: string;
    status: string;
    isPaid?: any;
  }
  