import React, { useEffect, useRef } from 'react';
import flatpickr from "flatpickr";
import { Korean } from "flatpickr/dist/l10n/ko.js";

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
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-9">
                  <div className="">
                    <input ref={pickr} type="text" className="flatpickr" />
                  </div>
                </div>
                <div className="col-3">
                  <i className={"fe-calendar text-primary font-22 avatar-title"}></i>
                </div>
              </div>
      </div>
    </React.Fragment>
  );
}

export default DatePicker;