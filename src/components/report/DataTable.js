import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Spinner } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import XLSX from 'xlsx';


function SalesLogTable(props) {

  const [excelLoading, setExcelLoading] = useState(false);

  const makeSheet = (ary) => {
    const sheet = [];
    const columns = [];
    for (const index in props.columns) {
      const row = props.columns[index];
      columns.push(row.text);
    }
    sheet.push(columns);

    for (const index in props.data) {
      const row = props.data[index];
      let dataRow = [];
      for (const column of props.columns)
        dataRow.push(row[column.dataField]);
      
      sheet.push(dataRow);
    }

    return sheet;
  }

  const handleExcelDownlaod  = async (e) => {
    if (excelLoading) return;
    setExcelLoading(true);
    // "pixels"
    const wscols = [
      {wpx: 200}, 
      {wpx: 200},
      {wpx: 200},
      {wpx: 200},
      {wpx: 200},
      {wpx: 200},
      {wpx: 200},
      {wpx: 200},
      {wpx: 200},
      {wpx: 200},
    ];

    const wsrows = [];
    const ws = XLSX.utils.aoa_to_sheet(makeSheet(props.data));

    ws['!cols'] = wscols;
    ws['!rows'] = wsrows;

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "xlsx");

    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

    XLSX.writeFile(wb, 'table.xlsx');
    setExcelLoading(false);
  }

  const loadder = () => <div className="d-flex justify-content-center"><Spinner color="primary"/></div>;
  const noData = () => <div className="d-flex justify-content-center">데이터가 없습니다</div>;

  return (
    <React.Fragment>
      <Card>
        <CardBody>
            <div className="float-right">
              <button className="btn btn-primary m-1" onClick={handleExcelDownlaod} disabled={excelLoading}>
                xlxs 내려받기
                {excelLoading && <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}              
              </button>
            </div>        
        </CardBody>
        <CardBody style={{overflow: 'auto'}}>
            <div className="table-wrap" style={{overflowX: 'scroll', width: '100%', minWidth: '800px'}}>
              <BootstrapTable 
                headerClasses="thead-light"
                rowStyle={{fontSize: '14px'}}
                bordered={false}
                keyField='id'
                noDataIndication={props.loading ? loadder : noData} 
                data={props.data ? props.data : []} 
                columns={props.columns} />
            </div>
        </CardBody>
      </Card>
      </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {})(SalesLogTable);