import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { GoalsView } from '../sections/goals/view/goals-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Metas - ${CONFIG.appName}`}</title>
      </Helmet>

      <GoalsView />
    </>
  );
}
