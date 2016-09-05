import React from 'react'
import ReactDom from 'react-dom'

const Hello = React.createClass({
  render() {
    return <div>Hello</div>;
  }
})

ReactDom.render(<Hello/>, document.getElementById('app'));
