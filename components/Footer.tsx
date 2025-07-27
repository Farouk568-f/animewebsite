import React from 'react';
import { FilmIcon, TwitterIcon, InstagramIcon, FacebookIcon } from '../constants.tsx';

const Footer: React.FC = () => {
  return (
<<<<<<< HEAD
    <footer id="footer" className="footer bg-[color:var(--surface-color)] text-slate-400 section pt-20 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="footer-about lg:col-span-1">
            <a href="#" className="logo flex items-center justify-center md:justify-start space-x-3 mb-4">
              <FilmIcon className="w-8 h-8 text-[color:var(--color-primary)]" />
              <span className="sitename text-3xl text-white">AnimeVerse</span>
            </a>
            <p className="mt-2 text-base max-w-sm mx-auto md:mx-0">
=======
    <footer id="footer" className="footer bg-slate-900 text-slate-400 section pt-20 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 text-center lg:text-left">
          <div className="footer-about lg:col-span-1">
            <a href="#" className="logo flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <FilmIcon className="w-8 h-8 text-[color:var(--color-primary)]" />
              <span className="sitename text-3xl text-white">AnimeVerse</span>
            </a>
            <p className="mt-2 text-base max-w-sm mx-auto lg:mx-0">
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
                Your portal to the universe of anime. Discover, explore, and get lost in the world of Japanese animation.
            </p>
          </div>

          <div className="footer-links">
<<<<<<< HEAD
            <h4 className="font-bold text-lg mb-4 text-slate-200 font-heading">Quick Links</h4>
=======
            <h4 className="font-bold text-xl mb-4 text-slate-200" style={{fontFamily: 'var(--heading-font)'}}>Quick Links</h4>
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
            <ul>
              <li className="py-1.5"><a href="#popular" className="hover:text-[color:var(--color-primary)] transition-colors text-base">Popular</a></li>
              <li className="py-1.5"><a href="#top-rated" className="hover:text-[color:var(--color-primary)] transition-colors text-base">Top Rated</a></li>
              <li className="py-1.5"><a href="#upcoming" className="hover:text-[color:var(--color-primary)] transition-colors text-base">Upcoming</a></li>
              <li className="py-1.5"><a href="#faq" className="hover:text-[color:var(--color-primary)] transition-colors text-base">FAQ</a></li>
            </ul>
          </div>
<<<<<<< HEAD

          <div className="footer-links">
            <h4 className="font-bold text-lg mb-4 text-slate-200 font-heading">Legal</h4>
            <ul>
              <li className="py-1.5"><a href="#" className="hover:text-[color:var(--color-primary)] transition-colors text-base">Terms of Service</a></li>
              <li className="py-1.5"><a href="#" className="hover:text-[color:var(--color-primary)] transition-colors text-base">Privacy Policy</a></li>
              <li className="py-1.5"><a href="#" className="hover:text-[color:var(--color-primary)] transition-colors text-base">DMCA</a></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
             <h4 className="font-bold text-lg mb-4 text-slate-200 font-heading">Stay Updated</h4>
            <p className="text-base">Subscribe to our newsletter for the latest anime news.</p>
            <form action="" className="mt-4 flex max-w-sm mx-auto">
              <input type="email" name="email" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] text-slate-200 placeholder-slate-500 text-base" placeholder="Your Email" />
              <input type="submit" value="Subscribe" className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] text-white font-semibold px-4 rounded-r-lg cursor-pointer hover:opacity-90 transition-opacity text-base" />
=======
          
          <div className="footer-newsletter">
             <h4 className="font-bold text-xl mb-4 text-slate-200" style={{fontFamily: 'var(--heading-font)'}}>Stay Updated</h4>
            <p className="text-base">Subscribe to our newsletter for the latest anime news.</p>
            <form action="" className="mt-4 flex max-w-sm mx-auto">
              <input type="email" name="email" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-200 placeholder-slate-500 text-base" placeholder="Your Email" />
              <input type="submit" value="Subscribe" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-4 rounded-r-lg cursor-pointer hover:opacity-90 text-base" />
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
            </form>
          </div>
        </div>

        <div className="copyright-wrap pt-8 mt-12 border-t border-slate-800">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center md:text-left text-base">
                    <p>&copy; {new Date().getFullYear()} AnimeVerse. All Rights Reserved.</p>
                </div>
                 <div className="social-links flex justify-center md:justify-end space-x-4">
<<<<<<< HEAD
                    <a href="#" className="text-slate-500 transition-all duration-300 transform hover:scale-110 hover:text-[color:var(--color-primary)]">
                        <TwitterIcon className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-slate-500 transition-all duration-300 transform hover:scale-110 hover:text-[color:var(--color-primary)]">
                        <FacebookIcon className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-slate-500 transition-all duration-300 transform hover:scale-110 hover:text-[color:var(--color-primary)]">
                        <InstagramIcon className="w-6 h-6" />
=======
                    <a href="#" className="text-slate-500 transition-all duration-300 transform hover:scale-110" style={{ color: 'inherit' }} onMouseOver={e => { e.currentTarget.style.color = 'var(--color-primary)'; }} onMouseOut={e => { e.currentTarget.style.color = ''; }}>
                        <TwitterIcon className="w-7 h-7" />
                    </a>
                    <a href="#" className="text-slate-500 transition-all duration-300 transform hover:scale-110" style={{ color: 'inherit' }} onMouseOver={e => { e.currentTarget.style.color = 'var(--color-primary)'; }} onMouseOut={e => { e.currentTarget.style.color = ''; }}>
                        <FacebookIcon className="w-7 h-7" />
                    </a>
                    <a href="#" className="text-slate-500 transition-all duration-300 transform hover:scale-110" style={{ color: 'inherit' }} onMouseOver={e => { e.currentTarget.style.color = 'var(--color-primary)'; }} onMouseOut={e => { e.currentTarget.style.color = ''; }}>
                        <InstagramIcon className="w-7 h-7" />
>>>>>>> 3ed2802c93c3d3a58134bc3b4abb9b3e4eff399a
                    </a>
                 </div>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;