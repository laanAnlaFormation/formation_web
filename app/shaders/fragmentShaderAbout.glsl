uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uScroll;
uniform float uTime;
uniform float uProgress;
uniform float uHoverStart;
uniform vec4 uResolution;


varying vec2 vUv;

void main() {
	vec2 offsetR = vec2(0., 0.2 * uScroll);
	vec2 offsetG = vec2(0., 0.2 * uScroll);

	float r = texture2D(uTexture, vUv - offsetR).r;
  float g = texture2D(uTexture, vUv + offsetG).g;
  float b = texture2D(uTexture, vUv).b;
  vec3 colorRGB = vec3(r, g, b);

	gl_FragColor = vec4(colorRGB, 1.0);

}