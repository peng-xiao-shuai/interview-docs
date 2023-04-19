import DefaultTheme from 'vitepress/theme';
import './styles/index.scss';
import { VPDemo, VPLayout } from '../components/index';
export default {
  ...DefaultTheme,
  Layout: VPLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', VPDemo);
  },
};
