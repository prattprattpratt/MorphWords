window.onload = () => {
  const word1Element = document.getElementById('word-1')
  const word2Element = document.getElementById('word-2')
  const lastWordElement = document.getElementById('word-last')
  const word1 = word1Element.textContent
  const lastWord = lastWordElement.textContent

  var word1NewHTML = ''
  for(var i = 0; i < word1.length; i++) {
    word1NewHTML += `
      <span class="letter">${word1[i]}</span>
    `
  }
  word1Element.innerHTML = word1NewHTML

  word2Element.innerHTML = '<input autofocus onkeydown="onLetterInput(event)" class="letter" />'

  var lastWordNewHTML = ''
  for(var i = 0; i < lastWord.length; i++) {
    lastWordNewHTML += `
      <span class="letter">${lastWord[i]}</span>
    `
  }
  lastWordElement.innerHTML = lastWordNewHTML

  onLetterInput = (e) => {
    e.preventDefault()
    const activeWordElement = e.target.parentNode
    const middleWordsContainer = document.getElementById('middle-words')
    if (e.key === 'Backspace') {
      if (activeWordElement.children.length === 1 && middleWordsContainer.children.length === 1) {
        return
      }
      const newInputElement = '<input onkeydown="onLetterInput(event)" class="letter" />'
      var wordElementNewHTML = ''
      if (activeWordElement.children.length === 3) {
        wordElementNewHTML = Array.from(activeWordElement.children).map((l, i) => {
          if (l.tagName === 'INPUT' || l.classList.contains('press-enter-help-text')) {
            return ''
          } else if (i === activeWordElement.children.length - 3) {
            return newInputElement
          } else {
            return l.outerHTML
          }
        }).join('')
      } else {
        wordElementNewHTML = Array.from(activeWordElement.children).map((l, i) => {
          if (l.tagName === 'INPUT') { // the last element
            return ''
          } else if (i === activeWordElement.children.length - 3) { // the penultimate element
            return newInputElement
          } else {
            return l.outerHTML
          }
        }).join('')
      }
      if (wordElementNewHTML === '') {
        activeWordElement.remove()
      } else {
        activeWordElement.innerHTML = wordElementNewHTML
      }

      if (wordElementNewHTML === '') {
        const newActiveWordElement = middleWordsContainer.children[middleWordsContainer.children.length - 1]
        const newInputElement = `<input id="letter-${i + 1}" onkeydown="onLetterInput(event)" class="letter" />`
        const pressEnterHelpTextElement = '<span class="press-enter-help-text">Press enter to continue to the next word</span>'
        newActiveWordElement.innerHTML = newActiveWordElement.innerHTML + newInputElement + pressEnterHelpTextElement
      }

      document.querySelector('input').focus()
    } else if ('abcdefghijklmnopqrstuvwxyz'.includes(e.key.toLowerCase())) {
      var wordElementNewHTML = Array.from(activeWordElement.children).map((l, i) => {
        if (l.tagName === 'INPUT') {
          const letterElement = `<span id="letter-${i}" class="letter">${e.key}</span>`
          const newInputElement = `<input id="letter-${i + 1}" onkeydown="onLetterInput(event)" class="letter" />`

          return letterElement + newInputElement
        } else { 
          return l.outerHTML
        }
      }).join('')

      if (activeWordElement.children.length === 1) {
        const pressEnterHelpTextElement = '<span class="press-enter-help-text">Press enter to continue to the next word</span'
        wordElementNewHTML += pressEnterHelpTextElement
      }

      activeWordElement.innerHTML = wordElementNewHTML
      document.querySelector('input').focus()
    } else if (e.key === 'Enter') {
      if (activeWordElement.children.length === 1) {
        return
      }

      const children = Array.from(activeWordElement.children)
      children.splice(-2)
      activeWordElement.innerHTML = children.map(el => {
        return el.outerHTML
      }).join('')
      const newWordElement = `
        <div class="word" id="word-${middleWordsContainer.children.length + 2}">
          <input id="letter-1" onkeydown="onLetterInput(event)" class="letter" />
        </div>
      `
      middleWordsContainer.innerHTML += newWordElement
      middleWordsContainer.children[middleWordsContainer.children.length - 1].children[0].focus()
    }
  }
}