import React, {Component} from 'react'


class App extends Component{
    render() {
        return (
            <ul className="my-list">
                <li>{true?'jishupang':'fds'}</li>
                <li>jishupang</li>
            </ul>
        )

        // var child1 = React.createElement('li', null, 'jspang')
        // var child2 = React.createElement('li', null, 'jspang')
        // var root = React.createElement('ul', {className:'my-list'}, child1, child2)
    }
}

export default App