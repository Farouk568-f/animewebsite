import React from 'react';
import { AiIcon, QualityIcon, CarEngineIcon } from '../constants.tsx';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children, delay }) => {
  return (
    <div 
      data-aos="fade-up"
      data-aos-delay={delay}
      className="group h-full"
    >
      <div className="glowing-border-card rounded-lg h-full p-1">
        <div className="bg-slate-900 rounded-md h-full p-10">
            <div className={`mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]`}>
              {icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-100" style={{fontFamily: 'var(--heading-font)'}}>{title}</h3>
            <p className="text-slate-400 text-lg leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUsSection: React.FC = () => {
  const features = [
    { 
      icon: <AiIcon className="w-9 h-9"/>, 
      title: "مساعدة ذكية بالذكاء الاصطناعي",
      description: "تجاوز البحث التقليدي. مساعدنا المدعوم بالذكاء الاصطناعي يفهم استفساراتك باللغة الطبيعية، سواء كنت تبحث برقم القطعة، موديل السيارة، أو حتى بوصف المشكلة."
    },
    { 
      icon: <QualityIcon className="w-9 h-9"/>, 
      title: "جودة مضمونة وأصلية",
      description: "نحن نلتزم بأعلى معايير الجودة. كل قطعة غيار تأتي من موردين معتمدين وتخضع لفحوصات دقيقة لضمان أداء موثوق وطويل الأمد لسيارتك."
    },
    { 
      icon: <CarEngineIcon className="w-9 h-9"/>, 
      title: "تغطية شاملة للماركات",
      description: "سواء كنت تملك سيارة يابانية، ألمانية، أو أمريكية، ستجد ما تحتاجه في مخزوننا الضخم الذي يغطي أكثر من 100 ماركة عالمية وموديلاتها المختلفة."
    },
  ];

  return (
    <section id="why-us" className="section bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-title" data-aos="fade-up">
          <h2>لماذا تختارنا؟</h2>
          <p className="text-lg">نحن نجمع بين التكنولوجيا المتقدمة والجودة التي لا تضاهى لنقدم لك تجربة شراء قطع غيار سيارات استثنائية.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              icon={feature.icon} 
              title={feature.title}
              delay={100 * (index + 1)}
              >
              {feature.description}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;