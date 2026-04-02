import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/weather-dashboard-card.ts',
  output: {
    file: 'dist/weather-dashboard-card.js',
    format: 'es',
    sourcemap: dev,
  },
  plugins: [
    string({ include: '**/*.svg' }),
    nodeResolve(),
    typescript(),
    !dev && terser({ ecma: 2020 }),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
};
