import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import {registerArticles, getArticle, getArticles, setFilterFromDate, setFilterToDate, setFilterPage, getFilterArticles, clearfilterarticles } from "redux/actions";
import {Link} from "react-router-dom";
import BoardArticleTable from 'components/board/BoardArticleTable';

function Boardpage(props) {

    const [articles, setArticles]=useState([]);

    const onArticleClick = (boardId) => {      
      props.history.push(`/main/board/article/${boardId}`)
    }

    useEffect(() => {
        props.getArticles(0,100)
    }, []);

    useEffect(() => {
      setArticles([...props.getArticlesResponse])
    }, [props.getArticlesResponse]);

  return (
    <React.Fragment>
      <Helmet>
        <title>
          세일즈로그 - 공지 사항
        </title>
      </Helmet>
      <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-title-box">
                  <h4 className="page-title">공지사항</h4>
                </div>
              </div>
            </div>
          <div className = "row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="float-right">
                <Link to="/main/board/register">
                    <button type="button" className="btn btn-primary mb-1 mt-1">작성</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <BoardArticleTable
                articleList={articles}
                onArticleClick={onArticleClick}
              />
            </div>
          </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { 
    registerArticleResponse,
    getArticleResponse,
    getArticlesResponse
        } = state.Board;
  const {user} = state.User;
  const {boardfilter} = state.BoardFilter;
  return {user, registerArticleResponse, getArticleResponse, getArticlesResponse, boardfilter};
};

const dispatchToprops = {
  registerArticles: registerArticles.call,
  getArticles: getArticles.call,
  getArticle: getArticle.call,
  setFilterPage: setFilterPage,
  setFilterFromDate: setFilterFromDate,
  setFilterToDate: setFilterToDate,
  getFilterArticles: getFilterArticles.call,
  clearfilterarticles: clearfilterarticles
}

export default connect(mapStateToProps, dispatchToprops)(Boardpage);