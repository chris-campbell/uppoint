import React from 'react'

function SuggestionInput({ inputElement, searchTerm, getSearchTerm }) {
  return (
    <input
      id="sender-suggestion"
      ref={inputElement}
      value={searchTerm}
      placeholder="Type a name..."
      onChange={() => getSearchTerm()}
    />
  )
}

export default SuggestionInput
