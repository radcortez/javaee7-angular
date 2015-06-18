'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    /*
     *   Time how long grunt tasks take to run, this might be important when having complex builds that take forever.
     *   For now just to show how fancy grunt is.
     */
    require('time-grunt')(grunt);

    // init required configurations for each task.
    grunt.initConfig({

            // Project settings
            config: {
                path: {
                    webapp: {
                        root: 'src/main/webapp'
                    },
                    temp: {
                        root: 'temp'
                    },
                    build: {
                        root: 'build'
                    }
                }
            },

            // From grunt-contrib-clean
            clean: {
                build: [
                    '<%= config.path.temp.root %>',
                    '<%= config.path.build.root %>'
                ]
            },

            // From grunt-bower-install-simple. Downloads the web dependencies.
            "bower-install-simple": {
                options: {
                    color:       true
                },
                "prod": {
                    options: {
                        production: true
                    }
                },
                "dev": {
                    options: {
                        production: false
                    }
                }
            },

            // From grunt-wiredep. Automatically inject Bower components into the HTML file
            wiredep: {
                target: {
                    src: '<%= config.path.webapp.root %>/index.html',
                    ignorePath: '<%= config.path.webapp.root %>'
                }
            },

            // From grunt-contrib-concat. This is usefull when we have more than one css file, not the case now...
            /*
            concat: {
                styles: {
                    src: [
                        '<%= config.path.webapp.root %>/css/style.css',
                    ],
                    dest: '<%= config.path.temp.root %>/concat/css/application.css'
                }
            },
            */

            // From grunt-contrib-copy. Copies remaining files to places other tasks can use
            copy: {
                build: {
                    files: [
                        {
                            src: '<%= config.path.webapp.root %>/index.html',
                            dest: '<%= config.path.build.root %>/index.html'
                        }
                    ]
                }
            },

            // From grunt-contrib-htmlmin. Minifies index.html file.
            htmlmin: {
                prod: {
                    options: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true,
                        removeCommentsFromCDATA: true,
                        removeEmptyAttributes: true,
                        removeOptionalTags: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.path.build.root %>',
                            src: ['index.html'],
                            dest: '<%= config.path.build.root %>'
                        }
                    ]
                }
            },

            // From grunt-usemin. Reads HTML for usemin blocks to enable smart builds
            useminPrepare: {
                html: '<%= config.path.webapp.root %>/index.html',
                options: {
                    staging: '<%= config.path.temp.root %>',
                    root: '<%= config.path.webapp.root %>',
                    dest: '<%= config.path.build.root %>'
                }
            },

            // From grunt-usemin.
            usemin: {
                html: '<%= config.path.build.root %>/index.html'
            },

            // From grunt-contrib-uglify.
            uglify: {
                options: {
                    mangle: false
                }
            }
        }
    );

    // Task: Build production version ready for deployment
    grunt.registerTask('install', [
        'clean:build',
        'bower-install-simple',
        //'concat:styles',
        'wiredep',
        'useminPrepare',
        'concat:generated',
        'cssmin',
        'uglify',
        'copy:build',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('process-resources', [
        'bower-install-simple',
        'wiredep',
    ]);

    grunt.registerTask('default', [
        'install'
    ]);
};
