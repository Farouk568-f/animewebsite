import React from 'react';

const CallToActionSection: React.FC = () => {
  return (
    <section className="section relative overflow-hidden bg-slate-900">
        <div className="aurora-bg"></div>
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4" style={{fontFamily: 'var(--heading-font)'}}>
                هل أنت مستعد لتحديث سيارتك؟
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
                لا تدع قطعة غيار تالفة تبطئ من سرعتك. تصفح مجموعتنا الواسعة اليوم أو استخدم مساعدنا الذكي للعثور على ما تحتاجه بالضبط في ثوانٍ.
            </p>
            <a 
                href="#hero" 
                className="relative group inline-block whitespace-nowrap bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] text-white font-semibold py-4 px-12 rounded-full transition-all duration-300 transform overflow-hidden text-xl hover:scale-105 hover:shadow-2xl hover:shadow-[color:var(--color-primary)]/30"
            >
                <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></span>
                <span className="relative z-10">ابدأ البحث الآن</span>
            </a>
        </div>
    </section>
  );
};

export default CallToActionSection;