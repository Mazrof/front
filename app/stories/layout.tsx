// src/app/stories/layout.tsx

import React from 'react';
import { ReactNode } from 'react';

export default function StoriesLayout({ children }: { children: ReactNode }) {
  return (   
    <div className="w-full">{children}</div>
  );
}
