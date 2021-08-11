import React  from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import Card from 'components/Card';

function RegisterOrEdit(props) {

  return (
    <React.Fragment>
      <Helmet>
        <title>
          세일즈로그 - 게시글 업로드
        </title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="page-title-box">
              <h4 className="page-title">게시글 업로드</h4>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-4">
            <Card title="공지구분">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={props.boardRadiobox}/>
              <label className="form-check-label" for="inlineRadio1">전체 공지</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={props.boardRadiobox}/>
              <label className="form-check-label" for="inlineRadio2">팀 공지</label>
            </div>
            </Card>
          </div>
        </div> */}
        <div className="row">
          <div className="col-12">
            <Card title="제목">
              <input
                    type="text"
                    onChange={props.handleTitleChange}
                    value={props.titleValue}
                    name="title"
                    placeholder="제목을 입력하세요"
                    className="form-control border-white"/>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card title="내용">
              <input
                  type="text" 
                  onChange={props.handleContentChange}
                  value={props.contentValue} 
                  name="content"
                  placeholder="내용을 입력하세요"
                  className="form-control border-white"/>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <button onClick={props.handleSubmit} className="btn btn-primary mt-3">
              등록
            </button>
            <Link to="/main/board">
              <button className="btn btn-primary mt-3 ml-2">취소</button>
            </Link>
          </div>
        </div>
    </div>
    </React.Fragment>
    
  )
}

const mapStateToProps = (state) => {
  const { 
    registerArticleResponse,
    boardRadiobox,
        } = state.Board;
  const { user } = state.User;
  return {user, registerArticleResponse, boardRadiobox};
};

export default connect(mapStateToProps, {})(RegisterOrEdit);
