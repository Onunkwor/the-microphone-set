import { AppRouter } from "./router/Router";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <AppRouter />
      <Analytics />
    </>
  );
}

export default App;
