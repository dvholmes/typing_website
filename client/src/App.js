import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page_contenttemplate from './pages/page_content';

import NotFound from './pages/NotFound';
import MainTemplate from './templates/main_template';
import './App.css';

function App() {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <MainTemplate PageContent={<Page_contenttemplate />} /> // Pass Practice component as PageContent
            }
          />
          <Route path="/practice" element={<MainTemplate PageContent={<Page_contenttemplate />} />} />

          {/* 404 Route - Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;
