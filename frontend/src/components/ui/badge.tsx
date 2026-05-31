import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20",
                outline: "text-foreground",
                urgent: "border-transparent bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                high: "border-transparent bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                medium: "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                low: "border-transparent bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

function Badge({
    className,
    variant,
    ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
    return (
        <span
            data-slot="badge"
            className={cn(badgeVariants({ variant, className }))}
            {...props}
        />
    )
}

export { Badge, badgeVariants }
