import { morphXShader } from './morphXShader.js';

export const EffectGL = ({ swiper, extendParams, on }) => {
  extendParams({
    gl: {
      shader: 'morph-x',
      intensity: 1.0,
    },
  });

  let canvas, gl, program;

  on('init', () => {
    const wrapper = swiper.el.querySelector('.swiper-wrapper');
    canvas = document.createElement('canvas');
    canvas.className = 'swiper-gl-layer';
    Object.assign(canvas.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    });
    wrapper.appendChild(canvas);

    gl = canvas.getContext('webgl');
    if (!gl) return console.warn('WebGL не поддерживается');

    // создаём и компилируем morph-x шейдер
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fragmentShaderSource = morphXShader.fragment;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
  });

  on('setTranslate', () => {
    if (!gl) return;
    const progress = Math.abs(swiper.progress);
    const uProgress = gl.getUniformLocation(program, 'progress');
    gl.uniform1f(uProgress, progress);
  });

  on('setTransition', (swiper, duration) => {
    if (canvas) canvas.style.transition = `${duration}ms opacity`;
  });
};
