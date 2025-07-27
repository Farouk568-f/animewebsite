import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '../constants.tsx';

const FAQ_DATA = [
    {
        question: "Is AnimeVerse a free service?",
        answer: "Yes, AnimeVerse is completely free to use for discovering anime. There are no hidden fees or subscription costs."
    },
    {
        question: "Where does the anime information come from?",
        answer: "Our application uses the Jikan API, which is an unofficial MyAnimeList API, to provide up-to-date information on anime series, ratings, and artwork."
    },
    {
        question: "Can I watch anime on this website?",
        answer: "No, AnimeVerse is a discovery platform, not a streaming service. We provide information about anime, including summaries, ratings, and links to trailers, but we do not host any video content for streaming."
    },
    {
        question: "Does this service work on mobile devices?",
        answer: "Absolutely! Our website is fully responsive and designed to work seamlessly on any device with a modern web browser, including iPhones, Android phones, and tablets."
    }
];

interface FaqItemProps {
    faq: { question: string; answer: string };
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-800" data-aos="fade-up">
            <button
                className="w-full flex justify-between items-center text-left py-6 px-2"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <h3 className="text-xl font-semibold text-slate-100">{faq.question}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-[color:var(--color-primary)] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto', y: 0 },
                            collapsed: { opacity: 0, height: 0, y: -10 }
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 px-2 text-slate-400 text-lg leading-relaxed">
                            <p>{faq.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="section-title" data-aos="fade-up">
                    <h2>Frequently Asked Questions</h2>
                    <p className="text-lg">Find answers to common questions about AnimeVerse.</p>
                </div>
                <div className="mt-8">
                    {FAQ_DATA.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;