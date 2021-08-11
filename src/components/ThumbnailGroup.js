import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap';

const avartarGroupStyle = {
  margin: '0 0 10px -12px',
  display: 'inline-block',
  border: '2px solid #fff',
  borderRadius: '50%',
  backgroundColor: '#F6F5F5',
  padding: '4px'
};

const defaultImg = '/images/common/img_profile.png';

function ThumbnailGroup(props) {
  let thumbnails = props.thumbnails;
  const [open, setOpen] = useState({});

  const toggle = (e) => setOpen({...open ,[e.target.id]: !open[e.target.id]});

  return (
    <React.Fragment>
      <div className={"avartar-list " + props.className}>
        {thumbnails && thumbnails.map((v, i) =>
          <React.Fragment key={"_"+v.user_id}>
            <Link className="avatar-group-item" title={v.user_name} style={avartarGroupStyle}  > {/*to={`/main/profile/${v.user_id}`}  */}
                <img src={v.src ? v.src : defaultImg} className="rounded-circle avatar-sm" id={"Tooltip-" + v.user_id} alt="member" />
            </Link>
            <Tooltip placement="top" target={"Tooltip-" + v.user_id} isOpen={open["Tooltip-" + v.user_id]} toggle={toggle}>
              {v.user_name}
            </Tooltip>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default ThumbnailGroup;