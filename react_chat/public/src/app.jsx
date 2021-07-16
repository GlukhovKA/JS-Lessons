/** @jsx React.DOM */
$(function () {
  $('#connect-btn').on('click', () => {
    initChat($('#username-input').val(), $('#container')[0]);
    console.log(
      `Chat connection initiated with username:${$('#username-input').val()}`
    );
  });

  function initChat(username, container) {
    React.renderComponent(
      <ChatBox chatProxy={new ChatEmitter()} username={username}></ChatBox>,
      container
    );
  }
});
