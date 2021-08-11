import React, { useEffect, useRef } from 'react';
import flatpickr from "flatpickr";

function DatePicker(props) {
  const pickr = useRef();
  useEffect(() => {
    flatpickr(pickr.current, {
      dateFormat: "Y-m-d",
      defaultDate: props.date,
      onChange: props.onDateChange
    });
  }, []);

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
              <div className="row">
                <div className="col-2">
                  <i className={"fe-calendar text-primary font-22 avatar-title"}></i>
                </div>
                <div className="col-10">
                  <h4>날짜선택</h4>
                  <div className="">
                    <label>{props.title}:</label>
                    <input ref={pickr} type="text" className="flatpickr col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                  </div>
                </div>
              </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DatePicker;