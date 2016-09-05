import React from 'react'
import ReactDom from 'react-dom'

import {text} from './data.js'

const Word = ({word, onWordClick}) => {
  const onClick = () => {
    onWordClick(word);
  }
  return <span className="word" onClick={onClick}>{word}</span>;
}

const Phrase = ({content, onWordClick}) => {
  const words = content.split(/[\ \n]+/);
  return (
    <p>
      {words.map((w, i) => <Word key={i} word={w} onWordClick={onWordClick}/>)}
    </p>);
}

const Text = ({text, onWordClick}) => {
  const phrases = text.split(/\n{2,}/);
  return (
    <div className="text">
      {phrases.map((s, i) => <Phrase content={s} key={i} onWordClick={onWordClick}/>)}
    </div>);
}

const App = React.createClass({
  getInitialState() {
    return {word: ''}
  },
  selectWord(word) {
    this.setState({word})
  },
  render() {
    return <div className="app">
      <Text text={text} onWordClick={this.selectWord}/>
      <Dictionary word={this.state.word}/>
    </div>;

  }
})

const Dictionary = ({word}) => {
  return <div className="dictionary">
    <iframe src={"http://www.wordreference.com/fren/" + word}></iframe>
  </div>
}

ReactDom.render(<App />, document.getElementById('app'));
