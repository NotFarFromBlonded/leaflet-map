import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./style.css";
import { cost_geo } from '../cost_geo' 


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
    var data = {
        labels: props.chartData.map(x => x.name),
        datasets: [{
          data: props.type === "volume"?props.chartData.map((x) => parseFloat((((x.volume*100)/props.chartData.map(x=>x.volume).reduce((acc, el)=>acc+=el,0))).toFixed(3))):props.type==="emission"?props.chartData.map((it)=>parseFloat(((it.volume*(cost_geo.find((x)=>x.name===it.name).Carbon_emission)*100/props.chartData.map((it)=>it.volume*(cost_geo.find((x)=>x.name===it.name).Carbon_emission)).reduce((acc,el)=>acc+=el,0)).toFixed(3)))):"",
          backgroundColor: [
            'rgba(8, 61, 119, 1)',
            'rgba(235, 235, 211, 1)',
            'rgba(218, 65, 103, 1)',
            'rgba(244, 211, 94, 1)',
            'rgba(247, 135, 100, 1)'
          ],
          borderColor: "black",
          borderWidth: 1
        }]
      }
    
      var options = {
        responsive: true,
        plugins: {
          legend: {display: true},
          title: {
            display: true,
            text: `${props.name}`
          }
        }
      }
    
      return(
        <div style = {{width: "400px"}} className="m-8 font-semibold fontsyle">
          <Pie 
            data = {data}
            options = {options}
          />
        </div>
        /*<>
          {props.chartData === ""?console.log(""):console.log(props.chartData.map(x=>x.material))}
        </>*/
      )
}

export default PieChart