import React , {useState,useEffect} from 'react';
import RegisterOrdit  from './registerEdit';
import {registerArticles, getArticles, getArticle, setBoardRadiobox} from "redux/actions";
import {connect} from "react-redux";

function RegisterPage(props) {

  const userId = props.user.user_id;
  const [TitleValue, setTitleValue] = useState("");
  const [ContentValue, setContentValue] = useState("");
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };
  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };

  useEffect(() => {
    if(props.registerArticleLoading ===true)
    props.history.push(`/main/board/article/${props.registerArticleResponse}`);
    else
      return null;
  },[props.registerArticleResponse]);

  const onSubmitArticle = (event) => {
  event.preventDefault();
  const content = ContentValue;
  const title = TitleValue;
  const postBody = {
      content: content,
      title: title,
      author_id: userId,
  };
  props.registerArticles(postBody);
  props.setBoardRadiobox(props.boardRadiobox);
  }

  return (
    <>
      <RegisterOrdit
        titleValue={TitleValue}
        contentValue={ContentValue}
        handleTitleChange={onTitleChange}
        handleContentChange={onContentChange}
        handleSubmit={onSubmitArticle}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  const { 
    registerArticleResponse,
    registerArticleLoading,
    boardRadiobox
        } = state.Board;
  const { user } = state.User;
  return {user, registerArticleResponse, registerArticleLoading, boardRadiobox};
};

const dispatchToprops = {
  registerArticles:registerArticles.call,
  getArticles:getArticles.call,
  getArticle:getArticle.call,
  setBoardRadiobox:setBoardRadiobox
}

export default connect(mapStateToProps, dispatchToprops)(RegisterPage);