import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectAnswer, fetchQuiz, postAnswer } from '../state/action-creators'

function Quiz(props) {
  const { quiz, selectedAnswer, selectAnswer, fetchQuiz, postAnswer } = props;

  const handleSelect = (evt) => {
    const answerID = evt.target.dataset.answerid;
    selectAnswer(answerID);
  }

  const handleSubmit = () => {
    const payload = {"quiz_id": quiz.quiz_id, "answer_id": selectedAnswer};
    postAnswer(payload);
  }
  
  useEffect(() => {    
    !quiz && fetchQuiz('next');
  },[])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${selectedAnswer === quiz.answers[0].answer_id ? 'selected' : ''}`}>
                {quiz.answers[0].text}
                <button data-answerid={`${quiz.answers[0].answer_id}`} onClick={(evt) => handleSelect(evt)}>
                  {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer ${selectedAnswer === quiz.answers[1].answer_id ? 'selected' : ''}`}>
                {quiz.answers[1].text}
                <button data-answerid={`${quiz.answers[1].answer_id}`} onClick={(evt) => handleSelect(evt)}>
                  {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn"
              disabled={selectedAnswer ? false : true}
              onClick={() => handleSubmit()}
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, { selectAnswer, fetchQuiz, postAnswer })(Quiz)
