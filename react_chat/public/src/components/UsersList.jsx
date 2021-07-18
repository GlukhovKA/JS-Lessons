/**@jsx React.DOM */

'use strict';

var UsersList = React.createClass({
    render: function(){
        var users= this.props.users.map(function(user){
            return <div className='chat-user'>{user}</div>
        })
        return(
            <div className="activeUsers">
                <p>Active users</p>
                <div className="UsersOnFrame">{users}</div>
            </div>
        )
    }
}
)