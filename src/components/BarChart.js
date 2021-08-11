import React, { useState, useEffect }from 'react';
import { Chart, Bar } from 'react-chartjs-2';
import datalabels from 'chartjs-plugin-datalabels'
import { connect } from "react-redux";
import { getSalesLogNeeds } from 'redux/actions';
import {  withRouter } from 'react-router-dom';


const defaultData = {
  labels: ['전략', '운영', '제품', '개인'],
  datasets: [
    {
      backgroundColor: ['#65d1bd', '#9285d3', '#ff4379','#ffcd52'],
      borderWidth: 0,
      hoverBackgroundColor: '#594CEB',
    }
  ]
};

const options ={
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  animation: {
    easing: 'easeOutQuad'
  },
  scales:{ 
    xdataset:[ 
     { 
        gridLines:{ 
           display: true
        },
        stacked:true,
        ticks:{ 
           stepSize:20,
        }                
     }
    ],
    ydataset:[ 
     { 
        barPercentage:.7,
        categoryPercentage:.5,
        stacked:true,
        gridLines:{ 
           display: false
        },
        scaleLabel: {
        display: false,
        labelString: 'probability',
        }
    },
    ]
  },
  plugins: {
    datalabels: {
      align: 'start',
      anchor: 'start',
      backgroundColor: function(context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 4,
      color: 'white',
      formatter: function(value){

          return value + '건';
      }
    }
  }
}

function CalculateInefficentNeeds(props){
  if (!props.nums)
    return <></>;
  let [numStrategy, numOperation, numProduct, numPersonal] = props.nums;
  let inefficentNeeds = [];
  let avg = props.nums.reduce((a,b) => a+b) / 4;
  if (numStrategy < avg) {
      inefficentNeeds.push({label:'전략', needs: 'strategy'});
  }
  if (numOperation < avg) {
      inefficentNeeds.push({label:'운영', needs: 'operation'});
  }
  if (numProduct < avg) {
      inefficentNeeds.push({label:'제품', needs: 'product'});
  }
  if (numPersonal < avg) {
      inefficentNeeds.push({label:'개인', needs: 'personal'});
  }

  return (
    <React.Fragment>
      {inefficentNeeds.map((v) => 
        <span key={v.needs + '_inefficent'} className={`text-${v.needs}`}>{v.label} </span>
      )}
    </React.Fragment>
  )
}

function BarChart(props) {
  const height = props.height ? props.height : 400;
  let chartData  = {...defaultData};
  let needs = undefined;
  const [clickedElement, setClickedElement] = useState(null)
  let date = undefined;

  if (props.data)
  {
    chartData.datasets[0].data = props.data;
    Chart.plugins.register(datalabels);
  }

  const getElementAtEvent = element => {
    if (!element.length) return
    setClickedElement(element[0]._index)
  }

  if(clickedElement === 0){
    needs = "strategy"
  }else if(clickedElement === 1){
    needs = "operation"
  }else if(clickedElement === 2){
    needs = "product"
  }else if(clickedElement === 3){
    needs = "personal"
  }else if(clickedElement === null){
    needs = "na"
  }

  if(props.date === 0){
    const day = new Date() - ( 24 * 60 * 60 * 1000 );
    date = day;
  }else if(props.date === 1){
    const week = new Date() - (7 * 24 * 60 * 60 * 1000);
    date = week;
  }else if(props.date === 2){
    const month = new Date() - ( 24 * 60 * 60 * 1000 * 31);
    date = month;
  }else if(props.date === 3){
    const threemonth = new Date() - ( 24 * 60 * 60 * 1000 * 31 * 3);
    date = threemonth;
  }else if (props.date === 4){
    const sixmonth = new Date() - ( 24 * 60 * 60 * 1000 * 31 * 6);
    date = sixmonth;
  }

  useEffect(() => {
    if( needs ){
      if(date){
        const nowdate = new Date().getTime();
        props.getSalesLogNeeds(needs, date, nowdate)
        props.history.push(`/main/needs/result`)
      }else return;
    }
  },[needs])

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <h4 className="header-title mb-3">
            니즈 현황
          </h4>
          <div>
          <Bar
            data={chartData}
            height={height}
            options={options}
            getElementAtEvent={getElementAtEvent}
          />
          </div>
          <div className="row m-2">
            <div className="col text-right">
              <p className="text-dark"><CalculateInefficentNeeds nums={props.data}/> 니즈 코칭이 필요합니다</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {

  const { getSalesLogNeedsResponse } = state.SalesLog;

  return { getSalesLogNeedsResponse };
}

const dispatchToProps = {
  getSalesLogNeeds : getSalesLogNeeds.call
};

export default withRouter(connect(mapStateToProps, dispatchToProps)(BarChart));
