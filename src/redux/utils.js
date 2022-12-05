/*
  @function: create a action generator that make fetch call
  @param {string} type of action
  @param {arg} arguments of action
  @return Like 'react hook', return array of acions. 
  first element is call action, second element is response action, last is failure or error action
*/
export function fetchActionGenerator(type, ...argName) {
  return {
    call: function (...args) {
      // call 
      const action = { type, payload: {} };
      argName.forEach((arg, index) => {
        action.payload[argName[index]] = args[index];
      });
      return action;
    },
    success: function (response) {
      // resposne
      const successType = type + '_SUCCESS';
      const action = { type: successType, payload: { response } };
      return action;
    },
    error: function (error) {
      // error
      const errorType = type + '_ERROR';
      const action = { type: errorType, payload: { error } };
      return action;
    }
  };
};
