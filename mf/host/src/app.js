import React from "react";
import Slider from "./slider";

const RemoteNewList = React.lazy(() => import("remote/NewList"));

const App = () => {
  return (
    <div>
      <h1>本地组件Slider</h1>
      <Slider />

      <h1>远程组件</h1>
      <React.Suspense fallback="loading">
        <RemoteNewList />
      </React.Suspense>
    </div>
  );
};

export default App;
