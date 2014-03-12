/* Test gulpfile */

/* Load Gulp Taks */
var gulp = require('gulp');
var clean = require('gulp-clean');
var rimraf = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var coffeelint = require('gulp-coffeelint');
var clean = require('gulp-clean');
var less = require('gulp-less');
var recess = require('gulp-recess');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var lr = require('tiny-lr');
var refresh = require('gulp-livereload');
var server = lr();

/* Clean our Files */
gulp.task('wipeAssets', function() {
	return gulp.src([
			'/assets'
		])
		.pipe(rimraf());
});

/* Move our HTML to the root of the project */
gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('./'))
		.pipe(refresh(server));
});

/* Copy our Files */
gulp.task('images', function () {
	/* Clean Images from Assets */
	gulp.src([
			'/assets/img/**'
		])
		.pipe(clean());

	/* Move Images to Assets */
	return gulp.src([
			'src/img/**'
		])
		.pipe(gulp.dest('assets/img'))
		.pipe(refresh(server));
})

/* Tasks for Scripts */
gulp.task('scripts', function() {
	/* JSHint the Scripts */
	gulp.src(['src/js/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('src/compiled/js/'));

	/* CoffeeLint Coffeescripts */
	gulp.src(['src/coffee/**/*.coffee'])
		.pipe(coffeelint())
		.pipe(coffeelint.reporter())
		.pipe(coffee({bare: true}).on('error', console.log))
		.pipe(gulp.dest('src/compiled/js/'));

	/* Move JQuery */
	gulp.src([
			'src/vendor/jquery/jquery.js'
		])
		.pipe(gulp.dest('src/compiled/js'));

	/* Move IE Bootstrap */
	gulp.src([
			'src/vendor/bootstrap/assets/js/html5shiv.js',
			'src/vendor/bootstrap/assets/js/respond.min.js'
		])
		.pipe(gulp.dest('src/compiled/js'));
	
	/* Concat BootstrapJS Files */
	gulp.src([
			'src/vendor/bootstrap/js/transition.js',
			'src/vendor/bootstrap/js/alert.js',
			'src/vendor/bootstrap/js/button.js',
			'src/vendor/bootstrap/js/carousel.js',
			'src/vendor/bootstrap/js/collapse.js',
			'src/vendor/bootstrap/js/dropdown.js',
			'src/vendor/bootstrap/js/modal.js',
			'src/vendor/bootstrap/js/tooltip.js',
			'src/vendor/bootstrap/js/popover.js',
			'src/vendor/bootstrap/js/scrollspy.js',
			'src/vendor/bootstrap/js/tab.js',
			'src/vendor/bootstrap/js/affix.js'
		])
		.pipe(concat("bootstrap.js"))
		.pipe(gulp.dest('src/compiled/js'));

	/* Concat all JS Files and move to Assets */
	return gulp.src([
			'src/compiled/js/jquery.js',
			'src/compiled/js/bootstrap.js',
			'src/compiled/js/site.js',
		])
		.pipe(concat('combined.js'))
		.pipe(gulp.dest('assets/js'))
		.pipe(refresh(server));

	/* Move our IE Compat Scripts */
	gulp.src([
			'src/compiled/js/boxsizing.htc',
			'src/compiled/js/html5shiv.js',
			'src/compiled/js/respond.min.js'
		])
		.pipe(gulp.dest('assets/js'));
});

/* Tasks for our Styles */
gulp.task('styles', function() {
	/* Compile the Bootstrap Less */
	gulp.src('src/vendor/bootstrap/less/bootstrap.less')
		.pipe(less())
		.pipe(gulp.dest('src/compiled/css'));

	/* Compile our Less */
	gulp.src('src/less/site.less')
		.pipe(recess())
		.pipe(less())
		.pipe(gulp.dest('src/compiled/css'));

	/* Concat all CSS Files and move to Assets */
	return gulp.src([
			'src/compiled/css/bootstrap.css',
			'src/compiled/css/site.css',
		])
		.pipe(concat('combined.css'))
		.pipe(gulp.dest('assets/css'))
		.pipe(refresh(server));

	/* Move our IE Compat Bootstrap Style */
	gulp.src('src/compiled/css/bootstrap-ie7.css')
		.pipe(gulp.dest('assets/css'));
});

/* The Default Build Task */
gulp.task('default', function() {
	gulp.run('wipeAssets', 'html', 'images', 'scripts', 'styles');
});

/* The Watch (Livereload) Task */
gulp.task('watch', function() {
	/* Start the livereload server */
	server.listen(35729, function (err) {
		/* If Error, show us */
    	if (err) return console.log(err);

		/* Watch our HTML, run html task on Change */
		gulp.watch([
				'src/*.html'
			], function(event) {
				gulp.run('html');
			});

		/* Watch our IMGs, run images task on Change */
		gulp.watch([
				'src/img/**'
			], function(event) {
				gulp.run('images');
			});

		/* Watch our Scripts, run scripts task on Change */
		gulp.watch([
				'src/**/*.coffee',
				'src/js/*.js',
				'src/compiled/js/*.js',
			], function(event) {
				gulp.run('scripts');
			});

		/* Watch our Styles, run styles task on Change */
		gulp.watch([
				'src/less/*.less',
				'src/**/*.css',
			], function(event) {
				gulp.run('styles');
			});
	});
});

/* Wipes the /dist directory */
gulp.task('wipeDist', function() {
	return gulp.src('./dist')
		.pipe(rimraf());
});

/* Builds the site to the /dist directory */
gulp.task('build', ['wipeDist'], function() {
	/* Move our HTML */
	gulp.src('./*.html')
		.pipe(gulp.dest('dist'));

	/* Move our IMG */
	gulp.src([
			'src/img/**'
		])
		.pipe(gulp.dest('dist/assets/img'));

	/* Uglify our JS */
	gulp.src('assets/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js/'));
	
	/* UnCSS & Minify our CSS */
	gulp.src([
			'assets/css/combined.css'
		])
		.pipe(uncss({
			html: [
				'index.html'
			]
		}))
		.pipe(csso())
		.pipe(gulp.dest('dist/assets/css'));
});