import React, { useEffect, useState } from 'react';

/** Import types */
import { Chore } from '@typedefs/chore';

/** Import template */
import MainTemplate from '../templates/main';

/** Import libs */

import getData from '@helpers/get-from-database';

const IndexPage: React.FC = () => {
  const [chores, setChores] = useState<Chore[]>([]);

  useEffect(() => {
    getData('get-chores').then((data) => {
      setChores(data);
    });
  }, []);

  return (
    <MainTemplate>
      <h1>Hello world</h1>
      <h2>Here is a list of chores</h2>
      <ul>
        {chores.map((chore: Chore) => (
          <li key={chore.id}>{chore.content}</li>
        ))}
      </ul>
    </MainTemplate>
  );
};

export default IndexPage;
