import React , { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Card from 'components/Card';
import CommentsList from 'components/manage/saleslog/CommentsList';
import {registerArticles, getArticle, getArticles, deleteArticle, putArticle, postArticleComments} from "redux/actions";
function ArticlePage(props) {

  const getArticleResponseTitle = props.getArticleResponse.title;
  const getArticleResponseContent = props.getArticleResponse.content;
  let editLogRefContnet;
  let editLogRefTitle;
  const userId = props.user.user_id;
  let body = props.getArticleResponse;

  const [isEditLogContent, setIsEditLogContent] = useState(false);
  const [Toggle, setToggle] = useState(false);
  const [editLogContent, setEditLogContent] = useState('');
  const [editLogTitle, setEditLogTitle] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  
  const handleOnClick = () =>{
    props.deleteArticle(props.match.params.id);
    props.history.push('/main/board')
  }

  const onLogEdit = (e) =>{
    e.preventDefault();
    setIsEditLogContent(false);
    props.putArticle(props.match.params.id, {content : editLogContent, title : editLogTitle, author_id : props.user.user_id});
    props.getArticle(props.match.params.id)
  }

  const CancleOnClick = (e) =>{
    e.preventDefault();
    setToggle(false);
  }

  const handlePostComments = (value) => {
    if (value.length < 1) {
        return;
    } else {
        const date = new Date().getTime();
        setCommentsList([
            ...commentsList,
            {
                comment_id: value,
                note: value,
                board_commenter_id: userId,
                board_id: props.match.params.id,
                creation_date: date,
            }
          ]);
        const postBody = {
            note: value,
            board_commenter_id: userId,
            board_id: props.match.params.id,
            creation_date: date
        };
        props.postArticleComments(props.match.params.id, postBody);
    }
}

  useEffect(() => {
    props.getArticle(props.match.params.id)
  }, [])

  useEffect(() => {
    if(props.getArticleResponse.title)
    setEditLogTitle(getArticleResponseTitle)
  }, [props.getArticleResponse])

  useEffect(() => {
    if(props.getArticleResponse.content)
    setEditLogContent(getArticleResponseContent)
  }, [props.getArticleResponse])

  useEffect(() => {
    if (isEditLogContent) {
      editLogRefContnet.focus();
      editLogRefTitle.focus();
    }
  }, [isEditLogContent])

  useEffect(() => {
    // needs
    if (body) {
        setCommentsList(body.comments ? JSON.parse(body.comments) : []);
    }
}, [body]);

  return (
          <div className="container">
            <div className="mt-3">
              <Card title="제목 및 내용" icon={() => {
                  return (
                          <a href="/#" onClick={(e) => {e.preventDefault(); setToggle(true);}}>
                              <i className="mdi mdi-pencil"></i>
                          </a>
                          );
                          }}>
                  {!Toggle&& <p id="log" className="text-dark">
                  {props.getArticleResponse && 
                        <div key = {props.getArticleResponse.board_id}>
                          {props.getArticleResponse.title}<br/>
                          {props.getArticleResponse.content}
                        </div>}
                        </p>}
                {Toggle &&
                  <React.Fragment>
                      <form >
                      <textarea className="form-control" ref ={(input) => editLogRefTitle = input} value={editLogTitle}
                      onChange={(e) => setEditLogTitle(e.target.value)} style={{minHeight:'20px'}} />
                      <textarea className="form-control" ref={(input) => editLogRefContnet = input} 
                      value={editLogContent} onChange={(e) => setEditLogContent(e.target.value)}style={{minHeight:'120px'}}
                      />
                      </form>
                      {/* <div className="row ml-1 mt-3">
                        <div className="card" style={{display:'inline'}}>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                              <label className="form-check-label" for="inlineRadio1">전체 공지</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                              <label className="form-check-label" for="inlineRadio2">팀 공지</label>
                            </div>
                          </div>
                        </div> */}
                      <div className="float-left mt-2">
                          <small>제목 및 내용이 수정됩니다.</small>                                 
                      </div>
                      <div className="float-right mt-2">
                          <button className="btn btn-primary btn-xs" onMouseDown={onLogEdit}>수정</button>
                          <button className="btn btn-primary btn-xs" onClick={CancleOnClick}>닫기</button>
                      </div>
                  </React.Fragment>
                }
              </Card>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <Link to="/main/board">
                  <button className="btn btn-primary">공지사항</button>
                </Link>
                  <button className="btn btn-primary ml-2" onClick={handleOnClick}>
                  글 삭제
                  </button>
              </div>
              <div className="row "> 
                <div className="col-12">
                  <Card title="피드백">
                      <CommentsList 
                        commentsList={commentsList}
                        user={props.user}
                        error={props.commentsAlarmText}
                        handleSubmitClick={handlePostComments}/>
                  </Card>
                </div>                    
              </div>
          </div>
  )
}

const mapStateToProps = (state) => {
  const { 
    registerArticleResponse,
    registerArticleLoading,
    getArticleResponse,
    putArticleResponse,
    getArticleCommentsResponse
        } = state.Board;
  const { user } = state.User;
  return {user, registerArticleResponse, getArticleResponse, registerArticleLoading, putArticleResponse, getArticleCommentsResponse};
};

const dispatchToprops = {
  registerArticles:registerArticles.call,
  getArticles:getArticles.call,
  getArticle:getArticle.call,
  deleteArticle:deleteArticle.call,
  putArticle:putArticle.call,
  postArticleComments: postArticleComments.call, 
}

export default connect(mapStateToProps, dispatchToprops)(ArticlePage);

