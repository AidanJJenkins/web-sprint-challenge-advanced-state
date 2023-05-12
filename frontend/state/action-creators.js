import axios from 'axios'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, INPUT_CHANGE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, QUIZ_RESET } from './action-types.js'
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(w) {
  let newWheel = w < 5 ? w + 1 : 0;
  return({type: MOVE_CLOCKWISE, payload: newWheel})
}

export function moveCounterClockwise(w) {
  let newWheel = w == 0 ? 5 : w - 1;
  return({type: MOVE_COUNTERCLOCKWISE, payload: newWheel})
}

export function selectAnswer(ansID) {
  return {type: SET_SELECTED_ANSWER, payload: ansID}
}

export function setMessage(payload) {
  return { type: SET_INFO_MESSAGE, payload: payload }
}

export function setQuiz(payload) {
  return { type: SET_QUIZ_INTO_STATE, payload: payload };
}

export function inputChange(name, updatedInfo) {
  return { type: INPUT_CHANGE, payload: [name, updatedInfo]}
}

export function resetForm() {
  return { type: RESET_FORM, payload: {newQuestion: '', newTrueAnswer: '', newFalseAnswer: '' }}
}

// ❗ Async action creators
export const fetchQuiz = () => dispatch => {
  // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
  // On successful GET:
  // - Dispatch an action to send the obtained quiz to its state
  dispatch({type: QUIZ_RESET})
  axios.get(`http://localhost:9000/api/quiz/next`)
    .then(res => {
      const payload = res.data;
      dispatch(setQuiz(payload));
    })
    .catch(err => {
      console.error(err);
    })
}

export const postAnswer = (payload) => dispatch => {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    dispatch({type: SET_SELECTED_ANSWER, payload: null})
    axios.post(`http://localhost:9000/api/quiz/answer`, payload)
      .then(res => {
        const newMessage = res.data.message;
        dispatch(setMessage(newMessage));
        dispatch(fetchQuiz());
      })
      .catch(err => {
        console.error(err)
      })
}

export const postQuiz = (quizData) => dispatch => {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  axios.post(`http://localhost:9000/api/quiz/new`, quizData)
    .then(res => {
      console.log(res.data.question)
      dispatch(resetForm())
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
    })
    .catch(err => {
      console.error(err)
    })
  
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
