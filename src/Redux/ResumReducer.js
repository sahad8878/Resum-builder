const initialState = {
    resume: {
      name: '',
      email: '',
      address: '',
      experiences: [],
      educations: [],
      skills: [],
    },
  };
  
  const resumeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SUBMIT_RESUME':
        return {
          ...state,
          resume: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default resumeReducer;
  