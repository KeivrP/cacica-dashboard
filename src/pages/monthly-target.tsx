import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';
import { MonthlyTargetView } from '../sections/monthly-targets/view/mt-View';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Metas Mensaules - ${CONFIG.appName}`}</title>
      </Helmet>
      <MonthlyTargetView   />
    </>
  );
}
