uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uTime;
uniform vec2 uHover;
varying float vNoise;
varying vec2 vUv;
uniform float uHoverMouse;

#define M_PI 3.1415926535897932384626433832795

void main() {
  vUv = uv;
  vec3 pos = position;

	pos.x = pos.x + (sin(uv.y * M_PI) * uOffset.x);
  pos.y = pos.y + (sin(uv.x * M_PI) * uOffset.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}