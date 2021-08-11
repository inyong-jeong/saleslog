import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { setUsers } from 'redux/actions';

function ItemTree(props) {
  const [selected, setSelected] = useState(props.items ? init(props.items[0]) : {});
  const [open, setOpen] = useState(props.items ? init(props.items[0]) : {});

  useEffect(() => {
    const userId = props.deletedUser.id;
    if (userId) {
      let place = props.users.findIndex(() => userId);
      let filterUser = [...props.users];
      filterUser.splice(place, 1);
      // props.setUsers([...props.users].splice(place, 0));
      props.setUsers(filterUser);
      setSelected({
        ...selected,
        [userId]: !selected[userId]
      });
    }
  }, [props.deletedUser]);

  const onAddClick = (e) => {
    e.preventDefault();
    if (selected[e.target.id]) {
      props.setUsers([...props.users, { id: e.target.id, label: e.target.getAttribute('name'), type: 'user' }]);
    } else {
      let place = props.users.findIndex(() => e.target.id);
      let filterUser = [...props.users];
      filterUser.splice(place, 1)
      // props.setUsers([...props.users].splice(place, 0));
      props.setUsers(filterUser);
    }
    setSelected({
      ...selected,
      [e.target.id]: !selected[e.target.id]
    });
  }

  const onClick = (e) => {
    e.preventDefault();
    setOpen({
      ...open,
      [e.target.id]: !open[e.target.id]
    });
  }

  function renderNode(node, depth, open) {
    if (!node.childs) {
      // base case
      return (
        <div></div>
      );
    }

    if (node.childs.length === 0) {
      return (
        <li className="tree-item" key={node.id}>
          <i className="mr-2"></i>
          <a href="/#" style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>{node.label}</a>
          <i id={node.id} name={node.label} className={(selected[node.id] ? "fe-plus" : "fe-minus") + " float-right"} style={{ cursor: 'pointer' }} onClick={onAddClick}></i>
        </li>
      );
    }
    return (
      <li className="tree-item" key={node.id}>
        <i className="fe-chevron-down mr-2"></i>
        <a href="/#" id={node.id} onClick={onClick} style={{ cursor: 'pointer' }}>{node.label}</a>
        <i id={node.id} name={node.label} className={(selected[node.id] ? "fe-plus" : "fe-minus") + " float-right"} style={{ cursor: 'pointer' }} onClick={onAddClick}></i>
        <Collapse tag="ul" isOpen={open[node.id]}>
          {node.childs.map((v, i) => {
            return renderNode(v, depth + 1, open);
          })}
        </Collapse>
      </li>
    );
  }

  // make a user_id map 
  function init(items) {
    let map = {};
    function search(items) {
      if (!items)
        return;
      if (!items.childs || items.childs.length === 0) {
        map[items.id] = true;
        return;
      }
      items.childs.map((v) => {
        map[items.id] = true;
        search(v);
        return 0;
      })
    }

    search(items);
    return map;
  }

  return (
    <React.Fragment>
      <div className="">
        <ul>
          {props.items && props.items.map((v, i) => {
            return renderNode(v, 0, open);
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { users, deletedUser } = state.Filter;
  return { users, deletedUser };
}

export default connect(mapStateToProps, { setUsers })(ItemTree);
