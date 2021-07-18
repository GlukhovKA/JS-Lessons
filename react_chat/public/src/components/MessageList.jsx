/** @jsx React.DOM */

'use strict'

var MessagesList = React.createClass({
    getInitialState: function() {
        return {
            messages: []
        }
    },

    addMessage: function(message) {
        var messages = this.state.messages
        var container = this.refs.msgContainer.getDOMNode()
        messages.push(message)
        this.setState ({
            messages: messages
        })
    },

    componentDidUpdate: function() {
        var container = this.refs.msgContainer.getDOMNode()
        container.scrolltop = container.scrollHeight
    },

    render: function() {
        var messages
        if (this.state ===null) return
        messages = this.state.messages.map(function(msg) {
            return (
                <ChatMessage message = {msg}></ChatMessage>
            )
        })
        if (!messages.length) {
            messages = <div>
                <div className="chat-messages-empty">empty... type new message </div>
            </div>;
        }
        return(
            <div ref="msgContainer" className="chat-messages col-xs-9 col-md-8 col-lg-8">
                {messages}
            </div>
        )
    }
})