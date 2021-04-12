// NormalLoader
module.exports = function(content, sourcemap, meta) {
  console.log('NormalLoader 1')
  return content
}

// PitchLoader
// module.exports.pitch = function() {
//   console.log("PitchLoader 1");
// }
