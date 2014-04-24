'use strict';
var jshintcli = require('jshint/src/cli');
var jshintConfig = jshintcli.loadConfig('.jshintrc');
delete jshintConfig.dirname;

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		version_number: '<%= pkg.version %>',
		webpack: {
			dev: {
				cache: true,
				entry: __dirname + '/public/src/main.js',
				output: {
					path: '.build/js/',
					// publicPath: '/js/',
					filename: 'app.js'
				},
				module: {
					loaders: [{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "jshint"
					}, {
						test: /\.js$/,
						loader: 'jsx-loader'
					}]
				},
				jshint: jshintConfig
			}
		},
		copyto: {
			dev: {
				files: [{
					cwd: 'public/images',
					src: ['**.png', '**.gif', '**.jpg'],
					dest: '.build/images/'
				}, {
					cwd: 'public/styles',
					src: ['**.css'],
					dest: '.build/styles/'
				}, {
					cwd: 'public/vendor',
					src: ['**.js'],
					dest: '.build/vendor/'
				}]
			}
		},
		clean: {
			'build': '.build'
		},
		less: {
			dev: {
				options: {
					sourceMap: true
				},
				files: {
					'.build/styles/less-style.css': 'public/styles/*.less'
				}
			}
		},
		watch: {
			webpack: {
        files: ["src/**/*"],
        tasks: ["webpack"],
        options: {
          spawn: false,
          livereload: 3003
        }
      },
      vendor: {
        files: [
          'public/images/**',
          'public/vendor/*.js',
          'public/styles/*.css'
        ],
        tasks: ['copyto']
      },
      less: {
      	files: ['public/styles/*.less'],
      	tasks: ['less']
      }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-copy-to')
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('dev', [
		'clean',
		'less',
		'copyto',
		'webpack'
	]);
};