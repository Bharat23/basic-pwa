var gulp = require('gulp');

gulp.task('generate-service-worker',function (callback) {
    var swPrecache = require('sw-precache');
    var rootDir = 'app';

    swPrecache.write(`${rootDir}/sw.js`, {
       staticFileGlobs: [rootDir + '/static/**/*.{js,css,png,jpeg,jpg}','app/index.html'],
       stripPrefix: (rootDir+'/static'),
        stripPrefixMulti: {
        'app/static': '/',
        'app/': '/'
        }
    }, callback);
});