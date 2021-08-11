import React, { useState, useEffect } from 'react';
import NeedsGuideList from 'components/NeedsGuideList';
import ActivityGuideList from 'components/ActivityGuideList';
import { Collapse, Button, CardBody, Card, CardTitle } from 'reactstrap';

export default function NeedsCard(props) {

    const [guideNeedsInput, setGuideNeedsInput] = useState("");
    const [guideActivityInput, setGuideActivityInput] = useState("");
    const [toggleNeeds, setToggleNeeds] = useState(false);
    const [toggleActivity, setToggleActivity] = useState(false);
    const needType = "needs";
    const activityType = "activity"
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const handleSubmitNeedsClick = (event) => {
      event.preventDefault();
        if(toggleNeeds === false){
          setToggleNeeds(true);
        }
        else{
          setToggleNeeds(false);
        }
      }

    const handleSubmitActivityClick = (event) => {
      event.preventDefault();
        if(toggleActivity === false){
          setToggleActivity(true);
        }
        else{
          setToggleActivity(false);
        }

      }
    const onAddNeeds = (event) => {
      if(event.key === 'Enter'){
        event.preventDefault();
          if(toggleNeeds === false){
            setToggleNeeds(true);
          } else{
            setToggleNeeds(false);
          }
        }
      }

    const onAddActivity = (event) => {
      if(event.key === 'Enter'){
        event.preventDefault();
          if(toggleActivity === false){
            setToggleActivity(true);
          } else{
            setToggleActivity(false);
          }
        }
      }
    
    const displayNeeds = (needs) => {
      if(needs === 'product'){
        return '제품';
      }else if(needs === 'personal'){
        return '개인'
      }else if(needs === 'operation'){
        return '운영'
      }else if(needs === 'strategy'){
        return '전략'
      }else if(needs === 'na'){
        return '미분류'
      }
    }

  useEffect(() => {
    props.handleSubmitClick(guideNeedsInput, props.needs, needType)
    setGuideNeedsInput("");
}, [toggleNeeds]);

  useEffect(() => {
    props.handleSubmitClick(guideActivityInput, props.needs, activityType)
    setGuideActivityInput("")
  }, [toggleActivity]);

	return (
		<React.Fragment>
      <div>
      <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem' }}>{displayNeeds(props.needs)}</Button>
      <Collapse isOpen={isOpen}>
      <Card>
        <CardBody>
          <CardTitle tag="h4">{displayNeeds(props.needs)}</CardTitle>
                  <div className="row" id="app">
                      <div className="col-2">
                          <div className={`avatar-md bg-${props.needs} border-${props.needs}`}>
                              <i className={props.icon + " font-22 avatar-title"}> </i>
                          </div>
                      </div>
                      <div className="col-8">
                          {props.sentences && props.sentences.map((v, i) => 
                              <a href="javascropt:void(0)" className="text-reset mb-2 d-block">
                                  <i className={`mdi mdi-checkbox-blank-circle-outline mr-1 text-${props.needs}`}></i>
                                  <span className="mb-0 mt-1 text-dark text-bold font-14">{v.sentence}</span>
                              </a>
                          )}
                      </div>
                  </div>
                  {(props.needs === 'operation' || props.needs === 'personal' || props.needs === 'strategy') && 
                  <section>
                  <NeedsGuideList guideList={props.guideLog} needstype={props.needs} guidetype={needType} text={guideNeedsInput} handleDeleteClick={props.handleDeleteClick}/>
                  <input className="mb-1 mt-1 ml-2" type="text" placeholder="작성하기" value={guideNeedsInput} onChange={(e) => setGuideNeedsInput(e.target.value)} onKeyPress={onAddNeeds}></input>
                  <button className="btn btn-primary btn-sm col-auto ml-1 mb-1 mt-1" onClick={(e) => handleSubmitNeedsClick(e)}>추가</button>

                  <ActivityGuideList guideList={props.guideLog} needstype={props.needs} guidetype={activityType} text={guideActivityInput} handleDeleteClick={props.handleDeleteClick}/>
                  <input className="mb-1 mt-1 ml-2" type="text" placeholder="작성하기" value={guideActivityInput} onChange={(e) => setGuideActivityInput(e.target.value)} onKeyPress={onAddActivity}></input>
                  <button className="btn btn-primary btn-sm col-auto ml-1 mb-1 mt-1" onClick={(e) => handleSubmitActivityClick(e)}>추가</button>
                  </section>}
          </CardBody>                                 
        </Card>
      </Collapse> 
      </div>
		</React.Fragment>
	);
}