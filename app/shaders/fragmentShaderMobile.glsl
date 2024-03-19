uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uAlpha;
uniform vec2 uOffset;
uniform float uHoverMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 colorShift;
  float r = texture2D(uTexture, vUv + uOffset).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv).b;
  colorShift = vec3(r, g, b);
  
  gl_FragColor = vec4(colorShift,1.0);
}