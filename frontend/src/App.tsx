import { useState } from "react"
import { Button } from "./components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card"

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="h-dvh w-screen flex items-center justify-center">
            <div className="p-4 max-w-6xl mx-auto">
                <Card className="w-sm">
                    <CardHeader>
                        <CardTitle>Counter</CardTitle>
                    </CardHeader>
                    <CardContent>Counting {count}</CardContent>
                    <CardFooter>
                        <CardAction>
                            <Button onClick={() => setCount((p) => p + 1)}>
                                Count
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default App
