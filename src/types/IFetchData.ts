import IData from './data';

export interface ITableColName {
  name: string;
  key: string;
  isSorted: boolean;
  sortedStatus: string;
  isFiltered: boolean;
}

export interface ITableColNameSQL {
  name: string;
  key: string;
  issorted: boolean;
  sortedstatus: string;
  isfiltered: boolean;
}

export interface IFetchDataSQL {
  header: ITableColNameSQL[];
  body: IData[];
}

export interface IFetchData {
  header: ITableColName[];
  body: IData[];
}
