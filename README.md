# postcss-theme-properties
Moves CSS custom properties defined within a theme class to :root. This lets postcss-custom-properties process the file with themed properties.

Useful if you use a class on body to set the CSS custom properties for the current theme and need to create fallback CSS for browsers that don't support CSS custom properties

Modern browsers can load a single CSS file and you can conditionally load the additional fallback CSS for old browsers.

Declarations not using custom properties are stripped to keep the additional CSS small.

## Install
```npm install -D @dstaver/postcss-theme-properties```

## Usage
```js
// postcss.config.js

module.exports = {
  plugins: [
    require('@dstaver/postcss-theme-properties')({
      themeSelector: '.theme-blue' // The theme you want to generate CSS for
      themeSelectors: ['.theme-blue','.theme-green'] // All themes present in the file. Used to strip unused theme CSS 
    }),
    require('postcss-custom-properties')({
      preserve: false
    })
  ]
}
```

### Input CSS
```css
:root {
  --color-primary: red;
  --color-secondary: orange;
}

.theme-blue {
  --color-primary: deepskyblue;
  --color-secondary: lightskyblue;
}

.theme-green {
  --color-primary: limegreen;
  --color-secondary: greenyellow;
}

.primary {
  font-weight: bold;
  color: var(--color-primary);
}

.secondary {
  font-weight: bold;
  color: var(--color-secondary);
}
```

## Output CSS
```css
.primary {
  color: deepskyblue;
}

.secondary {
  color: lightskyblue;
}
```
