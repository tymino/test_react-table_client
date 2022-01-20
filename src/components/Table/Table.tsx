import './style/table.sass';
import React from 'react';
import IData from '../../types/data';
import { ITableColName } from '../App';

interface ITableProps {
  title: string;
  colNameData: ITableColName[];
  listData: IData[];
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
enum SortedName {
  None = 'none',
  Increase = 'increase',
  Decrease = 'decrease',
}

const Table: React.FC<ITableProps> = ({ title, colNameData, listData }) => {
  const conditions: string[] = [
    Condition.None,
    Condition.Equal,
    Condition.Contains,
    Condition.More,
    Condition.Less,
  ];
  const sortedStatusName: string[] = [SortedName.None, SortedName.Increase, SortedName.Decrease];

  const [columnName, setColumnName] = React.useState<ITableColName[]>(colNameData);
  // local table data
  const [localTableData, setLocalTableData] = React.useState<IData[]>(listData);
  const [actualTableData, setActualTableData] = React.useState<IData[]>([]);

  const [selectColumnName, setSelectColumnName] = React.useState<ITableColName>(colNameData[1]);
  const [inputSearch, setInputSearch] = React.useState<string>('');
  const [selectСondition, setSelectСondition] = React.useState<string>(conditions[0]);

  // pagination
  const [visibleItemsPerPage] = React.useState<number>(7);
  const [pagination, setPagination] = React.useState<IPagination>({
    currentPage: 1,
    visibleItemsPerPage,
    allPages: Math.ceil(listData.length / visibleItemsPerPage),
  });

  const filteredTableData = (actualCondition: string) => {
    let newList: IData[] = [];

    switch (actualCondition) {
      case Condition.Equal: {
        newList = listData.filter((item: IData) => String(item[selectColumnName.value]) === inputSearch);
        setLocalTableData(newList);
        setPagination({
          ...pagination,
          currentPage: 1,
          allPages: Math.ceil(newList.length / visibleItemsPerPage),
        });
        return;
      }

      case Condition.Contains: {
        newList = listData.filter((item: IData) => {
          const searchReg = new RegExp(inputSearch);
          return searchReg.test(String(item[selectColumnName.value]));
        });
        setLocalTableData(newList);
        setPagination({
          ...pagination,
          currentPage: 1,
          allPages: Math.ceil(newList.length / visibleItemsPerPage),
        });
        return;
      }

      case Condition.More: {
        newList = listData.filter((item: IData) => {
          return item[selectColumnName.value] > Number(inputSearch);
        });
        setLocalTableData(newList);
        setPagination({
          ...pagination,
          currentPage: 1,
          allPages: Math.ceil(newList.length / visibleItemsPerPage),
        });
        return;
      }

      case Condition.Less: {
        newList = listData.filter((item: IData) => {
          return item[selectColumnName.value] < Number(inputSearch);
        });
        setLocalTableData(newList);
        setPagination({
          ...pagination,
          currentPage: 1,
          allPages: Math.ceil(newList.length / visibleItemsPerPage),
        });
        return;
      }

      default: {
        setLocalTableData(listData);
        setPagination({
          ...pagination,
          currentPage: 1,
          allPages: Math.ceil(listData.length / visibleItemsPerPage),
        });
        return;
      }
    }
  };

  // handleFunc
  const handleSelectColumnName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const actualColName = columnName.find((obj) => obj.value === event.target.value);

    if (actualColName) {
      filteredTableData(conditions[0]);
      setSelectColumnName(actualColName);
      setInputSearch('');
      setSelectСondition(conditions[0]);
    }
  };

  const handleSelectСondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filteredTableData(event.target.value);
    setSelectСondition(event.target.value);
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
    setSelectСondition(conditions[0]);
    filteredTableData(conditions[0]);
  };
  const handleClickSearchClear = () => {
    filteredTableData(conditions[0]);
    setSelectСondition(conditions[0]);
    setInputSearch('');
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

  const handleClickColumnName = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget.title;

    const updateColumns = columnName.map((col) => {
      if (col.name === target) {
        switch (col.sortedStatus) {
          case SortedName.Increase:
            return { ...col, sortedStatus: SortedName.Decrease };
          case SortedName.Decrease:
            return { ...col, sortedStatus: SortedName.Increase };

          default:
            return { ...col, sortedStatus: SortedName.Increase };
        }
      }
      return { ...col, sortedStatus: SortedName.None };
    });

    setColumnName(updateColumns);
  };

  // update pagination
  React.useEffect(() => {
    const endPage = pagination.visibleItemsPerPage * pagination.currentPage;
    const startPage =
      pagination.visibleItemsPerPage * pagination.currentPage - pagination.visibleItemsPerPage;
    const localData = localTableData.slice(startPage, endPage);

    setActualTableData(localData);
  }, [localTableData, pagination]);

  return (
    <div className="table-component">
      <h2 className="table-component__title">{title}</h2>
      <div className="table-component__navigation">
        <div className="navigation__filter-column">
          <select value={selectColumnName.value} onChange={handleSelectColumnName}>
            {columnName.map(({ name, value, isFiltered }) => {
              return isFiltered ? (
                <option key={name} value={value}>
                  {name}
                </option>
              ) : null;
            })}
          </select>
        </div>
        <div className="navigation__filter-search">
          <input type="text" value={inputSearch} onChange={handleInputSearch} />
          <button onClick={handleClickSearchClear}></button>
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
      <table className="table-component__table" cellSpacing="0">
        <thead className="table-component__thead">
          <tr className="table-component__tr">
            {columnName.map(({ name, isSorted }) => {
              return isSorted ? (
                <th
                  className="table-component__th table-component__th--clickable"
                  key={name}
                  onClick={handleClickColumnName}
                  title={name}>
                  {name}
                </th>
              ) : (
                <th className="table-component__th" key={name}>
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        {actualTableData.length > 0 && (
          <tbody className="table-component__tbody">
            {actualTableData.map((item: IData) => (
              <tr className="table-component__tr" key={item.id}>
                {Object.keys(item).map((value, index) => {
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
        )}
      </table>
    </div>
  );
};

export default Table;
