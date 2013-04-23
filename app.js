var request = require('request');
var nconf = require('nconf');
var exec = require('child_process').exec;

nconf.argv().env();

var configFile = nconf.get('config');
if (!configFile || configFile === true) {
	configFile = 'config.json';
}
nconf.file({ file: configFile });

nconf.defaults({
	interval: 60000,
	url: 'http://127.0.0.1:3000/version',
	command: 'restart courier-agent',
	log: false
});

var checkUrl = function checkUrl() {
	var url = nconf.get('url');
	log('calling ' + url);
	request(url, function(error, response, body) {
		// if there was no response, it means that the service must be down
		if (typeof response === 'undefined' || !response || response.statusCode === 404) {
			log('No response!');
			log('Executing ' + nconf.get('command') + '...');
			exec(nconf.get('command'), function(error, stdout, stderr) {
				log(stdout);
			});
		}
		else {
			log('Response ok, body is...');
			log(body);
		}
	});
};


// check the url at the interval configured
setInterval(checkUrl, nconf.get('interval'));


function log(message) {
	if (nconf.get('log')) {
		console.log(message);
	}
}