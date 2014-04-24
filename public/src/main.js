/** @jsx React.DOM */
'use strict';
var text = require('./text');

React.renderComponent(
	<div>{text}</div>, /* jshint ignore:line */
	document.getElementById('appContainer')
);