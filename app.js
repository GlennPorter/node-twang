var request = require('request');
var nconf = require('nconf');
var exec = require('child_process').exec;

nconf.argv().env();

// get the config file from the -c parameter
var configFile = nconf.get('c');
if (!configFile || configFile === true) {
	configFile = 'config.json';
}
nconf.file({ file: configFile });

// set up some default values
nconf.defaults({
	interval: 60000,
	url: 'http://127.0.0.1:3000/version'
});

var checkUrl = function checkUrl() {
	var url = nconf.get('url');
	request(url, function(error, response, body) {
		// if there was no response, it means that the service must be down
		if (typeof response === 'undefined' || !response || response.statusCode === 404) {
			log('No response from "' + url + '"!');
			// execute the command specified in the config file
			var command = nconf.get('command');
			if (typeof command !== 'undefined' && command !== null) {
				log('Executing "' + command + '"...');
				exec(command, function(error, stdout, stderr) {
					log(stdout);
				});
			}
			else {
				log('No command has been specified in the config file, so not doing anything...');
			}
		}
	});
};

// check the url at the interval configured
setInterval(checkUrl, nconf.get('interval'));


function log(message) {
	console.log(new Date().toISOString() + ': ' + message);
}