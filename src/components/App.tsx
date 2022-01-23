import { useState, useEffect } from 'react';
import Table from './Table/Table';

import IData from '../types/data';
import { ITableColNameSQL, IFetchDataSQL, IFetchData } from '../types/IFetchData';

const App = () => {
  const [data, setData] = useState<IFetchData>();

  useEffect(() => {
    const getchData = async () => {
      const res = await fetch('https://test--table-component.herokuapp.com/api/table-component');
      const json: IFetchDataSQL = await res.json();

      const optimizedHeader = json.header.map((row: ITableColNameSQL) => ({
        ...row,
        isSorted: row.issorted,
        sortedStatus: row.sortedstatus,
        isFiltered: row.isfiltered,
      }));

      const optimizedBody = json.body.map((elem: IData) => ({
        ...elem,
        date: elem.date.substring(0, 10),
        distance: Number(elem.distance),
      }));

      setData({ header: optimizedHeader, body: optimizedBody });
    };

    getchData();
  }, []);

  return (
    <div className="app">
      {data && <Table title="Таблица" colNameData={data.header} listData={data.body} />}
    </div>
  );
};

export default App;
