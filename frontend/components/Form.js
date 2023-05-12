import React from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz } from '../state/action-creators'

export function Form(props) {
  const { newQuestion, newTrueAnswer, newFalseAnswer, inputChange, postQuiz } = props;

  const onChange = evt => {
    const { id, value } = evt.target
    inputChange(id, value)
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const quizData = {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    };
    postQuiz(quizData)
  }

  let disable = newQuestion.trim().length > 1 && newTrueAnswer.trim().length > 1 && newFalseAnswer.trim().length > 1 ? false : true;

  return (
    <form id="form" onSubmit={(evt) => onSubmit(evt)}>
      <h2>Create New Quiz</h2>
      <input name='question' value={newQuestion} maxLength={50} onChange={(evt) => onChange(evt)}id="newQuestion" placeholder="Enter question"/>
      <input name='correct' value={newTrueAnswer} maxLength={50} onChange={(evt) => onChange(evt)} id="newTrueAnswer" placeholder="Enter true answer" />
      <input name='incorrect' value={newFalseAnswer} maxLength={50} onChange={(evt) => onChange(evt)} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={disable}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer
  }
}

export default connect(mapStateToProps, { inputChange, postQuiz })(Form)
