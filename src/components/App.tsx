import Table from './Table/Table';

import IData from '../types/data';

const tableColName: string[] = ['Дата', 'Название', 'Количество', 'Расстояние'];
const tableData: IData[] = [
  { id: 0, date: '12-01-2022', title: 'Box', amount: 108, distance: 0.6 },
  { id: 1, date: '04-01-2022', title: 'Book', amount: 214, distance: 2.2 },
  { id: 2, date: '30-12-2021', title: 'Pan', amount: 340, distance: 1.1 },
];

const App = () => {
  return (
    <div className="app">
      <Table colName={tableColName} list={tableData} />
    </div>
  );
};

export default App;
