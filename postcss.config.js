module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('postcss-functions')({
      functions: { rem, em, vw }
    }),
    require('postcss-nesting'),
    require('cssnano')
  ]
};

function rem (value, base = 16) {
  value = resolveValue(value);
  return `${parseInt(value) / base}rem`;
}

function em (value, base = 16) {
  value = resolveValue(value);
  return `calc(${value} / ${base} * 1em)`;
}

function vw (value, viewport = 375, min = '1rem') {
  value = resolveValue(value);
  return `max(${value / viewport * 100}vw, ${min})`;
}

const resolveValue = (value) => {
  if (value.endsWith('value')) {
    return parseInt(value);
  } else {
    return String(value).replace('calc', '').replace('px', '');
  }
};
