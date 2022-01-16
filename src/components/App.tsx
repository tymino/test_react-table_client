import Table from './Table/Table';

import IData from '../types/data';

const tableColName: string[] = ['Дата', 'Название', 'Количество', 'Расстояние'];
const tableData: IData[] = [
  { id: 0, date: '12-01-2022', title: 'Box', amount: 108, distance: 0.6 },
  { id: 7, date: '04-01-2022', title: 'Book', amount: 214, distance: 2.2 },
  { id: 8, date: '30-12-2021', title: 'Pan', amount: 340, distance: 1.1 },
  { id: 12, date: '12-01-2022', title: 'Box', amount: 108, distance: 0.6 },
  { id: 13, date: '04-01-2022', title: 'Book', amount: 214, distance: 2.2 },
  { id: 1, date: '04-01-2022', title: 'Book', amount: 214, distance: 2.2 },
  { id: 2, date: '30-12-2021', title: 'Pan', amount: 340, distance: 1.1 },
  { id: 6, date: '12-01-2022', title: 'Box', amount: 108, distance: 0.6 },
  { id: 14, date: '30-12-2021', title: 'Pan', amount: 340, distance: 1.1 },
  { id: 15, date: '12-01-2022', title: 'Box', amount: 108, distance: 0.6 },
  { id: 9, date: '12-01-2022', title: 'Box', amount: 108, distance: 0.6 },
  { id: 10, date: '04-01-2022', title: 'Book', amount: 214, distance: 2.2 },
  { id: 16, date: '04-01-2022', title: 'Book', amount: 214, distance: 2.2 },
  { id: 17, date: '30-12-2021', title: 'Pan', amount: 340, distance: 1.1 },
  { id: 11, date: '30-12-2021', title: 'Pan', amount: 340, distance: 1.1 },
  { id: 3, date: '12-01-2022', title: 'Box', amount: 108, distance: 0.6 },
  { id: 4, date: '04-01-2022', title: 'Book', amount: 214, distance: 2.2 },
  { id: 5, date: '30-12-2021', title: 'Pan', amount: 340, distance: 1.1 },
  
];

const App = () => {
  return (
    <div className="app">
      <Table colName={tableColName} list={tableData} />
    </div>
  );
};

export default App;
