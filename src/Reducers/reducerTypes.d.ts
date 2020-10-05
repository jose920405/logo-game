interface IGameReducerType {
  userName: string;
  score: seconds;
  dropZones: IDropZone[];
  exerciseFinished: boolean;
}

interface IDropZone {
  dropIndex: number;
  dragIndex?: number;
  dragLetter?: string;
  image?: string;
  validLetter: string;
}