import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export function H2({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h2
            className={clsx("font-bold text-lg", className)}
            {...props}
        >
            {children}
        </h2>
    );
}

export function H3({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h3
            className={clsx("font-bold text-lg", className)}
            {...props}
        >
            {children}
        </h3>
    );
}

export function Input({ className, type, ...props }: ComponentPropsWithoutRef<"input">) {
    return (
        <input
            type={type || "text"}
            {...props}
            required
            className={clsx("border border-black rounded-lg p-2 w-full", className)}
        />
    );
}

export function FormField({ children, className }: ComponentPropsWithoutRef<"div">) {
    return <div className={clsx("grid gap-4", className)}>{children}</div>;
}
