var mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ehealthyfieweb:12345@ds135926.mlab.com:35926/healthyfie',option)
.then(function(){
    //connected successfully
}, function(err) {
    //err handle
});


