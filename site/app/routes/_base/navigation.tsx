import { Transition } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { Fragment, useState } from "react";
import { useBodyOverflow } from "~/hooks";
import clsx from "clsx";
import FocusTrap from "focus-trap-react";

export type CompoundNavigationLink = {
    id: string;
    label: string;
    links: {
        id: string;
        label: string;
        route: string;
    }[];
};

export type NavigationLink = {
    id: string;
    label: string;
    route: string;
};

export type MenuLink = NavigationLink | CompoundNavigationLink;

export function Navigation({
    links,
    signal_nav_toggle,
}: {
    links: MenuLink[];
    signal_nav_toggle: () => void;
}) {
    const [is_open, set_is_open] = useState<boolean>(false);
    const { hideOverflow, showOverflow } = useBodyOverflow();
    function open_menu() {
        hideOverflow();
        set_is_open(true);
        signal_nav_toggle();
    }
    function close_menu() {
        showOverflow();
        set_is_open(false);
        signal_nav_toggle();
    }
    function onMenuButtonClick() {
        if (is_open) {
            close_menu();
        } else {
            open_menu();
        }
    }

    return (
        <FocusTrap active={is_open}>
            <div
                className=''
                id='nav-wrapper'
                onKeyDown={(evt) => {
                    if (!is_open) {
                        return;
                    }
                    if (evt.key == "Escape") {
                        close_menu();
                    }
                }}
                onClick={(evt) => {
                    if (!is_open) {
                        return;
                    }
                    const navigation_menu_items_container =
                        document.querySelector("#navigation-menu-items");
                    if (!navigation_menu_items_container) {
                        return;
                    }
                    if (navigation_menu_items_container.contains(evt.target as Node)) {
                        return;
                    }
                    close_menu();
                }}
            >
                {/* menu header */}
                <div className=' fixed top-0 left-0 z-50 bg-white  w-full'>
                    <div className='  max-w-screen-xl mx-auto w-full px-[30px] h-[70px]    flex items-center justify-between '>
                        <div className='flex items-center gap-[15px]'>
                            <div className=''>
                                <Link
                                    to='/'
                                    className='h-full block'
                                    onClick={() => {
                                        if (!is_open) {
                                            return;
                                        }
                                        close_menu();
                                    }}
                                >
                                    <Logo />
                                    {/* <img
                                src='/img/nawe-logo.svg'
                                alt='NAWE Logo'
                                height={24}
                                width={113}
                            /> */}
                                </Link>
                            </div>
                            <div className=''>
                                <Personalizado />
                            </div>
                        </div>

                        <MenuButton
                            is_open={is_open}
                            on_click={onMenuButtonClick}
                        />
                    </div>
                </div>
                {/* menu items */}
                <div>
                    <Menu
                        open={is_open}
                        on_close={close_menu}
                        links={links}
                    />
                </div>
            </div>
        </FocusTrap>
    );
}

function Menu({
    open,
    on_close,
    links,
}: {
    open: boolean;
    on_close: () => void;
    links: MenuLink[];
}) {
    return (
        <Transition
            as={Fragment}
            show={open}
        >
            <div className='fixed top-0 left-0  w-full h-screen z-10 '>
                {/* overlay */}
                <Transition.Child
                    as={Fragment}
                    enter='transform transition duration-[500ms]'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transform duration-300 transition ease-in-out'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div
                        className='opacity-0 bg-white/80 w-full h-full inset-0 absolute '
                        onClick={on_close}
                    ></div>
                </Transition.Child>
                {/* menu */}
                <Transition.Child
                    as={Fragment}
                    enter='transform transition duration-[500ms]'
                    enterFrom='-translate-x-full'
                    enterTo='translate-x-0'
                    leave='transform duration-300 transition ease-in-out'
                    leaveFrom='translate-x-0'
                    leaveTo='-translate-x-full '
                >
                    <div className='relative z-30 w-full   h-[calc(100dvh_-_70px)] mt-[70px] flex justify-center overflow-y-scroll'>
                        <div className='max-w-screen-xl mx-auto w-full px-[30px] bg-white ml-auto  '>
                            <div
                                className='md:max-w-[300px]'
                                id='navigation-menu-items'
                            >
                                <MenuNavigationLinks links={links} />
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    );
}

function MenuNavigationLinks({ links }: { links: MenuLink[] }) {
    return (
        <ul className='grid grid-cols-1  pb-[50px]'>
            {links.map((link, idx) => (
                <li
                    key={link.id}
                    className={clsx("py-[28px]", idx != 0 ? "border-t border-t-gray-400/20" : "")}
                >
                    {"links" in link ? (
                        <MenuCompoundNavigationLink compound_link={link} />
                    ) : (
                        <MenuSimpleLink link={link} />
                    )}
                </li>
            ))}
        </ul>
    );
}
function MenuCompoundNavigationLink({ compound_link }: { compound_link: CompoundNavigationLink }) {
    return (
        <div>
            <h2 className='font-medium text-lg py-[12px]'>{compound_link.label}</h2>
            <ul className=''>
                {compound_link.links.map((link) => (
                    <li
                        key={link.id}
                        className=' '
                    >
                        <Link
                            to={link.route}
                            className='block py-[12px] pl-[30px]'
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function MenuSimpleLink({ link }: { link: NavigationLink }) {
    return (
        <Link
            to={link.route}
            className='py-[12px] block'
        >
            {link.label}
        </Link>
    );
}

interface MenuBtnProps {
    /**
     * State
     */
    is_open: boolean;
    /**
     * Click handler
     */
    on_click: () => void;

    // /**
    //  * Classes
    //  */
    // calssName?: string;
}

/**
 * NavigationMobileMenuBtn
 */
function MenuButton({ is_open, on_click, ...props }: MenuBtnProps) {
    return (
        <button
            aria-label={is_open ? "Abrir menú de navegación" : "Cerrar menú de navegación"}
            onClick={on_click}
        >
            <span className='sr-only'>{is_open ? "Cerrar menú" : "Abrir menú"}</span>
            {is_open ? (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
            ) : (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                </svg>
            )}
        </button>
    );
}

function Personalizado() {
    return (
        <div className='text-xss flex gap-[5px] items-center  '>
            <span>P</span>
            <span>E</span>
            <span>R</span>
            <span>S</span>
            <span>O</span>
            <span>N</span>
            <span>A</span>
            <span>L</span>
            <span>I</span>
            <span>Z</span>
            <span>A</span>
            <span>D</span>
            <span>O</span>
        </div>
    );
}

function Logo() {
    return (
        <svg
            width='113'
            height='25'
            viewBox='0 0 113 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M3.2178 22.5066V4.19097C3.2178 3.34803 3.24497 2.4983 3.2178 1.65537V1.61912L0.477801 2.75209L2.5611 4.8345L7.54291 9.81958L13.5686 15.847L18.7769 21.0587C19.6193 21.9039 20.4413 22.774 21.3086 23.5943C21.3221 23.5943 21.3335 23.6192 21.3448 23.6305C21.5704 23.8515 21.8559 24.0014 22.1658 24.0615C22.4758 24.1216 22.7966 24.0893 23.0884 23.9687C23.3801 23.848 23.6301 23.6443 23.8072 23.3828C23.9844 23.1213 24.0809 22.8135 24.0848 22.4976V4.19776C24.0848 3.3503 24.1052 2.50057 24.0848 1.65537V1.61912C24.0848 0.778451 23.3466 -0.0259606 22.4815 0.0125605C22.0579 0.0195589 21.6536 0.191068 21.354 0.490852C21.0544 0.790636 20.883 1.19522 20.876 1.61912V19.9098C20.876 20.7573 20.8489 21.607 20.876 22.4545V22.4908L23.616 21.3578L21.5327 19.2731L16.5509 14.288L10.5229 8.26287L5.31469 3.0512C4.47457 2.20826 3.65031 1.33814 2.78302 0.517867L2.74679 0.481611C2.52107 0.261371 2.23577 0.112184 1.9262 0.0525057C1.61663 -0.00717223 1.29636 0.0252784 1.00503 0.145843C0.713693 0.266408 0.464076 0.469796 0.287057 0.730843C0.110038 0.991891 0.0133851 1.29914 0.00905783 1.61458V19.928C0.00905783 20.7732 -0.0113223 21.6206 0.00905783 22.4636V22.5021C0.00905783 23.3405 0.747272 24.1449 1.6123 24.1064C2.03553 24.0994 2.43952 23.9282 2.73904 23.6289C3.03857 23.3296 3.21022 22.9256 3.2178 22.5021V22.5066Z'
                fill='black'
            />
            <path
                d='M32.3868 23.6419L34.4701 21.555L39.452 16.5699L45.4732 10.5425L50.6814 5.33079C51.5261 4.48785 52.3979 3.66305 53.2153 2.79519L53.2516 2.75894L50.5138 1.62596V19.9167C50.5138 20.7642 50.4867 21.6139 50.5138 22.4613V22.4976L53.2516 21.3646L49.7167 17.8162L44.1349 12.2011L42.8441 10.9073C42.2508 10.3113 41.1616 10.2683 40.5797 10.9073C40.2869 11.2117 40.1233 11.6178 40.1233 12.0403C40.1233 12.4628 40.2869 12.8688 40.5797 13.1732L44.1145 16.7217L49.7009 22.3277L50.9894 23.6215C51.215 23.8425 51.5005 23.9924 51.8104 24.0525C52.1204 24.1126 52.4412 24.0803 52.7329 23.9596C53.0247 23.839 53.2747 23.6353 53.4518 23.3738C53.629 23.1122 53.7255 22.8044 53.7294 22.4885V4.19781C53.7294 3.35262 53.7588 2.50062 53.7294 1.65542V1.61917C53.7244 1.30373 53.6273 0.996648 53.45 0.735798C53.2727 0.474948 53.023 0.271747 52.7316 0.151269C52.4402 0.03079 52.12 -0.00169468 51.8104 0.0578225C51.5008 0.11734 51.2154 0.266254 50.9894 0.486193L48.8902 2.5686L43.9084 7.55368L37.8917 13.5856L32.6835 18.7973C31.8388 19.6425 30.9761 20.4718 30.1496 21.3329C30.1496 21.3465 30.1247 21.3578 30.1133 21.3692C29.5178 21.9651 29.4748 23.055 30.1133 23.6351C30.4178 23.9276 30.8235 24.0909 31.2456 24.0909C31.6676 24.0909 32.0733 23.9276 32.3778 23.6351L32.3868 23.6419Z'
                fill='black'
            />
            <path
                d='M59.2924 1.60789V19.9009C59.2924 20.7461 59.2629 21.5981 59.2924 22.4433V22.4795C59.2973 22.795 59.3944 23.102 59.5717 23.3629C59.749 23.6237 59.9988 23.8269 60.2901 23.9474C60.5815 24.0679 60.9018 24.1004 61.2114 24.0409C61.521 23.9813 61.8064 23.8324 62.0324 23.6125L65.5785 20.089L71.2283 14.4762L72.5213 13.1914H70.2569L73.7487 16.7104L79.3306 22.3186L80.6213 23.617C80.847 23.8373 81.1323 23.9865 81.4419 24.0461C81.7515 24.1058 82.0717 24.0734 82.3631 23.9528C82.6544 23.8322 82.904 23.6288 83.081 23.3678C83.2581 23.1067 83.3547 22.7995 83.359 22.4841V4.1888C83.359 3.34134 83.3794 2.49161 83.359 1.64414V1.60789C83.359 0.76722 82.6208 -0.037191 81.7558 0.00133006C81.3308 0.00656363 80.9245 0.177225 80.6231 0.477134C80.3217 0.777043 80.1489 1.18262 80.1413 1.60789V19.9009C80.1413 20.7461 80.1141 21.5981 80.1413 22.4433V22.4795L82.8812 21.3465L79.3827 17.8321L73.8121 12.2216L72.5213 10.9255C72.2177 10.6314 71.8117 10.467 71.3891 10.467C70.9666 10.467 70.5606 10.6314 70.2569 10.9255L66.704 14.4445L61.0428 20.055L59.7611 21.3443L62.5011 22.4773V4.1888C62.5011 3.34134 62.5215 2.49161 62.5011 1.64414V1.60789C62.5011 0.76722 61.7629 -0.037191 60.8956 0.00133006C60.4724 0.00890976 60.0686 0.180675 59.7695 0.480398C59.4704 0.78012 59.2994 1.18437 59.2924 1.60789Z'
                fill='black'
            />
            <path
                d='M111.392 0.0373841H93.1205C92.2736 0.0373841 91.4244 0.0169906 90.5775 0.0373841H90.5413C90.1175 0.0438151 89.7128 0.215141 89.4131 0.515046C89.1134 0.814951 88.9422 1.21986 88.9358 1.64394V19.9347C88.9358 20.7821 88.9177 21.6319 88.9358 22.4793V22.5156C88.9422 22.9397 89.1134 23.3446 89.4131 23.6445C89.7128 23.9444 90.1175 24.1157 90.5413 24.1221H108.822C109.669 24.1221 110.516 24.1403 111.363 24.1221H111.392C112.233 24.1221 113.036 23.3834 112.998 22.5156C112.991 22.0917 112.82 21.6871 112.52 21.3873C112.22 21.0875 111.816 20.916 111.392 20.909H93.1205C92.2736 20.909 91.4244 20.8818 90.5775 20.909C90.5655 20.9101 90.5533 20.9101 90.5413 20.909L92.1468 22.5156V4.22259C92.1468 3.37739 92.174 2.52539 92.1468 1.6802V1.64394L90.5413 3.24823H108.822C109.669 3.24823 110.516 3.26862 111.363 3.24823H111.392C112.233 3.24823 113.036 2.50953 112.998 1.64394C112.991 1.22004 112.82 0.815459 112.52 0.515675C112.22 0.215891 111.816 0.0443825 111.392 0.0373841Z'
                fill='black'
            />
            <path
                d='M111.394 10.4744H93.1216C92.2747 10.4744 91.4255 10.454 90.5786 10.4744H90.5424C89.7023 10.4744 88.8984 11.2131 88.9369 12.081C88.9445 12.5045 89.1161 12.9085 89.4156 13.2078C89.7152 13.5071 90.1191 13.6783 90.5424 13.6852H108.823C109.67 13.6852 110.517 13.7056 111.364 13.6852H111.394C112.234 13.6852 113.038 12.9465 112.999 12.0787C112.991 11.6552 112.82 11.2512 112.52 10.9519C112.221 10.6526 111.817 10.4814 111.394 10.4744Z'
                fill='black'
            />
        </svg>
    );
}
