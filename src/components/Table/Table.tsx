import './style/table.sass';
import React from 'react';
import IData from '../../types/data';
import { ITableColName } from '../App';

interface ITableProps {
  colName: ITableColName[];
  list: IData[];
}

interface IPagination {
  currentPage: number;
  visibleItemsPerPage: number;
  allPages: number;
}

enum Condition {
  None = '---',
  Equal = 'равно',
  Contains = 'содержит',
  More = 'больше',
  Less = 'меньше',
}

const Table: React.FC<ITableProps> = ({ colName, list }) => {
  // local table data
  const [localTableData, setLocalTableData] = React.useState<IData[]>(list);
  const [actualTableData, setActualTableData] = React.useState<IData[]>([]);

  const conditions: string[] = [
    Condition.None,
    Condition.Equal,
    Condition.Contains,
    Condition.More,
    Condition.Less,
  ];
  const [selectColumnName, setSelectColumnName] = React.useState<ITableColName>(colName[1]);

  const [selectСondition, setSelectСondition] = React.useState<string | undefined>(conditions[0]);
  const [inputSearch, setInputSearch] = React.useState<string>('');

  // pagination
  const [visibleItemsPerPage, setVisibleItemsPerPage] = React.useState<number>(3);
  const [pagination, setPagination] = React.useState<IPagination>({
    currentPage: 1,
    visibleItemsPerPage,
    allPages: Math.ceil(localTableData.length / visibleItemsPerPage),
  });

  const preparateTableData = () => {
    let newList: IData[] = [];

    if (selectСondition === Condition.Equal) {
      newList = list.filter((item: any) => String(item[selectColumnName.value]) === inputSearch);
      setLocalTableData(newList);
    }
  };

  // handleFunc
  const handleSelectColumnName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const actualColName = colName.find((obj) => obj.value === event.target.value);

    if (actualColName) setSelectColumnName(actualColName);
  };

  const handleSelectСondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectСondition(event.target.value);
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
    setSelectСondition(conditions[0]);
  };

  const handleChangePaginationPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination({ ...pagination, currentPage: Number(event.target.value) });
  };

  const handleClickButtonPrev = () => {
    if (pagination.currentPage > 1) {
      setPagination({ ...pagination, currentPage: --pagination.currentPage });
    }
  };

  const handleClickButtonNext = () => {
    if (pagination.currentPage < pagination.allPages) {
      setPagination({ ...pagination, currentPage: ++pagination.currentPage });
    }
  };

  // useEffetct
  React.useEffect(() => {
    console.log('confition');
    preparateTableData();
  }, [selectСondition]);

  React.useEffect(() => {
    const endPage = pagination.visibleItemsPerPage * pagination.currentPage;
    const startPage =
      pagination.visibleItemsPerPage * pagination.currentPage - pagination.visibleItemsPerPage;

    setActualTableData(localTableData.slice(startPage, endPage));
  }, [localTableData, pagination]);

  return (
    <div className="table-component">
      {actualTableData.length > 0 && (
        <div className="table-component__navigation">
          <div className="navigation__filter-column">
            <select value={selectColumnName.value} onChange={handleSelectColumnName}>
              {colName.slice(1).map(({ name, value }) => (
                <option key={name} value={value}>
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
          <div className="navigation__pagination">
            <button
              className="navigation__pagination-button-prev"
              onClick={handleClickButtonPrev}
              disabled={pagination.currentPage <= 1 ? true : false}>
              Prev
            </button>
            <select value={pagination.currentPage} onChange={handleChangePaginationPage}>
              {Array(pagination.allPages)
                .fill(0)
                .map((_, index) => (
                  <option key={index}>{index + 1}</option>
                ))}
            </select>
            <button
              className="navigation__pagination-button-next"
              onClick={handleClickButtonNext}
              disabled={pagination.currentPage >= pagination.allPages ? true : false}>
              Next
            </button>
          </div>
        </div>
      )}
      {actualTableData.length > 0 && (
        <table className="table-component__table" cellSpacing="0">
          <thead className="table-component__thead">
            <tr className="table-component__tr">
              {colName.map(({ name }, index) => (
                <th className="table-component__th" key={name}>
                  {name}
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
