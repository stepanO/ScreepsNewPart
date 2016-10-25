var roleTransporter = {
    body: [
        [CARRY, CARRY, MOVE],
    ],
    role: 'harvester',

    /** @param {Creep} creep **/
    run: function(creep) {
        var targetCreep = _.find(Game.creeps, function(creepTarget) {
            return !Memory.creeps[creep.role][creepTarget.name].target;
        })
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    },
    create: function(spawn, stage) {
        if (spawn.energy > 200 && spawn.canCreateCreep(roleTransporter.body[stage], roleHarvester.params.role + '_' + Memory.spawns[spawn.name].lastTransporter)) {
            var error = spawn.createCreep(roleTransporter.body[stage], null, roleHarvester.params.role + '_' + Memory.spawns[spawn.name].lastTransporter);
            if (!error) {
                console.warn(error);
            } else {
                Memory.spawns[spawn.name].countHarvesters++;
            }
        }
    }
};

module.exports = roleTransporter;