// Normal 阶段
// module.exports = function(content, sourcemap, meta) {
//   console.log('Normal 1')
//   return content
// }

// Pitch 阶段
// module.exports.pitch = function() {
//   console.log("Pitch 1");
// }

module.exports = function(content) {
  console.log('myLoader')
  return content
}
