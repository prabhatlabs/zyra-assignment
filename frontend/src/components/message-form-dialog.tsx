import { useState } from "react"
import { Dialog } from "radix-ui"
import { Button } from "@/components/ui/button"
import { useActionCenterStore } from "@/store/action-center-store"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    studentId: string
}

export function MessageFormDialog({
    open,
    onOpenChange,
    studentId,
}: Props) {
    const createMessage = useActionCenterStore((s) => s.createMessage)
    const [from, setFrom] = useState("")
    const [subject, setSubject] = useState("")
    const [preview, setPreview] = useState("")
    const [saving, setSaving] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!from.trim() || !subject.trim()) return
        setSaving(true)

        await createMessage({
            studentId,
            from: from.trim(),
            subject: subject.trim(),
            preview: preview.trim(),
        })

        setSaving(false)
        setFrom("")
        setSubject("")
        setPreview("")
        onOpenChange(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
                <Dialog.Content
                    onInteractOutside={(e) => e.preventDefault()}
                    className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 shadow-lg"
                >
                    <div>
                        <Dialog.Title className="text-lg font-semibold">
                            Send Message
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                            Send a message regarding this student
                        </Dialog.Description>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">From</label>
                            <input
                                type="text"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                required
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                                placeholder="e.g. Counselor, Teacher"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                                placeholder="Message subject"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                value={preview}
                                onChange={(e) => setPreview(e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                                placeholder="Message content"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving || !from.trim() || !subject.trim()}
                            >
                                {saving ? "Sending..." : "Send"}
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
