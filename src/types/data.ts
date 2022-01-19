export default interface IData {
  [k: string]: string | number;
  id: number;
  date: string;
  title: string;
  amount: number;
  distance: number;
}