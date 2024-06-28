import { useLocation } from "@remix-run/react";
import clsx from "clsx";
import { BusinessData } from "services/content/BusinessData";
import { FramedContent } from "~/components/FramedContent";

export function Footer({ business_data }: { business_data: BusinessData }) {
    const { email, address, instagram_link, phone, whatsapp_phone } = business_data;
    const isContactPage: boolean = useLocation().pathname == "/contacto";
    return (
        <FramedContent>
            <footer className={clsx(" ", isContactPage ? null : "border-t border-t-zinc-300/50 pt-10")}>
                <div className='grid gap-[30px]  md:grid-cols-2 lg:grid-cols-4'>
                    {/* contact */}
                    <div className=' flex flex-col gap-[15px]'>
                        <h3
                            className='text-xl font-medium leading-none'
                            id='contact-section'
                        >
                            Contáctanos
                        </h3>
                        <div className='flex flex-col gap-[10px]'>
                            <div className='flex items-center gap-[10px]'>
                                <a
                                    rel='noreferrer'
                                    href={`https://wa.me/${cleanPhoneNumber(whatsapp_phone)}?text=Hola`}
                                    target='_blank'
                                    className='border-b border-b-black text-sm'
                                    data-test-id='whatsapp_phone'
                                >
                                    {whatsapp_phone}
                                </a>
                            </div>

                            <div className='flex items-center gap-[10px]'>
                                <a
                                    rel='noreferrer'
                                    href={`mailto:${email}`}
                                    target='_blank'
                                    className='border-b border-b-black text-sm'
                                >
                                    {email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* meet us */}
                    <div className=' flex flex-col gap-[15px] '>
                        <h3 className='text-xl  font-medium leading-none'>Conócenos</h3>
                        <div className=''>
                            <div className='flex items-center gap-[10px]'>
                                <a
                                    rel='noreferrer'
                                    href={instagram_link}
                                    target='_blank'
                                    className='border-b border-b-black text-sm'
                                >
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* find us */}
                    <div className=' grid gap-[15px]'>
                        <h3 className='text-xl  font-medium leading-none'>Encuéntranos</h3>

                        <div className='grid gap-[10px]'>
                            <div className='flex items-center gap-[10px]'>
                                <span className='text-sm'>{address}</span>
                            </div>

                            <div className='flex items-center gap-[10px]'>
                                <a
                                    rel='noreferrer'
                                    href={`tel:${cleanPhoneNumber(phone)}`}
                                    target='_blank'
                                    className='border-b border-b-black text-sm'
                                >
                                    {phone}
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
        </FramedContent>
    );
}

function cleanPhoneNumber(phoneNumberString: string): string {
    return phoneNumberString.replace(/\s/g, "");
}
