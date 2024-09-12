import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Objetivos - ${CONFIG.appName}`}</title>
      </Helmet>

    </>
  );
}
