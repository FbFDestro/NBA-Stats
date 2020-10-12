import React from 'react';
import { Radar } from 'react-chartjs-2';

const PlayerCompareChart = ({ playersData }) => {
  const dataDescriptions = {
    // points: 'Points',
    player_efficiency_rating: 'Efficiency',
    assists: 'Assists',
    rebounds: 'Rebounds',
    field_goals_made: 'Field points',
    three_pointers_made: 'Three points',
  };

  const data = {
    labels: Object.keys(dataDescriptions).map((key) => dataDescriptions[key]),
    datasets: [
      {
        label: playersData[0]['name'],
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: Object.keys(dataDescriptions).map((key) => {
          return playersData[0][key];
        }),
      },
      {
        label: playersData[1]['name'],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: Object.keys(dataDescriptions).map((key) => {
          return playersData[1][key];
        }),
      },
    ],
  };

  return (
    <div className='radarChart'>
      <Radar
        options={{
          scale: {
            gridLines: {
              color: 'var(--main-bg-color)',
            },
            pointLabels: {
              fontSize: 14,
            },
            ticks: {
              stepSize: 250,
            },
          },
          maintainAspectRatio: false,
          tooltips: {
            titleFontSize: 20,
            bodyFontSize: 16,
          },
        }}
        data={data}
      />
    </div>
  );
};

export default PlayerCompareChart;
