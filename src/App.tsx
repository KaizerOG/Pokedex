import { useState } from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/home'
import Detailpage from "@/pages/detail";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/detail/:name",
      element: <Detailpage/>,
    },
  ]);
  return (
    <div className="bg-[url('/image/15517742_5632549.jpg')] min-h-[100vh]">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App
