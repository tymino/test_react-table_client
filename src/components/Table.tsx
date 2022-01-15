import React from 'react';
import IData from '../types/data';

interface ITableProps {
  data: IData[];
}

const Table: React.FC<ITableProps> = ({ data }) => {
  return <div className="table">{data[0].title}</div>;
};

export default Table;
