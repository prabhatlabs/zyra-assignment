import { DashboardPage } from "@/pages/dashboard-page"
import { StudentDetailPage } from "@/pages/student-detail-page"
import { Route, Routes } from "react-router-dom"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
        </Routes>
    )
}
