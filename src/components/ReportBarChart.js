import React from 'react';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts'

function BarChart(props) {
  const sum = props.salesLogReport2.map(v => v.sum);
  const mean = props.salesLogReport2.map(v => v.mean);
  const Mean = Math.round(mean[0])
  const Xaxios = props.salesLogReport2.map(v => v.field);
  Xaxios.shift();
  const Yaxios = props.salesLogReport2.map(v => v.value);
  Yaxios.shift();

  const option = {
    chart: {
      id: 'chart2'
    },
    colors: ['#283593'],
    stroke: {
      width: 3,
      colors: ["#283593"]
    }, plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    xaxis: {
      categories: Xaxios
    }
  };

  const series = [{
    name: '건',
    data: Yaxios
  }];
  return (
    <>
      <Chart options={option} series={series} type="bar" />
      <h4>  전체일지 {sum[0]}건, 인당 월 평균 {Mean}건</h4>
    </>
  );
}

const mapStateToProps = (state) => {
  const { salesLogReport2 } = state.SalesLog;
  return { salesLogReport2 };
}

export default connect(mapStateToProps, {})(BarChart);

