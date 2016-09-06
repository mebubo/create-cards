import React from 'react'
import ReactDom from 'react-dom'

import {text} from './data.js'

const Word = ({word, onWordClick}) => {
  const onClick = () => {
    onWordClick(word);
  }
  return <span className="word" onClick={onClick}>{word}</span>;
}

const CardEditor = ({word, phrase}) => {
  return <div>
    <label>Word: <input type="text" value={word}/></label> <br/>
    <label>Context: <textarea rows="10">{phrase}</textarea></label> <br/>
    <label>Translation: <textarea rows="10"></textarea></label>
  </div>;
}

const Phrase = React.createClass({
  getInitialState() {
    return {editingWord: ''}
  },
  onClick(w)  {
    this.props.onWordClick(w);
    this.setState({editingWord: w});
  },

  render() {
    const words = this.props.phrase.split(/[\ \n]+/);
    return (
      <div>
        <p>
          {words.map((w, i) => <Word key={i} word={w} onWordClick={this.onClick}/>)}
        </p>
        {this.state.editingWord ? <CardEditor word={this.state.editingWord} phrase={this.props.phrase} /> : null }
      </div>);
  }
})

const Text = ({text, onWordClick}) => {
  const phrases = text.split(/\n{2,}/);
  return (
    <div className="text">
      {phrases.map((s, i) => <Phrase phrase={s} key={i} onWordClick={onWordClick}/>)}
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
