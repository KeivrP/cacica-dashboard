import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';
import SettingsView from '../sections/settings/view/settings-view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Configuración - ${CONFIG.appName}`}</title>
      </Helmet>

      <SettingsView />

    </>
  );
}
