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

function rem (px, base = 16) {
  return `${parseFloat(px) / base}rem`;
}

function em (px, base = 16) {
  return `${parseFloat(px) / base}em`;
}

function vw (px, viewport = 375) {
  return `${parseFloat(px) / viewport * 100}vw`;
}
