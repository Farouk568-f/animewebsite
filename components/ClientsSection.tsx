import React, { useEffect, useRef } from 'react';
import { ToyotaLogo, HondaLogo, FordLogo, BmwLogo, MercedesLogo, AudiLogo, VolkswagenLogo, NissanLogo, HyundaiLogo, KiaLogo } from '../constants.tsx';

const brands = [
    { logo: <ToyotaLogo />, name: "Toyota" },
    { logo: <HondaLogo />, name: "Honda" },
    { logo: <FordLogo />, name: "Ford" },
    { logo: <BmwLogo />, name: "BMW" },
    { logo: <MercedesLogo />, name: "Mercedes" },
    { logo: <AudiLogo />, name: "Audi" },
    { logo: <VolkswagenLogo />, name: "Volkswagen" },
    { logo: <NissanLogo />, name: "Nissan" },
    { logo: <HyundaiLogo />, name: "Hyundai" },
    { logo: <KiaLogo />, name: "Kia" },
];

const ClientLogo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex-shrink-0 flex justify-center items-center w-40">
        <div className="text-slate-500 transition-all duration-300 hover:text-white filter grayscale hover:grayscale-0 hover:scale-110 h-20 flex items-center justify-center">
            {children}
        </div>
    </div>
);

const ClientsSection: React.FC = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            scroller.setAttribute("data-animated", "true");
            const scrollerInner = scroller.querySelector('.scroller-inner');
            if(scrollerInner) {
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach(item => {
                    const duplicatedItem = item.cloneNode(true) as HTMLElement;
                    duplicatedItem.setAttribute('aria-hidden', 'true');
                    scrollerInner.appendChild(duplicatedItem);
                });
            }
        }
    }, []);

    return (
        <section id="brands" className="section bg-slate-950/70">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="section-title" data-aos="fade-up">
                    <h2>الماركات التي نخدمها</h2>
                    <p className="text-lg">نحن نوفر قطع غيار لمجموعة واسعة من الماركات العالمية الرائدة.</p>
                </div>

                <div ref={scrollerRef} className="scroller overflow-hidden" data-aos="fade-up">
                    <div className="scroller-inner">
                        {brands.map((brand, index) => (
                            <ClientLogo key={index}>{brand.logo}</ClientLogo>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;