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
            regex: '([\\w\$\.\-]+)',
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
            Object.assign.apply(Object, [{}].concat(this.options.filename.split(',')
                .map(function map_paths(p) {

                    p = ((path.isAbsolute(p) ?
                        p :
                        p.startsWith('.') ?
                        require.resolve(path.join(process.cwd(), p.trim())) :
                        p)).trim();

                    var o = require.main.require(p);

                    if (typeof o !== 'object') {
                        console.warn('js-vars: "' + p + '" does not export an object, it will be ignored!');
                        return {};
                    }

                    return o;

                })))));

    },

    setOptions: function(filename) {

        this.options = { filename: filename };

    },

    printUsage: function() {

        return '--js-vars=options';

    }

};

module.exports = JSVarsPlugin;
