var roleHarvester = {
    body: [
        [WORK, CARRY, MOVE]
    ],
    role: 'harvester',
    /** @param {Creep} creep **/
    run: function(creep) {
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
        if (spawn.energy > 200 && spawn.canCreateCreep(roleTransporter.body[stage], roleTransporter.role + '_' + Memory.spawns[spawn.name].lastHarvester) && Memory.spawns[spawn.name].countHarvesters < 3 && Memory.spawns[spawn.name].countHarvesters <= Memory.spawns[spawn.name].countTransporter) {
            var error = spawn.createCreep(roleHarvester.params.body[stage], null, roleHarvester.params.role + '_' + Memory.spawns[spawn.name].lastHarvester);
            if (!error) {
                console.warn(error);
            } else {
                Memory.spawns[spawn.name].countHarvesters++;
            }
        }
    }
};

module.exports = roleHarvester;