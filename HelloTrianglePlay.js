// HelloTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var vertices = [
    new Float32Array([
      0.25, 0.75,  -0.25, 0.25,  0.25, 0.25
    ]),   // Triangle 1
    new Float32Array([
      -0.25, -0.75,  -0.25, -0.25,  0.25, -0.25
    ]),   // Triangle 2
    new Float32Array([
      0.5, 0.1,  0.3, 0.0,  0.3, -0.2,  0.5, -0.3,  0.7, -0.2,  0.7, 0.0
    ]),    // Hexagon 1
    new Float32Array([
      -0.8, -0.1,  -0.7, 0.1,  -0.6, -0.1,  -0.5, 0.1,  -0.4, -0.1,  -0.3, 0.1,  -0.2, -0.1
    ]),    // Triangle Strip
    new Float32Array([
      -0.8, -0.1,  -0.7, 0.1,  -0.6, -0.1,  -0.5, 0.1,  -0.4, -0.1,  -0.3, 0.1,  -0.2, -0.1
    ])    // Line Strip
  ];

  var colors = [
    new Float32Array([0.0, 0.0, 1.0, 1.0]),   // Triangle 1
    new Float32Array([1.0, 0.0, 0.0, 1.0]),   // Triangle 2
    new Float32Array([0.0, 1.0, 0.0, 1.0]),   // Hexagon 1
    new Float32Array([1.0, 1.0, 1.0, 1.0]),   // Triangle Strip
    new Float32Array([0.0, 0.0, 0.0, 1.0])    // Line Strip
  ];

  var ns = [
    3,  // Triangle 1
    3,  // Triangle 2
    6,  // Hexagon 1
    7,  // Triangle Strip
    7, // Line Strip
  ];

  var types = [
    gl.TRIANGLES,       // Triangle 1
    gl.TRIANGLES,       // Triangle 1
    gl.TRIANGLE_FAN,    // Hexagon 1
    gl.TRIANGLE_STRIP,  // Triangle Strip
    gl.LINE_STRIP       // Line Strip
  ];

  for (var i = 0; i < ns.length; i++) {
    // Write the positions of vertices to a vertex shader
    var n_v = initVertexBuffers(gl, vertices[i], ns[i], colors[i]);
    if (n_v < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }

    // Draw the polygon
    gl.drawArrays(types[i], 0, n_v);
  }
}

function initVertexBuffers(gl, vertices, n, color) {
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // Get the storage location of u_FragColor
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get u_FragColor variable');
    return;
  }

  // Specify the color of u_FragColor
  gl.uniform4fv(u_FragColor, color);

  return n;
}
