import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts'
import { getStatType3 } from 'redux/actions';

function ApexAccountChart(props) {

  const Xaxios = props.salesLogReport3.map(v => v.account_name);
  const Yaxios = props.salesLogReport3.map(v => v.log_count);
  const option = {
    dataLabels: {
      enabled: true
    },
    grid: {
      padding: {
        bottom: 80
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
          fontSize: '12px'
        }
      }
    }
  };

  const series = [{
    name: '건',
    data: Yaxios
  }];


  return (
    <>
      <ReactApexChart options={option} series={series} type='line' />
      <h4 className="">  </h4>
    </>
  );
}

const mapStateToProps = (state) => {
  const { salesLogReport3 } = state.SalesLog;
  return { salesLogReport3 };
}

const dispatchToProps = {
  getStatType3: getStatType3.call,
}

export default connect(mapStateToProps, dispatchToProps)(ApexAccountChart);


