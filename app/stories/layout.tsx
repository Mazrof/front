// /src/app/stories/layout.tsx
import React from 'react';

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
    return (
         
            <div className="p-4">{children}</div>
       
    );
}


