import { BrowserRouter } from "react-router-dom"
import Provider from "./providers/provider"
import Router from "./router"
import { AppLayout } from "./components/layout/app-layout"

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <AppLayout>
                    <Router />
                </AppLayout>
            </BrowserRouter>
        </Provider>
    )
}

export default App
