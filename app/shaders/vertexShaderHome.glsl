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

  float dist = distance(uv, uHover);
  pos.z += (10.0 * sin(dist * 5.0 + uTime)) * uHoverMouse;
  vNoise = uHoverMouse * (sin(dist * 5.0 - uTime));

  pos.x = pos.x + (sin(uv.y * M_PI) * uOffset.x);
  pos.y = pos.y + (cos(uv.x * M_PI) * uOffset.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}