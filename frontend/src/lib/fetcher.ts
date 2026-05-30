import type { ApiResponse } from "@zyra-ass/shared"

const BASE_URL = "/api/v1"

export class FetchError extends Error {
    status: number
    data: ApiResponse | null

    constructor(message: string, status: number, data: ApiResponse | null) {
        super(message)
        this.name = "FetchError"
        this.status = status
        this.data = data
    }
}

export async function fetcher<T>(
    path: string,
    options?: RequestInit,
): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    })

    const json: ApiResponse<T> = await res.json()

    if (!res.ok) {
        throw new FetchError(
            json.error || json.message || "Request failed",
            res.status,
            json as ApiResponse<null>,
        )
    }

    return json.data as T
}
