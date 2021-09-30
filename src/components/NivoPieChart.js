import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie'
import { dountseries, barseries, leadseries, LeadOption, Baroption, dountOption } from 'constants/chart'
import cmm from 'constants/common';

const NivoPieChart = (props) => {

  const colors = (c) => {
      if (cmm.isEmpty(c)) {
        return ['#076ED5', '#287ED3', '#498ED3', '#5D98D2', '#74A4D3', '#8BB2D8', '#9BC5EE', '#9BCCFB'];
      } else  {
        return c;
      }
  }

  return (
    <div style={{width:'100%',height:400}}>
      <ResponsivePie
                // arcLabel={(v) => `${v.data.percent}%`}
                // theme={theme}
                data={props.data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['brighter', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['brighter', 2]] }}
                colors={colors(props.colors)} 
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                          cursor: 'pointer'
                        }
                      }
                    ]
                  }
                ]}
              />
    </div>
  );
}

export default NivoPieChart;