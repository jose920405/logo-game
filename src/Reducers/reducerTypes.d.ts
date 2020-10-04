interface IGameReducerType {
  lastAction: import('./Game/GameActionTypes').default;
  userName: string;
  score: seconds;
  dropZones: IDropZone[];
}

interface IDropZone {
  dropIndex: number;
  dragIndex?: number;
  image?: string;
}