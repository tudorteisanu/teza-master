import { NewArticleComponent } from './NewArticleComponent';

import React from 'react';
import { createRoot } from 'react-dom/client';

const user = {
    user: "Adam",
    email: "fsdagda@bdfshd.com",
    onClick: () => { }
};

const root = createRoot(document.getElementById("root"));
root.render(<NewArticleComponent value={user} errors={[]} onSubmit={() => {} } />);