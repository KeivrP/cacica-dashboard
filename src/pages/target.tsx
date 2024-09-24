import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';
import { TargetsView } from '../sections/targets/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Objetivos - ${CONFIG.appName}`}</title>
      </Helmet>

      <TargetsView />

    </>
  );
}
