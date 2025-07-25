import React from 'react';
import { motion } from 'framer-motion';

const BestPartsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.48 12.55a1 1 0 0 0-1 0l-1.9 1a1 1 0 0 1-1 0l-1.9-1a1 1 0 0 0-1 0L4 16.5V22l8-4 8 4v-5.5l-4.52-2.95z"/>
    </svg>
);

const MobileAppIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>
);

const EasySearchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <path d="M10.5 8.5v.01h.01V8.5h-.01zm-1.5 4a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0z" />
    </svg>
);

const FastDeliveryIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h2.4c.3 0 .6-.2.8-.4l2.9-3.9c.4-.5 1-.6 1.6-.3l1.8.9c.4.2.7.5.7.9V6h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-1"/>
        <circle cx="7" cy="18" r="2"/>
        <circle cx="17" cy="18" r="2"/>
    </svg>
);

interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    align: 'left' | 'right';
    delay: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, align, delay }) => {
    const alignmentClasses = align === 'right' 
        ? 'lg:flex-row-reverse lg:text-right' 
        : 'lg:flex-row lg:text-left';

    return (
        <div 
            className={`flex flex-col lg:items-start items-center text-center gap-4 ${alignmentClasses}`}
            data-aos="fade-up"
            data-aos-delay={delay}
        >
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-slate-800 rounded-full border-2 border-slate-700 text-[color:var(--color-primary)] group-hover:border-[color:var(--color-primary)]/50 group-hover:bg-[color:var(--color-primary)]/10 transition-colors duration-300">
                {icon}
            </div>
            <div className="flex-grow">
                <h4 className="text-2xl font-bold text-slate-100 mb-2" style={{fontFamily: 'var(--heading-font)'}}>{title}</h4>
                <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

const AppFeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <EasySearchIcon className="w-10 h-10"/>,
            title: "بحث متعدد الخيارات",
            description: "تجربة بحث فريدة تتيح لك العثور على القطع ليس فقط بالاسم، بل عبر رفع صورة للقطعة المطلوبة أو إدخال رقم هيكل السيارة (VIN) لضمان تطابق 100%.",
            align: 'right' as const
        },
        {
            icon: <BestPartsIcon className="w-10 h-10"/>,
            title: "جودة وموثوقية",
            description: "احصل على رؤية كاملة للسوق. تطبيقنا يعرض لك مقارنات شفافة للأسعار والمواصفات الفنية من شبكة واسعة من الموردين الموثوقين لمساعدتك على اتخاذ القرار الأفضل.",
            align: 'right' as const
        },
        {
            icon: <FastDeliveryIcon className="w-10 h-10"/>,
            title: "توصيل سريع",
            description: "لا مزيد من الانتظار الطويل. بمجرد إتمام طلبك، نعمل على تجهيزه وشحنه ليصلك في أسرع وقت ممكن، مع خيارات تتبع مباشرة من التطبيق.",
            align: 'left' as const
        },
        {
            icon: <MobileAppIcon className="w-10 h-10"/>,
            title: "تطبيق متكامل",
            description: "كل ما تحتاجه في مكان واحد. تطبيقنا المجاني هو بوابتك لإدارة طلباتك، حفظ سياراتك، والحصول على عروض حصرية مصممة خصيصاً لك.",
            align: 'left' as const
        },
    ];

    return (
        <section id="app-features" className="section bg-slate-900">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="section-title" data-aos="fade-up">
                    <h2>تجربة متكاملة بين يديك</h2>
                    <p className="text-lg">حمّل تطبيقنا واستمتع بشراء قطع غيار سيارتك بكل سهولة وأمان.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12 lg:gap-8 mt-12">
                    {/* Left Features */}
                    <div className="flex flex-col gap-12">
                        <FeatureItem {...features[0]} delay={100} />
                        <FeatureItem {...features[1]} delay={200} />
                    </div>

                    {/* Phone Mockup */}
                    <div className="order-first lg:order-none flex justify-center" data-aos="zoom-in-up" data-aos-delay="50">
                        <motion.div
                             animate={{ y: [-8, 8] }}
                             transition={{
                                 duration: 4,
                                 ease: "easeInOut",
                                 repeat: Infinity,
                                 repeatType: 'reverse'
                             }}
                             className="relative w-[300px] h-[600px] md:w-[340px] md:h-[680px]"
                        >
                            {/* يمكنك استبدال الرابط التالي برابط الصورة التي ستقوم بإنشائها */}
                            <img src="https://i.ibb.co/WNGRmwDs/wqddd-left.png" alt="تطبيق متجر قطع الغيار" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl-[0_25px_25px_rgba(0,0,0,0.5)]" />
                        </motion.div>
                    </div>

                    {/* Right Features */}
                    <div className="flex flex-col gap-12">
                        <FeatureItem {...features[2]} delay={300} />
                        <FeatureItem {...features[3]} delay={400} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppFeaturesSection;