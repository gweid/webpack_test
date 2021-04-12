// NormalLoader
module.exports = function(content, sourcemap, meta) {
  console.log('NormalLoader 2')
  return content
}

// PitchLoader
module.exports.pitch = function() {
  console.log("PitchLoader 2");
}
