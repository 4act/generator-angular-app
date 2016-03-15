'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var ccUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {

    ccUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(DirectiveGenerator, yeoman.generators.Base);

DirectiveGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            type: 'confirm',
            name: 'needpartial',
            message: 'Does this directive need an external html file (i.e. partial)?',
            default: true
        },
        {
            name: 'controllerAs',
            message: 'What should be the variable name for the controller (controllerAs)'
        }

    ];

    ccUtils.addNamePrompt(this, prompts, 'directive');

    this.prompt(prompts, function(props) {
        if(props.name) {
            this.name = props.name;
        }
        this.needpartial = props.needpartial;
        this.controllerAs = _.camelize(props.controllerAs);
        ccUtils.askForModuleAndDir('directive', this, this.needpartial, cb);
    }.bind(this));

};

DirectiveGenerator.prototype.files = function files() {

    var configName = 'directiveSimpleTemplates';
    var defaultDir = 'templates/simple';
    if(this.needpartial) {
        configName = 'directiveComplexTemplates';
        defaultDir = 'templates/complex';
    }

    this.ctrlname = _.camelize(_.classify(this.name)) + 'Ctrl';

    this.htmlPath = path.join(this.dir, this.name + '.directive.html').replace(/\\/g, '/');
    this.htmlPath = this.htmlPath.replace('src/', '');

    ccUtils.processTemplates(this.name, ccUtils.getDirWithSrc(this.dir), 'directive', this, defaultDir, configName, this.module);

};
