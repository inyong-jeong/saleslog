import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card, CardTitle } from 'reactstrap';

export default function NeedsCard(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [sentence, setSentence] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    setSentence(props.sentences.split('\n'))
  }, [])
  return (
    <React.Fragment>
      <div>
        <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem' }}>{`${props.needs}니즈`}</Button>
        <Collapse isOpen={isOpen}>
          <Card>
            <CardBody>
              <CardTitle tag="h4">{`${props.needs}니즈 코칭이 필요합니다.`}</CardTitle>
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
              }
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </React.Fragment>
  );
}