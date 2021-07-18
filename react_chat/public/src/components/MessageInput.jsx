/** @jsx React.DOM */

var MessageInput = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
        return {
            message: ''
        }
    },

    keyHandler: function(event) {
        var message = this.state.message;
        if (event.keyCode === 13 && message.length){
            this.props.messageHandler(message);
            this.setState({
                message: ''
            })
        }
    },

    render: function() {
        return (
            <input 
                className="form-control" type="text"
                placeholder="Enter your message..."
                valueLink={this.linkState("message")}
                onKeyUp={this.keyHandler}
            />
        )
    }
})
