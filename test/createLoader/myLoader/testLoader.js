// Normal
// module.exports = function(content, sourcemap, meta) {
//   console.log('Normal 2')
//   return content
// }

// Pitch
// module.exports.pitch = function() {
//   console.log("Pitch 2");
// }

module.exports = function(content) {
  console.log('testLoader')
  return content
}
