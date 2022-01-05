import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card, CardTitle } from 'reactstrap';
import { Divider } from 'antd';
export default function NeedsCard(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [sentence, setSentence] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    setSentence(props.sentences.split('\n'))
  }, [])


  function getKeyWords(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {

      result = result.concat(str[i].split(' '));
    }
    return result;
  }
  console.log(sentence);
  sentence && console.log(getKeyWords(sentence));


  return (
    <React.Fragment>
      <div>
        <Button onClick={toggle} style={{ marginBottom: '1rem', backgroundColor: '#000000' }}>{`${props.needs}니즈`}</Button>
        <Collapse isOpen={true}>
          <Card>
            <CardBody>
              {/* <CardTitle tag="h4">{`${props.needs}니즈 코칭이 필요합니다.`}</CardTitle> */}
              {sentence &&
                sentence.map((v) => {
                  return (
                    <div className="row" id="app">
                      <div className="col-2">
                        {/* <div className={`avatar-md bg-${props.needs} border-${props.needs}`}>
                          <i className={props.icon + " font-22 avatar-title"}> </i>
                        </div> */}
                      </div>
                      <div className="col-8">
                        <i className={`mdi mdi-checkbox-blank-circle-outline mr-1 text-${props.needs}`}></i>
                        <span className="mb-0 mt-1 text-dark text-bold font-14">{v}</span>
                      </div>
                    </div>
                  )
                })
                // <Divider />
              }
              <Divider />
              {props.needs === '전략' &&
                <>
                  <div>상기 내용과 관련하여 아래의 질문들을 참조하여 추가 조사 바랍니다.</div>
                  <br />
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사는 어느 시장으로 진입하려고 합니까?</span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사는 어느 고객들을 우선적으로 고려하고 있습니까?</span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사는 현재 시장/고객에 집중하고 있는 이유는 무엇입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사는 고객사의 경쟁사 대비 어떤 우위점을 강조하려고 합니까?
                    </span>
                  </div>
                </>
              }
              {props.needs === '운영' &&
                <>
                  <div>상기 내용과 관련하여 아래의 질문들을 참조하여 추가 조사 바랍니다.</div>
                  <br />
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사는 어느 영역에서 비용을 줄이려고 합니까?</span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사에서 힘들어 하는 업무는 무엇입니까?</span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">자사 제품과 고객사 제품간의 업무 호환성은 어떠합니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사 업무에서 시간이 가장 많이 소요되는 것은 무엇입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">원활한 자금운영을 위해 어떤 고민을 하고 있습니까?

                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">고객사는 보유하고 있는 자원들(인력/창고 등)을 효율적으로 활용하고 있습니까?

                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">인력관리에 어떤 문제점이 있습니까?

                    </span>
                  </div>
                </>
              }
              {props.needs === '제품' &&
                <>
                  <div>상기 내용과 관련하여 아래의 질문들을 참조하여 추가 조사 바랍니다.</div>
                  <br />
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">요구하는 (물리적)품질 수준은 어느 수준입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">요구하는 클레임 대응은 어느 수준입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">요구하는 가격대는 어느 수준입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">요구하는 원가는 어느 수준입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">요구하는 납기 수준은 어느 정도입니까?
                    </span>
                  </div>
                </>
              }
              {props.needs === '개인' &&
                <>
                  <div>상기 내용과 관련하여 아래의 질문들을 참조하여 추가 조사 바랍니다.</div>
                  <br />
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">실무자/경영자가 인정받기를 원하는 사람들은 누구입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">실무자의 KPI는 무엇입니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">실무자의 KPI 달성은 잘 되고 있습니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">그 사람들에게 어떻게 인정받기를 원합니까?
                    </span>
                  </div>
                  <div >
                    <i className={`mdi mdi-checkbox-blank-circle mr-1 text`}></i>
                    <span className="mb-0 mt-1 text-dark text-bold font-14">힘들어하는 업무는 무엇입니까?
                    </span>
                  </div>
                </>
              }

            </CardBody>
          </Card>
        </Collapse>
      </div>
    </React.Fragment>
  );
}