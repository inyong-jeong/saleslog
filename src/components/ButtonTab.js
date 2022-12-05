import React, { useState } from 'react';

function ButtonTab(props) {
  const [selected, setSelected] = useState(props.defaultSelected);

  const onClick = (e) => {
    e.preventDefault();
    if (props.onSelected)
      props.onSelected(e.target.id);
    setSelected(e.target.id);
  }

  return (
    <div className="d-md-inline">
      <div className="btn-group mb-2">
        {props.tab && props.tab.map((v) => {
          return (
            <button key={v.id} type="button" id={v.id} className={"btn btn-xs " + (selected === v.id ? "btn-primary" : "btn-light")} onClick={onClick}>{v.label}</button>
          );
        })}
      </div>
    </div>
  );
}

export default ButtonTab;