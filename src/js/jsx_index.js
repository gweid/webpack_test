import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: 'hello, jsx'
        }
    }

    render() {
        return (
            <div>{this.state.message}</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('jsx'))