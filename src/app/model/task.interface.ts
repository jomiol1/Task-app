export interface IResponse<T>{
  statusCode: number;
  message: string;
  data: T;
}

export interface ITaskResponse extends ITaskRequest{
    id: number;
  }

  export interface ITaskRequest {
    description: string;
    creationDate: Date;
  }





