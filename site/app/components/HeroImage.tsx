import { type HeroImage } from "services/content/Home";

export function HeroImage({ hero_image }: { hero_image: HeroImage }) {
    return (
        <div>
            <div className='relative w-full h-[390px] mx-auto md:hidden'>
                <img
                    src={hero_image.mobile.url}
                    alt={hero_image.mobile.alt}
                    className='w-full h-full absolute object-cover '
                />
            </div>
            <div className='relative w-full h-[400px] hidden md:block'>
                <img
                    src={hero_image.desktop.url}
                    alt={hero_image.desktop.alt}
                    className='w-full h-full absolute object-cover'
                />
            </div>
        </div>
    );
}
