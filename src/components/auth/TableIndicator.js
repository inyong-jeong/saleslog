import React from 'react';

function TableIndicator(props) {
  return (
      <div className={"p-2 table-indicaton " + (props.className || "")}>
      {props.table && props.table.map((v, i) =>
        <a key={v.to + "_table"} href="/#" className="mb-3 d-block" onClick={(e) => e.preventDefault()}>
          <h4 className={"mb-0 mt-1 " + (props.current === i ? "" : "text-muted")}>{v.title}</h4>
        </a>
      )}
      </div>
  );
}

export default TableIndicator;