import type { HTMLProps } from "react";
interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
    /**
     * Property description
     */
    variant?: "with-borders" | "default" | "fluid";
}

/**
 * Heading
 */
export const Heading = ({ children, variant = "default", ...props }: HeadingProps) => {
    if (variant == "with-borders") {
        return (
            <div className='w-full py-[22px] border-t-black border-b-black border-t border-b'>
                <h1
                    {...props}
                    className='text-xl font-bold text-center '
                >
                    {children}
                </h1>
            </div>
        );
    }
    if (variant == "fluid") {
        return (
            <div className='w-full py-8 md:py-10'>
                <h1
                    {...props}
                    className='text-xl md:text-3xl font-bold'
                >
                    {children}
                </h1>
            </div>
        );
    }
    return (
        <div className='w-full py-[22px]'>
            <h1
                {...props}
                className='text-xl font-bold'
            >
                {children}
            </h1>
        </div>
    );
};

/**
 * Heading
 */
export const HeadingL2 = ({ children, ...props }: HeadingProps) => {
    return (
        <div className='w-full py-[22px] border-t-black border-b-black border-t border-b'>
            <h2
                {...props}
                className='text-xl font-bold text-center '
            >
                {children}
            </h2>
        </div>
    );
};
