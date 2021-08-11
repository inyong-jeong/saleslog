import React from 'react';

const defaultThumbnailSrc = '/images/common/img_profile.png';

const deafultStyle= {  
  backgroundColor: '#F6F5F5',
  padding: '16px'
}

const editStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0
}

function ProfileThumbnail(props) {
  const src = props.src ? props.src : defaultThumbnailSrc;
  const size = props.size ? props.size : 90;

  return (
    <React.Fragment>
      <div className="">
        <img src={src} width={size} height={size} alt="user-img" className="rounded-circle" style={deafultStyle} />
        <div>

        </div>
        <div className="" style={editStyle}>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfileThumbnail;