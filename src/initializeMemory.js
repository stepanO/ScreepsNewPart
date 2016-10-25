var constants = require('role.harvester');
var _ = require('lodash');

var memory = function(){
    _.forEach(constants.roles, function(role) {
        if (Memory.creeps[role]) {
            Memory.creeps[role] = {};
        }
    })

}

module.exports = memory;