/**
 * Created by Administrator on 2016/12/5.
 */
bulk=require('bulk-require');

bulk(__dirname, [
    '../controller/**/*.js',
    '../servers/**/*.js',
    '../directives/**/*.js',
    '../filter/**/*.js'
]);


module.exports={};

