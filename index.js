var path = require('path');
var polate = require('@quenk/polate').polate;

function VariablePreProcessor(context) {

    this.context = context || {};

}

VariablePreProcessor.prototype = {

    process: function(src, data) {

        return polate(src, this.context, {
            start: '__',
            end: '__',
            regex: '([\\w]+)',
            leaveMissing: true
        });

    }

};

function JSVarsPlugin(filename) {

    this.minVersion = [2, 0, 0];
    this.options = { filename: filename || 'less.js' };

}

JSVarsPlugin.prototype = {

    install: function(less, pluginManager) {

        pluginManager.addPreProcessor(new VariablePreProcessor(
            require(require.resolve(path.join(process.cwd(), this.options.filename)))));

    },

    setOptions: function(filename) {

        this.options = { filename: filename };

    },

    printUsage: function() {

        return '--js-vars=options';

    }

};

module.exports = JSVarsPlugin;
