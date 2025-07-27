import React from 'react';
import { TESTIMONIALS, StarIcon } from '../constants.tsx';
import { Testimonial } from '../types.ts';

interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
}

const QuoteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 36C12.8 36 9.86667 35.05 7.2 33.15C4.53333 31.25 2.53333 28.7667 1.2 25.7C-0.133333 22.6333 -0.133333 19.5667 1.2 16.5C2.53333 13.4333 4.53333 10.8833 7.2 8.85L11.4 12.45C9.6 13.95 8.25 15.6333 7.35 17.5C6.45 19.3667 6.45 21.05 7.35 22.55C8.25 24.05 9.6 25.2167 11.4 26.05V26.25C10.2667 26.45 9.16667 26.9833 8.1 27.85C7.03333 28.7167 6.13333 29.75 5.4 30.95C4.66667 32.15 4.4 33.3667 4.6 34.6C4.8 35.8333 5.33333 36.8333 6.2 37.6C5.2 37.2 4.26667 36.65 3.4 35.95C2.53333 35.25 1.83333 34.4167 1.3 33.45C0.766667 32.4833 0.633333 31.45 0.9 30.35C1.16667 29.25 1.76667 28.25 2.7 27.35C3.63333 26.45 4.8 25.7 6.2 25.1C7.6 24.5 9 24.2 10.6 24.2C12.4667 24.2 14.0333 24.7 15.3 25.7C16.5667 26.7 17.2 28 17.2 29.6C17.2 31.4667 16.6333 33.0333 15.5 34.3C14.3667 35.5667 12.9333 36.35 11.2 36.65L16 36ZM43 36C39.8 36 36.8667 35.05 34.2 33.15C31.5333 31.25 29.5333 28.7667 28.2 25.7C26.8667 22.6333 26.8667 19.5667 28.2 16.5C29.5333 13.4333 31.5333 10.8833 34.2 8.85L38.4 12.45C36.6 13.95 35.25 15.6333 34.35 17.5C33.45 19.3667 33.45 21.05 34.35 22.55C35.25 24.05 36.6 25.2167 38.4 26.05V26.25C37.2667 26.45 36.1667 26.9833 35.1 27.85C34.0333 28.7167 33.1333 29.75 32.4 30.95C31.6667 32.15 31.4 33.3667 31.6 34.6C31.8 35.8333 32.3333 36.8333 33.2 37.6C32.2 37.2 31.2667 36.65 30.4 35.95C29.5333 35.25 28.8333 34.4167 28.3 33.45C27.7667 32.4833 27.6333 31.45 27.9 30.35C28.1667 29.25 28.7667 28.25 29.7 27.35C30.6333 26.45 31.8 25.7 33.2 25.1C34.6 24.5 36 24.2 37.6 24.2C39.4667 24.2 41.0333 24.7 42.3 25.7C43.5667 26.7 44.2 28 44.2 29.6C44.2 31.4667 43.6333 33.0333 42.5 34.3C41.3667 35.5667 39.9333 36.35 38.2 36.65L43 36Z" fill="currentColor"/>
    </svg>
);


const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon 
                key={i} 
                className={`w-6 h-6 ${i < testimonial.rating ? 'text-[color:var(--color-primary)]' : 'text-slate-600'}`}
                filled={i < testimonial.rating}
            />
        ));
    };

    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group h-full"
        >
            <div className="glowing-border-card rounded-lg h-full p-1">
                <div className="bg-slate-900 rounded-md h-full flex flex-col p-10 relative overflow-hidden">
                     <QuoteIcon className="absolute top-8 right-8 text-slate-700/50" />
                    <div className="flex items-center mb-4 z-10">
                        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-slate-700/80 group-hover:border-[color:var(--color-primary)]/50 transition-colors duration-300" />
                        <div className="rtl:mr-4">
                            <h4 className="font-bold text-slate-100 text-xl" style={{fontFamily: 'var(--heading-font)'}}>{testimonial.name}</h4>
                            <p className="text-base text-slate-400">{testimonial.title}</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 space-x-1 rtl:space-x-reverse z-10">
                        {renderStars()}
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed flex-grow z-10">
                        {testimonial.text}
                    </p>
                </div>
            </div>
        </div>
    );
};

const TestimonialsSection: React.FC = () => {

    return (
        <section id="testimonials" className="section bg-slate-900">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="section-title" data-aos="fade-up">
                    <h2>ماذا يقول عملاؤنا؟</h2>
                    <p className="text-lg">
                        آراء حقيقية من عملائنا الذين يثقون في جودتنا وخدماتنا.
                    </p>
                </div>
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;