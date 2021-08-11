import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Helmet } from "react-helmet";
import { getSalesLog, putSalesLog, getSalesLogComments, postComments, deleteSalesLog, getSalesLogFile, postSalesLogFile, putNotableSalesLog, clearSalesLog, getUserList, putSalesLogGuide, deleteSalesLogGuide } from 'redux/actions';
import { convertTimeToFormat } from 'helpers/timeUtils';
import CouserModal from 'components/CouserModal'
import Card from 'components/Card';
import ThumbnailGroup from 'components/ThumbnailGroup';
import BarChart from 'components/BarChart';
import NeedsCard from 'components/manage/saleslog/NeedsCard';
import CommentsList from 'components/manage/saleslog/CommentsList';

import { saleslogModel } from '@theklab/saleslog';

const UPDATE_ONLY = 0;
const acceptFileTypeList = "image/* , .pdf, .doc, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv, .hwp, ,zip, .rar, .7zip, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation";

function SalesLog(props) {
  const userId = props.user.user_id;
  const loading = props.salesLogLoading;
  const logId = props.match.params.id;
  let body = props.salesLog;
  const [coUsers, setCoUsers] = useState([]);
  const [isEditLog, setIsEditLog] = useState(false);
  const [isNotable, setIsNotable] = useState(false);
  const [editLog, setEditLog] = useState('');
  const [fileLoading, setFileLoading] = useState(false);
  const [guideLog, setGuideLog] = useState([]);
  let editLogRef;
  const [modal, setModal] = useState(false);
  const toggleModal = (e) => { e.preventDefault(); setModal(!modal) };
  const deleteToggleModal = (e) => { e.preventDefault(); setModal(!modal); deleteSalesLog(e) };
  const [needs, setNeeds] = useState([]);
  const [sentences, setSentences] = useState({
    'strategy': [],
    'operation': [],
    'product': [],
    'personal': [],
    'na': []
  });
  const [files, setFiles] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    props.getSalesLog(props.match.params.id);
    const getNeedsDetail = async () => {
      let resp = await saleslogModel.getNeedsDetail();
      resp = resp.data;

      setNeeds([{
        needs: "strategy",
        needsTitle: "전략",
        needsDetail: resp.strategy,
        icon: "fe-git-branch"
      },
      {
        needs: "operation",
        needsTitle: "운영",
        needsDetail: resp.operation,
        icon: "fe-airplay"

      },
      {
        needs: "product",
        needsTitle: "제품",
        needsDetail: resp.product,
        icon: "fe-box"
      },
      {
        needs: "personal",
        needsTitle: "개인",
        needsDetail: resp.personal,
        icon: "fe-user-plus"

      },
      {
        needs: "na",
        needsTitle: "미분류",
        icon: "fe-git-branch"

      }]);
    }

    getNeedsDetail();
    return () => {
      props.clearSalesLog();
    }
  }, []);

  useEffect(() => {
    // needs
    if (body) {
      setEditLog(body.log);
      setCoUsers([{
        user_id: body.user_id,
        user_name: body.user_name
      }].concat(JSON.parse(body.co_users)));
      body.sentences = JSON.parse(body.sentences);
      setSentences({
        'strategy': body.sentences.filter((v) => v.tags[0] === "strategy"),
        'operation': body.sentences.filter((v) => v.tags[0] === "operation"),
        'product': body.sentences.filter((v) => v.tags[0] === "product"),
        'personal': body.sentences.filter((v) => v.tags[0] === "personal"),
        'na': body.sentences.filter((v) => v.tags[0] === "na")
      });
      setIsNotable(body.is_notable !== '0');
      setFiles(body.files ? JSON.parse(body.files) : []);
      setCommentsList(body.comments ? JSON.parse(body.comments) : []);
      setGuideLog(body.guide ? JSON.parse(body.guide) : []);
    }
  }, [body]);

  // when log deleted
  useEffect(() => {
    if (props.deleteSalesLogResponse !== null) {
      props.history.push('/main/manage');
    }
  }, [props.deleteSalesLogResponse]);

  useEffect(() => {
    if (isEditLog) {
      editLogRef.focus();
    }
  }, [isEditLog])

  const handlePostComments = (value) => {
    if (props.commentLoading) return;
    if (value.length < 1) {
      return;
    } else {
      const date = new Date().getTime();
      setCommentsList([
        ...commentsList,
        {
          comment_id: value,
          note: value,
          commenter_id: userId,
          user_name: '',
          log_id: logId,
          creation_date: date,
        }
      ]);
      const postBody = {
        note: value,
        commenter_id: userId,
        log_id: logId,
        creation_date: date
      };
      props.postComments(postBody);
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFileLoading(true);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString
    reader.onload = (t) => {
      props.postSalesLogFile(file.name, file.type, logId, file);
      setFiles([...files, {
        file_name: file.name
      }]);
    };
    if (rABS) reader.readAsBinaryString(file);
  }

  useEffect(() => {
    if (props.postFileResponse) {
      setFileLoading(false);
    }
  }, [props.postFileResponse]);

  const onLogEdit = (e) => {
    e.preventDefault();
    setIsEditLog(false);
    props.putSalesLog(logId, { log: editLog }, UPDATE_ONLY);

  }

  const onNotableClick = (e) => {
    e.preventDefault();
    props.putNotableSalesLog(logId, isNotable ? 0 : 1);
    setIsNotable(!isNotable);
  }

  const onPrintClick = (e) => {
    e.preventDefault();
    // const html = document.querySelector('html');
    // const printContents = document.querySelector('.container').innerHTML;
    // const printDiv = document.createElement("DIV");
    // printDiv.className = "print-div";
    document.querySelector('.nav-bar').style.display = 'none';

    // html.appendChild(printDiv);
    // printDiv.innerHTML = printContents;
    // document.body.style.display = 'none';
    window.print();
    document.querySelector('.nav-bar').style.display = 'block';
    // document.body.style.display = 'block';
    // printDiv.style.display = 'none';
  }

  const handleFileClick = (e, fileName) => {
    props.getSalesLogFile(logId, fileName);
  }

  const deleteSalesLog = () => {
    props.deleteSalesLog(logId);
  }

  const handleOnClick = (value, needs_type, guide_type) => {
    if (value.length < 1) {
      return;
    } else {
      if (needs_type === "operation" && guide_type === "needs") {
        setGuideLog({ ...guideLog, ...guideLog.operation.needs.push(value) }
        );
      }
      else if (needs_type === "operation" && guide_type === "activity") {
        setGuideLog({
          ...guideLog, ...guideLog.operation.activity.push(value)
        });
      }
      else if (needs_type === "personal" && guide_type === "needs") {
        setGuideLog({
          ...guideLog, ...guideLog.personal.needs.push(value)
        });
      }
      else if (needs_type === "personal" && guide_type === "activity") {
        setGuideLog({
          ...guideLog, ...guideLog.personal.activity.push(value)
        });
      }
      else if (needs_type === "strategy" && guide_type === "needs") {
        setGuideLog({
          ...guideLog, ...guideLog.strategy.needs.push(value)
        });
      }
      else if (needs_type === "strategy" && guide_type === "activity") {
        setGuideLog({
          ...guideLog, ...guideLog.strategy.activity.push(value)
        });
      }
      const putBody = {
        text: value,
        needs_type: needs_type,
        guide_type: guide_type
      };
      props.putSalesLogGuide(logId, putBody);

    }
  }

  const handleDeleteOnClick = (index, needs_type, guide_type) => {

    if (needs_type === "operation" && guide_type === "needs") {
      setGuideLog({ ...guideLog, ...guideLog.operation.needs.splice(index, 1) }
      );
    }
    else if (needs_type === "operation" && guide_type === "activity") {
      setGuideLog({
        ...guideLog, ...guideLog.operation.activity.splice(index, 1)
      });
    }
    else if (needs_type === "personal" && guide_type === "needs") {
      setGuideLog({
        ...guideLog, ...guideLog.personal.needs.splice(index, 1)
      });
    }
    else if (needs_type === "personal" && guide_type === "activity") {
      setGuideLog({
        ...guideLog, ...guideLog.personal.activity.splice(index, 1)
      });
    }
    else if (needs_type === "strategy" && guide_type === "needs") {
      setGuideLog({
        ...guideLog, ...guideLog.strategy.needs.splice(index, 1)
      });
    }
    else if (needs_type === "strategy" && guide_type === "activity") {
      setGuideLog({
        ...guideLog, ...guideLog.strategy.activity.splice(index, 1)
      });
    }
    props.deleteSalesLogGuide(logId, needs_type, guide_type, index);
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{body && body.title}</title>
      </Helmet>
      <div className="container" id="saleslog">
        {loading && <div className="d-flex justify-content-center"> <Spinner color="primary" /></div>}
        {props.salesLogError &&
          <div className="text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <p className="text-dark m-2">요청하신 일지가 없습니다.</p>
            <Link to="/main/manage"><u>돌아가기</u></Link>
          </div>}
        {(!loading && !props.salesLogError) &&
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-title-box">
                  <h4 className="page-title">영업일지 상세</h4>
                </div>
              </div>
            </div>

            {/* title */}
            <div className="row justify-content-between mb-3">
              <div className="col">
                <h2 className="text-primary">{body.title}</h2>
              </div>
              <div className="col">
                <div className="d-flex justify-content-end align-items-center">
                  <ThumbnailGroup thumbnails={coUsers} className="d-inline mr-3" />
                  {/* <Select className="form-select form-select-lg" onClick={handleOnClick} placeholder="공동작성자 추가"
                                styles={customStyles}
                                width='100px'
                                menuColor='red'
                                /> */}
                  <CouserModal buttonLabel='공동작성자 추가' />
                </div>
              </div>
            </div>

            <div className="row justify-content-between mb-3">
              <div className="col-lg-8 col-md-12">
                <div className="d-flex">
                  <div className="card mr-2 d-inline">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <div className="avatar-sm">
                            <i className={"fe-user font-22 text-primary avatar-title"}></i>
                          </div>
                        </div>
                        <div className="col-lg-8 col-sm-12 col-xs-12">
                          <p>작성자</p>
                          <h5>{body.user_name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mr-2 d-inline">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <div className="avatar-sm">
                            <i className={"fe-cloud font-22 text-primary avatar-title"}></i>
                          </div>
                        </div>
                        <div className="col-lg-8 col-sm-12 col-xs-12">
                          <p>고객사</p>
                          <h5>{body.account_name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mr-2 d-inline">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <div className="avatar-sm">
                            <i className={"fe-calendar font-22 text-primary avatar-title"}></i>
                          </div>
                        </div>
                        <div className="col-lg-8 col-sm-12 col-xs-12">
                          <p>작성일</p>
                          <h5>{convertTimeToFormat(body.meeting_date)}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="d-flex justify-content-end">
                  <button className="btn btn-xs font-17 text-primary" style={{ cursor: 'pointer' }} onClick={onPrintClick}>
                    <i className="fe-printer mr-2"></i>인쇄하기
                                </button>
                  <button className="btn btn-xs font-17 text-primary" style={{ cursor: 'pointer' }} onClick={onNotableClick}>
                    <i className={isNotable ? "fe-star-on mr-2" : "fe-star mr-2"}></i>중요일지
                                </button>
                  <button className="btn btn-xs font-17 text-secondary" style={{ cursor: 'pointer' }} onClick={toggleModal}><i className="fe-trash"></i></button>
                  <button className="btn btn-xs font-17 text-secondary" style={{ cursor: 'pointer' }} >
                    <Link to={{ pathname: `/main/upload/${logId}`, state: { ...body } }} className="text-secondary"><i className="fe-edit"></i></Link>
                  </button>
                  <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>일지 삭제</ModalHeader>
                    <ModalBody>
                      해당 일지를 삭제하시겠습니까?
                                    </ModalBody>
                    <ModalFooter>
                      <button href="#none" className="btn btn-danger" onClick={(e) => deleteToggleModal(e)}>삭제</button>{' '}
                      <button href="#none" className="btn btn-primary" onClick={(e) => toggleModal(e)}>취소</button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>

            {/* contents and summary */}
            <div className="row">
              <div className="col-lg-6 col-md-12 col-md-pull-12">
                <div className="row">
                  <div className="col-12">
                    <Card title="내용" icon={() => {
                      return (
                        <a href="/#" onClick={(e) => { e.preventDefault(); setIsEditLog(true); }}>
                          <i className="mdi mdi-pencil"></i>
                        </a>
                      );
                    }}>
                      {!isEditLog && <p id="log" className="text-dark">
                        {editLog}
                      </p>}
                      {isEditLog &&
                        <React.Fragment>
                          <textarea className="form-control" ref={(input) => editLogRef = input} value={editLog} onChange={(e) => setEditLog(e.target.value)} style={{ minHeight: '120px' }} onBlur={(e) => setIsEditLog(false)} />
                          <div className="float-left mt-2">
                            <small>내용만 수정하며, 재분석 되지 않습니다.</small>
                          </div>
                          <div className="float-right mt-2">
                            <button className="btn btn-primary btn-xs" onMouseDown={onLogEdit}>수정</button>
                          </div>
                        </React.Fragment>
                      }
                    </Card>
                  </div>
                  <div className="col-12">
                    <Card title="첨부파일">
                      {!files && <p>첨부파일이 없습니다</p>}
                      <div style={{ height: '54px', whiteSpace: 'nowrap', overflowX: 'scroll', 'overflowY': 'hidden' }}>
                        {files && files.map((v, i) =>
                          <button key={v.file_id + '' + i} className="btn btn-primary mr-2" onClick={(e) => handleFileClick(e, v.file_name)}>{v.file_name}</button>
                        )}
                      </div>
                      <div className="dropdown-divider"></div>
                      {fileLoading && <Spinner color="primary" size="sm" />}
                      {!fileLoading && <div className="text-primary ">
                        <label className="btn btn-xs waves-effect text-primary" htmlFor="file-upload"><i className="fe-paperclip"> </i></label>
                        <input style={{ display: 'none' }} id="file-upload" type="file" name="file" onChange={handleFileInput} accept={acceptFileTypeList} />
                      </div>}
                    </Card>
                  </div>
                  <div className="col-12">
                    <Card title="고객사정보">

                    </Card>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-md-pull-12">
                <div className="row">
                  <div className="col-12">
                    <BarChart
                      data={Object.keys(sentences).map((key) => sentences[key].length)}
                      height={200}
                      options={{ maintainAspectRatio: false }} />
                  </div>
                  <div className="col-12 mb-2 text-right">
                    <h5 >니즈에 대한 상세설명 <i className="mdi mdi-help-circle"> </i></h5>
                  </div>
                  <div className="col-12 mb-2 text-right">
                  </div>
                  <div className="col-12">
                    {needs.map((v, i) => sentences[v.needs].length > 0 ?
                      <NeedsCard
                        key={v.needs}
                        needs={v.needs}
                        icon={v.icon}
                        needsTitle={v.needsTitle}
                        sentences={sentences[v.needs]}
                        handleSubmitClick={handleOnClick}
                        handleDeleteClick={handleDeleteOnClick}
                        guideLog={guideLog}
                      />
                      : undefined
                    )}
                    {needs.reduce((a, v) => 0 + sentences[v.needs].length) === 0 ?
                      <Card>
                        <p className="text-center">분석 결과가 없습니다</p>
                      </Card> : undefined}
                  </div>
                </div>
              </div>
            </div>

            {/* Needs Sentences */}
            <div className="row">

            </div>

            {/* Feedback */}
            <div className="row ">
              <div className="col-12">
                <Card title="피드백">
                  <CommentsList
                    commentsList={commentsList}
                    user={props.user}
                    error={props.commentsAlarmText}
                    handleSubmitClick={handlePostComments} />
                </Card>
              </div>
            </div>

          </div>}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const {
    salesLogLoading,
    salesLog,
    salesLogList,
    comments,
    deleteSalesLogResponse,
    postCommentsResponse,
    postFileUrl,
    postFileResponse,
    salesLogError,
    fileGetResponse,
    fileName,
    uploadDone,
    userList,
    putSalesLogGuideResponse,
    deleteSalesLogGuideResponse } = state.SalesLog;
  const { user } = state.User;
  return { salesLogLoading, salesLog, postFileUrl, postFileResponse, comments, deleteSalesLogResponse, postCommentsResponse, salesLogError, user, fileGetResponse, fileName, uploadDone, salesLogList, userList, putSalesLogGuideResponse, deleteSalesLogGuideResponse };
};

const mapStateToDispatch = {
  getSalesLog: getSalesLog.call,
  getSalesLogComments: getSalesLogComments.call,
  postComments: postComments.call,
  deleteSalesLog: deleteSalesLog.call,
  putNotableSalesLog: putNotableSalesLog.call,
  putSalesLog: putSalesLog.call,
  getSalesLogFile: getSalesLogFile.call,
  postSalesLogFile: postSalesLogFile.call,
  clearSalesLog,
  getUserList: getUserList.call,
  putSalesLogGuide: putSalesLogGuide.call,
  deleteSalesLogGuide: deleteSalesLogGuide.call
}


export default connect(mapStateToProps, mapStateToDispatch)(SalesLog);