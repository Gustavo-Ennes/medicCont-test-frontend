import "./App.css";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/Routes";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
