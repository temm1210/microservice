var micro_member = require('./server-info/server-info').NodeKeeper;
var connectToKeeper = require('./clients/connect-to-keeper');

connectToKeeper(micro_member,(keeperInfo) => {
    console.log('testestst');
    console.log('##############  RECEIVE MESSAGE ############## \n', keeperInfo);
})

