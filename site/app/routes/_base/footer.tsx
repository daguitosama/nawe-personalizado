import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

type FooterBlock = {
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
    const footer_data: FooterBlock = {
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
                <div className=' grid gap-[20px]'>
                    <h3 className='text-xl md:text-2xl font-medium leading-none'>
                        {footer_data.contact.title}
                    </h3>
                    <div className='flex items-center gap-[4px]'>
                        <WhatsAppIcon className='w-8 h-8' />
                        <a
                            href={`https://wa.me/${safeNumber}?text=Hola`}
                            target='_blank'
                            className='border-b border-b-black'
                        >
                            {footer_data.contact.phone}
                        </a>
                    </div>

                    <div className='flex items-center gap-[10px]'>
                        <EnvelopeIcon className='w-6 h-6' />
                        <a
                            href={`mailto:${footer_data.contact.email}`}
                            target='_blank'
                            className='border-b border-b-black'
                        >
                            {footer_data.contact.email}
                        </a>
                    </div>
                </div>

                {/* meet us */}
                <div className=' grid gap-[20px]'>
                    <h3 className='text-xl md:text-2xl font-medium leading-none'>
                        {footer_data.know_us.title}
                    </h3>

                    <div className='flex items-center gap-[10px]'>
                        <a
                            href={footer_data.know_us.instagram_links}
                            target='_blank'
                            className='border-b border-b-black'
                        >
                            Instagram
                        </a>
                    </div>

                    <div className='flex items-center gap-[10px]'>
                        <a
                            href={footer_data.know_us.facebook_link}
                            target='_blank'
                            className='border-b border-b-black'
                        >
                            Facebook
                        </a>
                    </div>
                </div>

                {/* find us */}
                <div className=' grid gap-[20px]'>
                    <h3 className='text-xl md:text-2xl font-medium leading-none'>
                        {footer_data.find_us.title}
                    </h3>

                    <div className='flex items-start gap-[10px]'>
                        <MapPinIcon className='w-7 h-7 ' />
                        <p className='text-sm'>{footer_data.find_us.address}</p>
                    </div>

                    <div className='flex items-center gap-[10px]'>
                        <PhoneIcon className='w-6 h-6' />
                        <a
                            href={`tel:${footer_data.find_us.phone}`}
                            target='_blank'
                            className='border-b border-b-black'
                        >
                            {footer_data.find_us.phone}
                        </a>
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

function WhatsAppIcon({ className }: { className: string }) {
    return (
        <svg
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <path
                d='M9.34917 17.0742L9.60118 17.2128C10.8262 17.9174 12.2665 18.1502 13.6512 17.8674C15.0359 17.5846 16.2696 16.8056 17.1202 15.677C17.9708 14.5484 18.3798 13.1479 18.2702 11.7389C18.1606 10.3299 17.5401 9.00946 16.5252 8.02592C15.5103 7.04237 14.1711 6.46349 12.7593 6.39813C11.3476 6.33278 9.96058 6.78545 8.85919 7.67102C7.75779 8.5566 7.01787 9.81405 6.77859 11.2069C6.53931 12.5998 6.81715 14.0321 7.55985 15.2344L7.71106 15.4865L7.16923 17.6412L9.34917 17.0742ZM5.25391 19.5943L6.29977 15.6881C5.7131 14.6267 5.40122 13.4355 5.39252 12.2229C5.39003 10.8028 5.80853 9.41395 6.59512 8.2317C7.38172 7.04945 8.50111 6.12689 9.81184 5.5806C11.1226 5.03431 12.5658 4.88881 13.9592 5.16249C15.3526 5.43616 16.6336 6.11673 17.6404 7.11819C18.6471 8.11965 19.3344 9.39706 19.6154 10.789C19.8964 12.1809 19.7585 13.6249 19.2191 14.9385C18.6797 16.2521 17.7631 17.3763 16.585 18.1691C15.4069 18.9619 14.0202 19.3877 12.6002 19.3927C11.4065 19.398 10.2312 19.0987 9.18536 18.5233L5.25391 19.5943Z'
                fill='black'
            />
            <path
                d='M15.1216 13.2184C14.9786 13.1075 14.8135 13.0288 14.6374 12.9875C14.4612 12.9462 14.2783 12.9432 14.1009 12.9789C13.8237 13.0923 13.6599 13.5082 13.4835 13.7224C13.4478 13.7731 13.3946 13.8089 13.3341 13.8228C13.2737 13.8368 13.2102 13.8279 13.1559 13.798C12.1917 13.4072 11.3849 12.7068 10.8625 11.8071C10.8138 11.7537 10.7868 11.684 10.7868 11.6118C10.7868 11.5395 10.8138 11.4698 10.8625 11.4164C11.0807 11.2371 11.2462 11.0019 11.3414 10.736C11.3544 10.4508 11.289 10.1676 11.1524 9.91695C11.0434 9.5656 10.833 9.25433 10.5475 9.02229C10.4048 8.95264 10.2444 8.92741 10.0871 8.94987C9.9299 8.97234 9.78301 9.04146 9.66546 9.1483C9.45897 9.32477 9.29504 9.54563 9.18593 9.79439C9.07683 10.0431 9.02538 10.3133 9.03542 10.5848C9.01684 10.7354 9.01684 10.8878 9.03542 11.0384C9.13248 11.3942 9.28106 11.7338 9.47645 12.0465C9.61586 12.285 9.76726 12.5163 9.93008 12.7395C10.4652 13.4708 11.137 14.0913 11.9084 14.5666C12.3007 14.8184 12.7243 15.0175 13.1685 15.1589C13.613 15.3648 14.1059 15.4434 14.5924 15.3857C14.8648 15.3368 15.1215 15.2232 15.3408 15.0543C15.5601 14.8854 15.7356 14.6663 15.8525 14.4154C15.8964 14.2546 15.8964 14.0849 15.8525 13.924C15.7769 13.5838 15.3106 13.3822 15.0334 13.2184'
                fill='black'
            />
        </svg>
    );
}
