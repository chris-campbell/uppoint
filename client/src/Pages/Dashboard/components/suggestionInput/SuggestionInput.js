import React from 'react'
import './css/SuggestionInput.css'

function SuggestionInput({ inputElement, searchTerm, getSearchTerm }) {
  return (
    <input
      id="sender-suggestion-input"
      ref={inputElement}
      value={searchTerm}
      placeholder="Type a name..."
      onChange={() => getSearchTerm()}
    />
  )
}

export default SuggestionInput
