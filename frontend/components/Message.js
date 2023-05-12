import React from 'react'
import { connect } from 'react-redux'

function Message(props) {
  const { infoMessage } = props
  return <div id="message">{infoMessage && <p>{infoMessage}</p>}</div>
}

function mapStateToProps(state) {
  return{
    infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps ,{})(Message)
