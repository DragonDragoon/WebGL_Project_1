// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';   // Set color to black
  ctx.fillRect(120, 10, 150 * 1.5, 150);  // Fill a rectangle with the color

  // Draw a new rectangle
  ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set color to
  ctx.fillRect(120, 210, 200, 200);        // Fill a rectangle with the color

  // Draw an array of rectangles
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
      var r = Math.round(255 / (x + 1)),
          g = Math.round(255 / (y + 1)),
          b = 0;
      console.log('rgba(' + r + ', ' + g + ', ' + b + ', 1.0)');
      ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 1.0)'; // Set color to grayscale
      ctx.fillRect(120 + 50 * x, 500 + 50 * y, 50, 50); // Fill a rectangle with color
    }
  }
}