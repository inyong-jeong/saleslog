import React, { useState, useEffect } from 'react';
import InputField from 'components/InputField';
import RadioGroupField from 'components/RadioGroupField';
import SelectField from 'components/SelectField';
import Divider from 'components/Divider';

function FormGenerator(props) {
  const form = props.form;
  const state = props.state;
  const setState = props.setState;
  const handler = props.handler;
  const onFormValid = props.onFormValid;
  const [idMap, setIdMap] = useState({});
  const [validStatus, setValidStatus] = useState({}); 

  const componentDidMount = () => {
    let temp = {};
    form.form.map((v, i) => {
      if (v.id)
        temp[v.id] = v;
    });
    setIdMap(temp);
  }
  useEffect(componentDidMount, []);

  useEffect(() => {
    const [valid, verbose] = checkFormValid();
    if (valid) {
      onFormValid(true);
    } else {
      onFormValid(false, verbose);
    }
  }, [validStatus])

  const checkFormValid = () => {
    let isFormValid = true;
    let verbose;
    form.form.map((v, i) => {
      // check form regex
      if (v.regex) {
        let regex = new RegExp(v.regex);
        if (regex.exec(state[v.id]) === null) {
          isFormValid = false;
          verbose = {
            id: v.id,
            label: v.label
          };
        }
      }
      // check radio selected
      if (v.type === 'form-radio') {
        if (!state[v.id]) {
          isFormValid = false;
          verbose = {
            id: v.id,
            label: v.label            
          }
        }
      }
      // check select selected
    });
    return [isFormValid, verbose];
  }

  const checkForm = (id) => {
    if (idMap[id].regex)
      return new RegExp(idMap[id].regex).exec(state[id]) === null ? false : true;
  }

  const handleFormChange = (e) => {
    setState({...state,
      [e.target.id]: e.target.value});
  }

  // for checking form validation
  const handleFormBlured = (e) => {
    setValidStatus({...validStatus,
      [e.target.id]: checkForm(e.target.id)
    });
  }

  const handleRadioChange = (id, selected) => {
    setState({
      ...state,
      [id]: selected
    });
    setValidStatus({...validStatus,
      [id]: checkForm(id)
    });    
  }

  const handleSelectChange = (e) => {
    if (handler[e.target.id]) {
      handler[e.target.id](e);
    }
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  }

  const divider = (key) => <Divider key={key} className="mt-2 mb-2" />;
  const header = (key, label) => <h3 key={key} className="mt-2 mb-2">{label}</h3>;
  const formBasic = (key, props) => {
    return (
        <div key={key} className="form-group row mb-3">
          <InputField 
            id={props.id}
            type={props.inputType}
            title={props.label}
            valid={validStatus[props.id]}
            placeholder={props.placeholder}
            disabled={props.disabled}
            maxLength={props.maxLength}
            onChange={handleFormChange}
            onBlur={handleFormBlured}
            value={state[props.id]}
            note={props.note} />
          {props.btn && <div className="col-3">
            <button className="btn btn-secondary" onClick={handler[props.id]}>{props.btn.label}</button>
          </div>}
        </div>
    );
  };
  const formRadio = (key, props) => {
    return (
      <div key={key} className="form-group row mb=3">
        <RadioGroupField id={props.id} title={props.label} selection={props.multiFields} onChange={handleRadioChange} />
      </div>
    );
  };
  const formMulti = (key, props) => {
    return (
      <div key={key} className="form-group row mb-3">
        {props.multiFields.map((v, i) => {
          if (v.type === 'form') {
            return (
              <InputField
                key={v.id + "_" + i}
                id={v.id}
                type={v.inputType}
                title={v.label}
                valid={validStatus[v.id]}              
                placeholder={v.placeholder}
                col={v.col}
                onChange={handleFormChange}
                value={state[props.id]} />            
            );
          } else if (v.type === 'form-select') {
            return (
              <SelectField
                key={v.id + "_" + i}
                id={v.id}
                title={v.label}
                col={v.col}
                onChange={handleSelectChange}
                options={v.options}
                />
            );
          }
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      <form disabled={props.disabled}>
        {form.form.map((v, i) => {
          switch(v.type) {
            case 'header':
              return header('header_' + i ,v.label);
            case 'divider':
              return divider('divider_' + i);
            case 'form':
              if (v.multiFields)
                return formMulti('form_' + v.id, v);
              else
                return formBasic('form_' + v.id, v);
            case 'form-select': 
              break;
            case 'form-radio':
              return formRadio('form-radio_' + v.id, v);
            default:
              return <div></div>
          }
        })}                                    
      </form>
    </React.Fragment>
  );
}

export default FormGenerator;