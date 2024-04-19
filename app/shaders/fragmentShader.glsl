uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uAlpha;
uniform vec2 uOffset;
uniform float uHoverMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 textColor;
  float r = texture2D(uTexture, vUv + uOffset).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv).b;
  textColor = vec3(r, g, b);

	float xHoverMouse = uHoverMouse;
	xHoverMouse = smoothstep(0.0, 1.0, xHoverMouse * 2.0 + vUv.y - 1.0);
	vec4 mixTexture = mix(
		texture2D(uTexture, (vUv - 0.5) * (1. - xHoverMouse) + 0.5),
		texture2D(uTexture2, (vUv - 0.5) * xHoverMouse + 0.5),
		xHoverMouse
	);
	vec3 finalEffect = mix(textColor, mixTexture.rgb, xHoverMouse);

  gl_FragColor = vec4(finalEffect,uAlpha);

}