import React, { useEffect, useState } from 'react';

/** Import types */
import { Chore } from '@typedefs/chore';

/** Import template */
import MainTemplate from '@templates/main';

/** Import libs */

import getData from '@helpers/get-from-database';

const IndexPage: React.FC = () => {
  useEffect(() => {
    getData('get-chores').then((data) => {
      setChores(data);
    });
  }, []);

  return (
    <MainTemplate>
      <h1>Hello world</h1>
      <h2>Here is your household management panel</h2>
    </MainTemplate>
  );
};

export default IndexPage;
