//@ts-check
const path = require('path');
const { getLoader } = require('react-app-rewired');
const { cloneDeep } = require('lodash');

/**
 * @typedef CssModuleOptions
 * @prop {*} [sassOptions] The options to pass to the css-loader.
 */

/**
 *
 * @param {CssModuleOptions} [options]
 */
module.exports = (options = { sassOptions: {} }) => (config, env) => {

	/** @type {*} */
	const originalLoader = getLoader(config.module.rules, rule => rule.test && rule.test.toString().indexOf('.css') !== -1);

	// Makes a copy of the original loader so we don't interfere with the current behavior for .css files
	const loader = cloneDeep(originalLoader);

	loader.test = /\.(scss)|(sass)$/

	const sassRule = {
		loader: 'sass-loader',
		options: options.sassOptions
	};

	(loader.use || loader.loader).push(sassRule);

	config.module.rules.filter(rule => rule.oneOf)[0].oneOf.splice(0, 0, loader);

	return config;
}