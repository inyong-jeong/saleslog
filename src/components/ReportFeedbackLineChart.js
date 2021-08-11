import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts'
import { getStatType5 } from 'redux/actions';


function LineChart(props) {

  const Xaxios = props.salesLogReport5.map(v => v.comment_count);
  const Yaxios = props.salesLogReport5.map(v => v.log_count);
  const option = {
    chart: {
      id: 'chart2'
    },
    colors: ['#283593'],
    stroke: {
      width: 3,
      colors: ["#283593"]
    },
    plotOptions: {
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
    <div id="chart-timeline">
      <ReactApexChart options={option} series={series} type="bar" />
      <h4 className="">  </h4>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { salesLogReport5 } = state.SalesLog;
  return { salesLogReport5 };
}

const dispatchToProps = {
  getStatType5: getStatType5.call,
}

export default connect(mapStateToProps, dispatchToProps)(LineChart);


