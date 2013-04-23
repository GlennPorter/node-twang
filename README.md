Twang for Node.js
=================

Twang is a Node.js package that twangs (requests!) a URL at pre-defined intervals and then executes a command if it becomes unavailable. This can be useful when you want to monitor a web service and do something (like restart it) if it fails to respond.

### Installation

To install, run:

'''
npm install twang
'''

The app requires a config file which includes what URL you wish to twang and the command that will be executed if this fails to respond. Sample configuration can be found in config.sample.json.

To start the app, run:

'''
node app -config config.json
'''

...where config.json is the name of your configuration file.

### Configuration

* _interval_: The interval (in milliseconds) at which the app will twang the URL.
* _url_: The URL that will be twanged!
* _command_: The command that will be executed if the request to the URL doesn't return a response. This should be something that is either in the current directory or on the path (eg. "ipconfig" on Windows).
* _log_: A boolean value which determines whether to output stuff.