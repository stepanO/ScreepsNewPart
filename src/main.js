var _ = require('lodash');
var roleHarvester = require('role.harvester');
var roleTransporter = require('role.transporter');
var memory = require('constants');

module.exports.loop = function () {


    _.forEach(Game.spawns, function(spawn) {
        if (!Memory.spawns[spawn.name]) {
            Memory.spawns[spawn.name] = {
                lastHarvester: 0,
                countHarvesters: 0
            };
        }
        roleHarvester.create(spawn, 0);
        roleTransporter.create(spawn, 0);
    });

    _.forEach(Game.creeps, function(creep) {
        roleHarvester.run(creep);
    })
}