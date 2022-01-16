import './table.sass';
import React from 'react';
import IData from '../../types/data';

interface ITableProps {
  colName: string[];
  list: IData[];
}

const Table: React.FC<ITableProps> = ({ colName, list }) => {
  return (
    <div className="table-component">
      {list.length > 0 && (
        <table className="table-component__table" cellSpacing="0">
          <thead className="table-component__thead">
            <tr className="table-component__tr">
              {colName.map((title: string, index) => (
                <th className="table-component__th" key={title + index}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-component__tbody">
            {list.map((item: IData) => (
              <tr className="table-component__tr" key={item.id}>
                {(Object.keys(item) as Array<keyof typeof item>).map((value, index) => {
                  if (/id/gi.test(value)) return null;

                  return (
                    <td className="table-component__td" key={value + index}>
                      {item[value]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
