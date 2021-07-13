function ChatEmitter(){
    EventEmitter.call(this);
    this._peers={};
}

ChatEmitter.prototype = Object.create(EventEmitter.prototype);