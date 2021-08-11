import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts'
import { getStatType1 } from 'redux/actions';


function LineChart(props) {

  const Xaxios = props.salesLogReport1.map(v => v.field);
  const Yaxios = props.salesLogReport1.map(v => v.value);
  const option = {
    chart: {
      id: 'chart2',
      toolbar: {
        show: true
      }
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
      categories: Xaxios,
      labels: {
        style: {
          fontSize: '9px'
        }
      }
    }
  };

  const series = [{
    name: '건',
    data: Yaxios
  }];

  return (
    <div id="chart-timeline">
      <ReactApexChart options={option} series={series} type="bar" />
      <h4 className="g mb-3" >   </h4>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { salesLogReport1 } = state.SalesLog;
  return { salesLogReport1 };
}

const dispatchToProps = {
  getStatType1: getStatType1.call,
}

export default connect(mapStateToProps, dispatchToProps)(LineChart);


