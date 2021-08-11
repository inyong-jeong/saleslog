import React from 'react';
import { Spinner } from 'reactstrap';


import { convertTimeToFormat } from 'helpers/timeUtils';

function BoardArticleTable(props) {

    const onArticleClick = (boardId) => {
        if (props.onArticleClick)
            props.onArticleClick(boardId);
    }

    const textCenterStyle = {textAlign: 'center'};

    return (
        <React.Fragment>
          <div className="row">        
            <div className="col-12">
            <table className="table sl-table">
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th style={{textAlign: 'start'}}>제목</th>
                        <th>작성자</th>
                        <th>구분</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {props.articleList && props.articleList.map((v, i) => {
                        return (
                        <tr key={v.board_id} id={v.board_id} style={{cursor: 'pointer'}} onClick={() => onArticleClick(v.board_id)}>
                            <td style={textCenterStyle}>{convertTimeToFormat(v.creation_date)}</td>
                            <td>{v.title}</td>
                            <td style={textCenterStyle}>{v.user_name}</td>
                            <td style={textCenterStyle}>{v.article_type}</td>
                            <td style={textCenterStyle}>{v.show_count}</td>
                        </tr>                            
                        );
                    })}
                    {props.loading && <Spinner color="primary" />}
                </tbody>
            </table>
            </div>
          </div>
        </React.Fragment>
        );
}

export default BoardArticleTable;