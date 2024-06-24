import { Image } from "services/types";

export type HeroImage = {
    desktop: Image;
    mobile: Image;
};
export function HeroImage({ heroImage }: { heroImage: HeroImage }) {
    return (
        <div>
            <div className='relative w-full h-[390px] mx-auto md:hidden'>
                <img
                    src={heroImage.mobile.url}
                    alt={heroImage.mobile.alt}
                    className='w-full h-full absolute object-cover '
                />
            </div>
            <div className='relative w-full h-[400px] hidden md:block'>
                <img
                    src={heroImage.desktop.url}
                    alt={heroImage.desktop.alt}
                    className='w-full h-full absolute object-cover'
                />
            </div>
        </div>
    );
}
