var http = require('http');
var bl= require('bl');
var async = require('async');

//"http://google.com" , "http://abc.com" , "http://yahoo.com" 
var requestUrls = [];
for(var i = 2; i < process.argv.length; i++)
{
    requestUrls.push(process.argv[i]);
}

//var queue = {};

invokeUrl = function(url, callback){
    
    http.get(url, function(response){
        
        response.pipe( bl (function(err, data){
            
            if(err){ return console.log("URL error: " + err); }
            
            console.log(data.toString());
            
        }));
        
    });        
    
    callback();     
}

async.eachSeries(requestUrls, invokeUrl, function(err){
        
    console.log("Error: " + err);
    
});


