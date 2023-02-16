import i18n from 'i18next';
import { useTranslation } from 'react-i18next'; 
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import StatisticDataImport from "./statisticData"
// import StatisticDataSearch from "./statisticDataSeacch"
import { useState } from 'react';
import axios from 'axios';
type Data ={
    id:number,
    player_name:string,
    points:number,
    computer_Points:number
}
function Statistic() {
    const { t } = useTranslation(["statistic"]);
    const [hideData, setHideData] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const [searchData, setSearchData] = useState("");

    const queryClient = useQueryClient();

    // const { data, isError, isLoading } = useQuery<Data[]>({
    //   queryKey: ["data"],
    //   queryFn: StatisticDataImport
    // })

    const {
      isLoading: loadingData,
      error: errorData,
      data: statisticData,
    } = useQuery<Data[]>(['data'], () => StatisticDataImport(),
  
      {
  
      }
    );
    // const {
    //   isLoading: loadingSearch,
    //   error: errorSearch,
    //   data: searchedData,
    // } = useQuery(
    //   ['comments', 'posts', nameValue],
    //   () => StatisticDataSearch(nameValue),
    // );

    const searchName = async (e: { preventDefault: () => void; }) =>{
      e.preventDefault();
      setHideData(false); 
      setShowSearch(true);
      await axios.get('http://localhost:3004/search/'+nameValue).then(res =>  setSearchData(res.data.map(data => {
        return <tr key={data.id}>
          <th>{data.id}</th>
           <th>{data.player_name}</th>
           <th>{data.points}</th>
           <th>{data.computer_Points}</th>
           </tr>
      })
      )
      )
    
    }
    if (loadingData) {
        return <div>Loading...</div>
      }
      if (errorData || !statisticData) {
        return <div>Error!</div>
      }
      // if (loadingSearch) {
      //   return <div>Loading...</div>
      // }
      // if (errorSearch || !searchedData) {
      //   return <div>Error!</div>
      // }
  return (
<div className="hero fullscreen bg-indigo-600">
<div className="hero-body">
    <div className="content">
      <form onSubmit={ searchName}>
        <label style={{marginTop: "20px"}} > Enter your name and see your points</label>
       <input 
       type="text" 
       placeholder="search" 
       maxLength={20!} 
       onChange={e => { setNameValue(e.target.value) }} 
       >
        </input>
        <button  
        style= {{marginTop: "10px"}} 
        className='btn-light'
        >
          Apply
          </button>
      </form>
     
        <h2 className="title text-white u-text-center">{t("gameScores")}</h2>
        <table className='table striped'>
            <thead>
                <tr>
                    <th >{t("id")}</th>
                    <th >{t("name")}</th>
                    <th >{t("points")}</th>
                    <th >{t("computerPoints")}</th>
                    
                </tr>
            </thead>
{hideData && 
            <tbody>
            {statisticData.map(data => {
          return <tr key={data.id}>
            <th>{data.id}</th>
             <th>{data.player_name}</th>
             <th>{data.points}</th>
             <th>{data.computer_Points}</th>
             </tr>
        })
        }
            </tbody>

}

{showSearch && 
            <tbody>
           {searchData}
            </tbody>

}
        </table>
        </div>
        
</div>
</div>
  )
}

export default Statistic


