import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, QUIZ_RESET, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, RESET_FORM, INPUT_CHANGE, SET_INFO_MESSAGE } from './action-types.js'
// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      return action.payload
    case MOVE_COUNTERCLOCKWISE:      
      return action.payload
    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case QUIZ_RESET:
      return ''
    case SET_QUIZ_INTO_STATE:
      return {
        question: action.payload.question,
        answers: action.payload.answers,
        quiz_id: action.payload.quiz_id
      }
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case SET_SELECTED_ANSWER:
      return action.payload
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case SET_INFO_MESSAGE:
      if (action.payload === "") {
        return initialMessageState
      } else {
        return state = action.payload
      }
    default: 
      return state
    }
  }

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload[0]]: action.payload[1]
      }
    case RESET_FORM:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
