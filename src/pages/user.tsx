import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { UserView } from '../sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Usuarios - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
