import axios from "axios";
type Data ={
    id:number,
    player_name:string,
    points:number,
    computer_Points:number
}
   
async function StatisticDataImport() {
    const { data } = await axios.get<Data[]>("http://localhost:3004/statistic")
    return data
}

export default StatisticDataImport;