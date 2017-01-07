var autoprefixer    = require('autoprefixer');
var browserSync     = require('browser-sync').create();
var reload          = browserSync.reload;
var mqpacker        = require('css-mqpacker');
var cssnano         = require('cssnano');
var del             = require('del');
var cache           = require('gulp-cache');
var concat          = require('gulp-concat');
var gulp            = require('gulp');
var imagemin        = require('gulp-imagemin');
var jshint          = require('gulp-jshint');
var postcss         = require('gulp-postcss');
var shell           = require('gulp-shell');
var size            = require('gulp-size');
var sourcemaps      = require('gulp-sourcemaps');
var uglify          = require('gulp-uglify');
var uncss           = require('gulp-uncss');
var util            = require('gulp-util');
var watch           = require('gulp-watch');
var calc            = require('postcss-calc');
var color           = require('postcss-color-function');
var media           = require('postcss-custom-media');
var properties      = require('postcss-custom-properties');
var comments        = require('postcss-discard-comments');
var atImport        = require('postcss-import');
var nested          = require('postcss-nested');
var pump            = require('pump');

var input			= {
	'css': './css/jekyons.css'
}

var output			= {
	'css': './_site/css'
}

// Task for processing styles
gulp.task('css', function(){

	var processors 	= [
		atImport,
		media,
		nested,
		properties,
		calc,
		color,
		comments,
		autoprefixer,
		cssnano,
		mqpacker
	];

	return gulp.src(input.css)
		.pipe(postcss(processors))

		.pipe(size({
			gzip: true,
			showFiles: true,
			title: 'Size all gZippered up ->'
		}))

		.pipe(gulp.dest(output.css))

		.pipe(browserSync.stream())
});


// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function() {
    browserSync.init({server: {baseDir: '_site/'}});
});

// Task for reloading the browser
gulp.task('bs-reload', function(){
	browserSync.reload();
});

// Default gulp task
gulp.task('default', ['build', 'css', 'bs-reload', 'serve'], function() {
	gulp.watch('css/*', ['css']);
	gulp.watch(['*.html', './**/*.html'], ['bs-reload']);
});

