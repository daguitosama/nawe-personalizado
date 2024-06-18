import clsx from "clsx";
import { type HTMLProps } from "react";

interface FramedContentProps extends HTMLProps<HTMLDivElement> {}

export function FramedContent({ children, className, ...props }: FramedContentProps) {
    return (
        <div
            className={clsx("max-w-screen-md mx-auto w-full px-[30px] ", className)}
            {...props}
        >
            {children}
        </div>
    );
}
