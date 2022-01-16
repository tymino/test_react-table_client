import './table.sass';
import React from 'react';
import IData from '../../types/data';

interface ITableProps {
  colName: string[];
  list: IData[];
}

const Table: React.FC<ITableProps> = ({ colName, list }) => {
  const conditions: string[] = ['---', 'равно', 'содержит', 'больше', 'меньше'];
  const [selectColumnName, setSelectColumnName] = React.useState<string>(colName[0]);

  const [selectСondition, setSelectСondition] = React.useState<string | undefined>(conditions[0]);
  const [inputSearch, setInputSearch] = React.useState<string>('');

  const [pagination, setPagination] = React.useState<any>({
    currentPage: 1,
    visibleItemsPerPage: 3,
    allPages: Math.ceil(list.length / 3),
  });

  const [actualTableData, setActualTableData] = React.useState<IData[]>(list);

  const handleSelectColumnName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectColumnName(event.target.value);
  };

  const handleSelectСondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectСondition(event.target.value);
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  return (
    <div className="table-component">
      <div className="table-component__navigation">
        <div className="navigation__filter-column">
          <select value={selectColumnName} onChange={handleSelectColumnName}>
            {colName.slice(1).map((name: string, index) => (
              <option key={name + index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="navigation__filter-condition">
          <select value={selectСondition} onChange={handleSelectСondition}>
            {conditions.map((condition: string, index) => (
              <option key={condition + index} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>
        <div className="navigation__filter-search">
          <input type="text" value={inputSearch} onChange={handleInputSearch} />
        </div>
      </div>
      {actualTableData.length > 0 && (
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
            {actualTableData.map((item: IData) => (
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
