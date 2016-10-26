module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        screeps: {
            options: {
                email: '',
                password: '',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['deploy'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    var email = grunt.option('email');
    var password = grunt.option('password');
    var branch = grunt.option('branch');

    grunt.registerTask('deploy',function(){
        grunt.config.set('screeps.options.email', email);
        grunt.config.set('screeps.options.password', password);
        grunt.config.set('screeps.options.branch', branch || 'default');
        grunt.task.run('screeps');
    });
};
