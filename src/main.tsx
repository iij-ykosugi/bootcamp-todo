import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./todo/step-final";
import "./index.css";

const appPaths = [
  "ex-props/step1",
  "ex-props/step2",
  "ex-props/step3",
  "ex-props/step4",
  "ex-props/step5",
  "ex-props/step6",
  "ex-props/step7",
  "ex-state/step1",
  "ex-state/step2",
  "ex-state/step3",
  "ex-state/step4",
  "todo/step1",
  "todo/step2",
  "todo/step3",
  "todo/step4",
  "todo/step5",
  "todo/step6",
  "todo/step-final",
  "todo-with-server/step-final",
];

const seq = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);

/**
 * 動作確認のためAppを切り替えられるようにするもの。
 * ハンズオンではこれは使わず直接`App`を使ってください。
 */
const AppSelector = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <div
        className="App"
        style={{ flexDirection: "row", flexWrap: "wrap", gap: "12px" }}
      >
        {seq(appPaths.length).map((i) => (
          <button key={i} onClick={() => setIndex(i)}>
            {appPaths[i]}
          </button>
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {React.createElement(lazy(() => import("./" + appPaths[index])))}
      </Suspense>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppSelector />
    {/* <App /> */}
  </React.StrictMode>,
);
