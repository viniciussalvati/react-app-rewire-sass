# react-app-rewire-sass
Adds SASS to your react-app-rewired.

**NOT YET TESTED FOR PRODUCTION BUILDS**

## How this package works

- We find the rule that contains a css-loader wherever its being used, included by react-scripts itself
- Make a copy of it
- Add the sass loader to the copy
- Add the copied+modified rule to the build pipeline

## Usage

```javascript
const react_app_rewired = require('react-app-rewired');

module.exports = require('react-app-rewire-sass')(/* options */);

// or

module.exports = function override(config, env) {

	const rewire = react_app_rewired.compose(
		// ...
		require('react-app-rewire-sass')(/* options */),
		// ...
		// If you're to modify the default css-loader, modify it here
	);

	config = rewire(config, env);

	return config;
};
```

## Customization

You can pass a options object to the builder. The options contains the property [sassOptions], that will be the options passed to the sass-loader.