import React, { CSSProperties } from 'react';
import { Entry as EntryType } from '../types';

import Entry from './Entry';

interface props {
  entries: EntryType[];
  style?: CSSProperties;
}

const Entries: React.FC<props> = ({ entries, style }) => {
  return (
    <div style={style}>
      <h3>Entries</h3>
      {entries.map((entry, i) => (
        <Entry entry={entry} key={i} />
      ))}
    </div>
  );
};

export default Entries;
