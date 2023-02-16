import i18n from 'i18next';
import { useTranslation } from 'react-i18next'; 
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import StatisticDataImport from "./statisticData"
type Data ={
    id:number,
    player_name:string,
    points:number,
    computer_Points:number
}
function Statistic() {
    const { t } = useTranslation(["statistic"]);

    const queryClient = useQueryClient();

    const { data, isError, isLoading } = useQuery<Data[]>({
      queryKey: ["data"],
      queryFn: StatisticDataImport
    })
    if (isLoading) {
        return <div>Loading...</div>
      }
      if (isError || !data) {
        return <div>Error!</div>
      }
  return (
<div className="hero fullscreen bg-indigo-600">
<div className="hero-body">
    <div className="content">
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
            <tbody>
            {data.map(data => {
          return <tr key={data.id}>
            <th>{data.id}</th>
             <th>{data.player_name}</th>
             <th>{data.points}</th>
             <th>{data.computer_Points}</th>
             </tr>
        })
        }
            </tbody>
        </table>
        </div>
        
</div>
</div>
  )
}

export default Statistic


