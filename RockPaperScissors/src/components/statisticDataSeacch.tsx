import axios from "axios";
type Data ={
    id:number,
    player_name:string,
    points:number,
    computer_Points:number
}
   
async function StatisticDataSearch(value:string) {
    const { data } = await axios.get<Data[]>(" http://localhost:3004/search", {
        value
    })
   
    return data
}

export default StatisticDataSearch;