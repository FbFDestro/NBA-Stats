import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Bar } from 'react-chartjs-2';

const PlayerCharts = ({ team_id }) => {
  const [pointsOnTeam, setPointsOnTeam] = useState([]);
  const [efficiencyOnTeam, setEfficiencyOnTeam] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchPossibleOrderByKeys = async () => {
      const response = await axios.get(`/api/players/StatsPerTeam/${team_id}`);
      if (isMounted) {
        setPointsOnTeam(response.data.data['points']);
        setEfficiencyOnTeam(response.data.data['efficiency']);
      }
    };
    fetchPossibleOrderByKeys();

    return () => (isMounted = false);
  }, [team_id]);

  const stats = {
    points: pointsOnTeam,
    efficiency: efficiencyOnTeam,
  };

  const chartsData = Object.keys(stats).map((key) => {
    const label = [];
    const values = [];
    for (const player of stats[key]) {
      label.push(player['label']);
      values.push(player['value']);
    }

    const data = {
      labels: label,
      datasets: [
        {
          label: 'Player ' + key,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: values,
        },
      ],
    };

    return { key: key, title: 'Players ' + key, data: data };
  });

  const charts = chartsData.map((chart) => {
    return (
      <div key={chart.key} className='chart'>
        <h1>{chart.title}</h1>
        <Bar
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize: 16,
                  },
                },
              ],
            },
            tooltips: {
              titleFontSize: 20,
              bodyFontSize: 16,
            },
          }}
          data={chart.data}
        />
      </div>
    );
  });

  return charts;
};

export default PlayerCharts;
