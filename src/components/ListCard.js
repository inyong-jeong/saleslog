import React from 'react';
import ThumbnailGroup from 'components/ThumbnailGroup';

const defaultTheme = {
  'backgroundColor': '#EDEDED'
};

function ListCard(props) {
  const cardList = props.contents;
  const mapper = props.mapper;

  return (
    <React.Fragment>
    <div className="card" style={defaultTheme} >
      <div className="card-body">
        <div className="dropdown float-right">
          <a href="/#" className="dropdown-toggle card-drop arrow-none" data-toggle="dropdown" aria-expanded="false">
              <i className="mdi mdi-dots-horizontal m-0 text-muted h3"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="/#">Edit</a>
              <a className="dropdown-item" href="/#">Delete</a>
              <a className="dropdown-item" href="/#">Add Members</a>
              <a className="dropdown-item" href="/#">Add Due Date</a>
          </div>
        </div>
        <h4 className="header-title mb-3">
          {props.title}
        </h4>
        {cardList && cardList.map((v, i) => {
          let item = {
            id: v.id,
            title: v.title,
            comments_count: v.comments_count,
            members: v.members,
          };

          if (mapper) {
            let map = mapper(v);
            Object.keys(mapper(v)).map((key) => item[key] = map[key]);
          }
          return (
            <div className="row" key={item.id} onClick={() => props.onClick(i)}>
              <div className="col">
                <div className="card mb-2 radius" style={{cursor: 'pointer'}}>
                  <div className="card-body p-2">
                    <h5>{item.title}</h5>
                    <p className="mb-1">
                      <span className="text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-comment-multiple-outline text-muted"></i>
                        <b>{item.comments_count}</b> 
                      </span>
                    </p>
                    <ThumbnailGroup thumbnails={item.members}/>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </React.Fragment>
  );
}

export default ListCard;