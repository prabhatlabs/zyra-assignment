import type { Message } from "@zyra-ass/shared"
import { useActionCenterStore } from "@/store/action-center-store"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
    messages: Message[]
    loading: boolean
}

export function MessageList({ messages, loading }: Props) {
    const markMessageRead = useActionCenterStore((s) => s.markMessageRead)

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
            </div>
        )
    }

    if (messages.length === 0) {
        return (
            <Card>
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                    No messages
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-2">
            {messages.map((msg) => (
                <button
                    key={msg.id}
                    type="button"
                    onClick={() => {
                        if (!msg.read) markMessageRead(msg.id)
                    }}
                    className="w-full text-left"
                >
                    <Card
                        className={cn(
                            "transition-colors hover:bg-muted/50",
                        )}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle
                                    className={cn(
                                        "text-sm",
                                        !msg.read && "font-semibold",
                                    )}
                                >
                                    {msg.subject}
                                </CardTitle>
                                {!msg.read && (
                                    <Badge variant="default" className="shrink-0">
                                        New
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                                From: {msg.from}
                            </p>
                            <p className="text-xs leading-relaxed line-clamp-2">
                                {msg.preview}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(
                                    msg.receivedAt,
                                ).toLocaleDateString()}
                            </p>
                        </CardContent>
                    </Card>
                </button>
            ))}
        </div>
    )
}
