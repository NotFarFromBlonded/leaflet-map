import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



const LineChart = (props) => {
    var data = {
        labels: ['day -2','day -1','day 0','day 1','day 2','day 3','day 4','day 5','day 6','day 7','day 8','day 9','day 10','day 11','day 12','day 13','day 14','day 15','day 16','day 17','day 18','day 19','day 20','day 21','day 22','day 23','day 24','day 25','day 26','day 27','day 28','day 29','day 30','day 31', 'day 32'],
        datasets: [{
            label: 'Affected',
            data: props.chartAffectedData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Original',
            data: props.chartOriginalData,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ]
      }
    var options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
    };
    
  return (
    <div style = {{width: "1080px"}}>
          <Line options={options} data={data}/>;
    </div>
  )
}

export default LineChart