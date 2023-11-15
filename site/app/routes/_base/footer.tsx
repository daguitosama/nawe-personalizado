import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "~/components/WhatsAppIcon";

type ContactBlock = {
    contact: {
        title: string;
        phone: string;
        email: string;
    };
    find_us: {
        title: string;
        address: string;
        see_on_the_map_link: string;
        phone: string;
    };
    know_us: {
        title: string;
        instagram_links: string;
        facebook_link: string;
    };
};
export function Footer() {
    const footer_data: ContactBlock = {
        contact: {
            title: "Contáctanos",
            phone: "+53 5 316 58 83",
            email: "nawecraft@gmail.com",
        },
        find_us: {
            title: "Encuéntranos",
            address: "Ave.51 entre 58 A y 58 B, La Ceiba, Playa, La Habana, Cuba.",
            see_on_the_map_link: "",
            phone: "+53 72076348",
        },
        know_us: {
            title: "Conócenos",
            instagram_links: "https://www.instagram.com/nawe_personalizado/",
            facebook_link: "https://www.facebook.com/people/Nawe-Personalizado/61551607484362/",
        },
    };
    const safeNumber = footer_data.contact.phone.replace(/\s/g, "");
    return (
        <footer className='max-w-screen-xl mx-auto w-full px-[30px] border-t border-t-slate-300 pt-10 '>
            <div className='grid gap-[50px]  md:grid-cols-2 lg:grid-cols-4'>
                {/* contact */}
                <div className=' grid gap-[15px]'>
                    <h3
                        className='text-xl font-medium leading-none'
                        id='contact-section'
                    >
                        {footer_data.contact.title}
                    </h3>
                    <div className='grid gap-[10px]'>
                        <div className='flex items-center gap-[10px]'>
                            <WhatsAppIcon className='w-5 h-5' />
                            <a
                                rel='noreferrer'
                                href={`https://wa.me/${safeNumber}?text=Hola`}
                                target='_blank'
                                className='border-b border-b-black text-sm'
                            >
                                {footer_data.contact.phone}
                            </a>
                        </div>

                        <div className='flex items-center gap-[10px]'>
                            <EnvelopeIcon className='w-5 h-5' />
                            <a
                                rel='noreferrer'
                                href={`mailto:${footer_data.contact.email}`}
                                target='_blank'
                                className='border-b border-b-black text-sm'
                            >
                                {footer_data.contact.email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* meet us */}
                <div className=' grid gap-[15px]'>
                    <h3 className='text-xl  font-medium leading-none'>
                        {footer_data.know_us.title}
                    </h3>
                    <div className='grid gap-[10px]'>
                        <div className='flex items-center gap-[10px]'>
                            <a
                                rel='noreferrer'
                                href={footer_data.know_us.instagram_links}
                                target='_blank'
                                className='border-b border-b-black text-sm'
                            >
                                Instagram
                            </a>
                        </div>

                        <div className='flex items-center gap-[10px]'>
                            <a
                                rel='noreferrer'
                                href={footer_data.know_us.facebook_link}
                                target='_blank'
                                className='border-b border-b-black text-sm'
                            >
                                Facebook
                            </a>
                        </div>
                    </div>
                </div>

                {/* find us */}
                <div className=' grid gap-[15px]'>
                    <h3 className='text-xl  font-medium leading-none'>
                        {footer_data.find_us.title}
                    </h3>

                    <div className='grid gap-[10px]'>
                        <div className='flex items-center gap-[10px]'>
                            <div>
                                <MapPinIcon className='w-5 h-5 ' />
                            </div>
                            <span className='text-sm'>{footer_data.find_us.address}</span>
                        </div>

                        <div className='flex items-center gap-[10px]'>
                            <PhoneIcon className='w-5 h-5' />
                            <a
                                rel='noreferrer'
                                href={`tel:${footer_data.find_us.phone}`}
                                target='_blank'
                                className='border-b border-b-black text-sm'
                            >
                                {footer_data.find_us.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' text-sm text-opacity-75 mt-[60px] pb-[30px]'>
                <p>
                    This website is a <span className='font-bold'>NAWE</span> design & a{" "}
                    <a
                        href='https://dago.pages.dev'
                        className='border-b border-b-black'
                    >
                        Dago
                    </a>{" "}
                    craft 🖤
                </p>
                {/* <p>Habana 2023</p> */}
            </div>
        </footer>
    );
}
