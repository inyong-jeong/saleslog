import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { dountseries, barseries, leadseries, LeadOption, Baroption, dountOption } from 'constants/chart'
import cmm from 'constants/common';

const NivoBarChart = (props) => {

  const colors = (c) => {
      if (cmm.isEmpty(c)) {
        return ['#076ED5', '#287ED3', '#498ED3', '#5D98D2', '#74A4D3', '#8BB2D8', '#9BC5EE', '#9BCCFB'];
      } else  {
        return c;
      }
  }

  return (
    <div style={{width:'100%',height:400}}>
      <ResponsiveBar
          data={props.data}
          keys={Baroption.xaxis.categories}
          indexBy="active_id"
          margin={{ top: 50, right: 50, bottom: 50, left: 100 }}
          padding={0.3}
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          valueFormat={{ format: '', enabled: false }}
          colors={colors(props.colors)} 
          // colors={{ scheme: 'blues' }}
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
          borderColor={{ from: 'color', modifiers: [ [ 'brighter', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: 32
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 1.6 ] ] }}
          legends={[
          
          ]}
      />
    </div>
  );
}

export default NivoBarChart;