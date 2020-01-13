
let 	gulp 			= require('gulp'), 					// Main lib.
		sass 			= require('gulp-sass'), 			// Compile SASS to CSS.
		browserSync  	= require('browser-sync'), 			// Live reload.
		autoprefixer 	= require('gulp-autoprefixer'), 	// Add the desired vendor prefixes. 
		uglify 			= require('gulp-uglify'), 			// Minify JS files.
		sourcemaps 		= require('gulp-sourcemaps'), 		// Create CSS sourcemap.
		concat       	= require('gulp-concat');			// Concatatenate CSS files.




// Server
gulp.task('server', () => {
	browserSync.init({
		server: 'app', // Base site dir.
		online: true, // Work online without checking.
		// tunnel: true, // Access from outside.
		// tunnel: "temp20200301" // Attempt to use the URL "http://temp20200301.localtunnel.me".
	})


});




// Style
gulp.task('sass', async () => {
	gulp.src('app/sass/**/*.sass') // Getting all items.
		/*............	Create style.css 		............*/
		.pipe(sourcemaps.init()) // Wrap tasks in a sourcemap.
	    .pipe(sass({ // Compile Sass using gulp-sass.
	    	outputStyle: 'expanded' // Options: nested, expanded, compact, compressed.
	    }).on('error', sass.logError)) // Log sass error.
		.pipe(concat('style.css')) // Concatenate style files.
		.pipe(autoprefixer()) // Add the desired vendor prefixes.
	    .pipe(sourcemaps.write()) // Create sourcemap.
	    .pipe(gulp.dest('app/css/')) // Create style.css.
		/*............	Create style.min.css 	............*/
		.pipe(sourcemaps.init()) // Wrap tasks in a sourcemap.
	    .pipe(sass({ // Compile Sass using gulp-sass.
	    	outputStyle: 'compressed' // Options: nested, expanded, compact, compressed.
	    }).on('error', sass.logError)) // Log sass error.
		.pipe(concat('style.min.css')) // Concatenate style files.
		.pipe(autoprefixer()) // Add the desired vendor prefixes.
	    .pipe(sourcemaps.write()) // Create sourcemap.
	    .pipe(gulp.dest('app/css/')) // Create style.css.
		.pipe(browserSync.stream()); // Sass live reload.
});



// Script
gulp.task("lib", () => {
	gulp.src([
		'PATH/**/*.js', //add lib item
		'', //add lib item
	]) // Getting all items.
	.pipe(concat('libs.min.js'))// Add path  to files for create new lib.
	.pipe(uglify())
	.gulp(gulp.dest('app/js/'))
    .pipe(browserSync.reload()); // JS live reload.

})

gulp.task("script", () => {
	gulp.src('app/js/**/*.js') // Getting all script items.
		.pipe(concat('script.min.js')) // Concatenate style files.
		.pipe(uglify()) // Minify js 
	    .pipe(gulp.dest('app/js/')) // Create script.min.js.
        .pipe(browserSync.reload({ stream: true })); // JS live reload.

})

gulp.task('code', async () => {
	gulp.src('app/**/*.html')
		.pipe(browserSync.reload({ stream: true }));
});

// Watch
gulp.task("watch", () => {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // SASS live reload
    gulp.watch('app/*.html', gulp.parallel('code'));// HTML live reload
    gulp.watch('app/js/*.js', gulp.parallel('script')); // JS live reload
})

gulp.task('default', gulp.parallel('sass', 'script', 'server', 'watch'));



