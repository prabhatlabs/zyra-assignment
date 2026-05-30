import { DashboardPage } from "@/pages/dashboard-page"
import { StudentDetailPage } from "@/pages/student-detail-page"
import { StudentsPage } from "@/pages/students-page"
import { Route, Routes } from "react-router-dom"
import Provider from "./providers/provider"

function App() {
    return (
        <Provider>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/students/:id" element={<StudentDetailPage />} />
            </Routes>
        </Provider>
    )
}

export default App
