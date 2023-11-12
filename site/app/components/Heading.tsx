import type { HTMLProps } from "react";
interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
    /**
     * Property description
     */
}

/**
 * Heading
 */
export const Heading = ({ children, ...props }: HeadingProps) => {
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
};

/**
 * Heading
 */
export const Heading_l2 = ({ children, ...props }: HeadingProps) => {
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
