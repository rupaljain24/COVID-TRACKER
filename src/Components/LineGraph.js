import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options={
  legend:{
  display:false,
  },
  elments:{
    point:{
      radius:0,
    },
  },
  maintainAspectRatio:false,
  tooltips: { 
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
}
}
function LineGraph(props) {
  const {casesType}=props
    const [caseData, setCaseData] = useState({})

    const buildChart=(data,casesType)=>{
      let chartdata=[];
      let lastDataPoint;
      //console.log(data.deaths)
      for(let date in data[casesType]){
        if(lastDataPoint){
          let newdata={
            x:date,
            y:data[casesType][date]-lastDataPoint
          };
          chartdata.push(newdata)
        }
        lastDataPoint=data[casesType][date];
        
      }
      return chartdata;
    };

    useEffect(() => {
        axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((res)=>{
          const chartdata=buildChart(res.data,casesType)
          setCaseData(chartdata)
          //buildChart(res.data,"deaths")
          console.log(casesType)
        })
        .catch((error)=>console.log(error))
      }
    , [casesType])
    
  return (
    <div>
      {caseData.length > 0 && 
        <Line data={{
          datasets:[
            {
              data: caseData,
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034",
              
            },
          ],
        }}
        options={options}/>}
        
    </div>
  )
}

export default LineGraph