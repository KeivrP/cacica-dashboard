import { Label } from '../components/label';
import { SvgColor } from '../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Usuarios',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Metas',
    path: '/goals', // products
    icon: icon('ic-tagets'),
   /*  info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ), */
  },
  {
    title: 'Objetivos',
    path: '/targets', // blog
    icon: icon('ic-blog'),
  },
  {
    title: 'Metas Mensuales',
    path: '/monthly-target', // blog
    icon: icon('ic-monthT'),
  },
/*   {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  }, */
];
