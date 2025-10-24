export const morphXShader = {
  uniforms: {},
  fragment: `
    precision mediump float;
    varying vec2 vUv;
    uniform float progress;
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform vec4 resolution;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main() {
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      // эффект «морфинга» по оси X с плавным переходом
      x = smoothstep(0.0, 1.0, (x * 2.0 + p.x - 1.0));
      vec4 f = mix(
        texture2D(texture1, (p - 0.5) * (1.0 - x) + 0.5),
        texture2D(texture2, (p - 0.5) * x + 0.5),
        x
      );
      gl_FragColor = f;
    }
  `
};
