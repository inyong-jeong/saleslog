import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import cmm from 'constants/common';


const NivoBarChart = (props) => {

  const colors = (c) => {
    if (cmm.isEmpty(c)) {
      return cmm.dashboardChartColors
    } else {
      return c;
    }
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveBar
        data={props.data}
        keys={props.labels}
        indexBy="active_id"
        margin={props.margin}
        padding={0.3}
        layout={(props.barType) ? props.barType : "horizontal"}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat={{ format: '', enabled: false }}
        colors={colors(props.colors)}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[]}
        borderColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
        axisBottom={
          props.hideAxisBottom ? null :
            {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: 32,
              //  tickValues: [1, 2, 3, 4, 5]
            }}
        axisLeft={
          props.hideAxisLeft ? null :
            {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: -40
            }}

        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"

      />
    </div>
  );
}

export default NivoBarChart;