module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['jquery.formValidator.js'],
				dest: 'build/jquery.formValidator.min.js',
			},
		},

		uglify: {
			compress: {
				files: {
					'build/jquery.formValidator.min.js': ['jquery.formValidator.js']
				}
			},
			options: {
				drop_console: true,
				compress: true,
				beautify: false
			}
		},

		watch: {			
			scripts: {
				files: ['*.js'],
				tasks: ['concat'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// default task
	grunt.registerTask('default', ['concat', 'uglify']);
	// grunt w
	grunt.registerTask('w', ['concat', 'uglify']);


};
