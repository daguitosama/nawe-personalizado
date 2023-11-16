import clsx from "clsx";
import { type HTMLProps } from "react";

interface FramedContentProps extends HTMLProps<HTMLDivElement> {}

export function FramedContent({ children, className, ...props }: FramedContentProps) {
    return (
        <div
            className={clsx("w-full max-w-screen-xl mx-auto px-[30px] ", className)}
            {...props}
        >
            {children}
        </div>
    );
}
