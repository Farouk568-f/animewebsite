import React, { useState, useEffect, useRef } from 'react';
import { Media, Episode } from '../types.ts';
import { ChevronLeftIcon } from '../constants.tsx';
import { motion } from 'framer-motion';
import Button from './Button.tsx';

interface VideoPlayerProps {
  media: Media;
  episode?: Episode;
  onClose: () => void;
  setContinueWatchingList: (list: any[]) => void;
  continueWatchingList: any[];
}

const sources = [
  { name: "Vidsrc.to (IMDb)", template: "IMDB_SPECIAL" },

  { name: "VidFast", template: "https://vidfast.pro/{path}" },
  { name: "MultiEmbed", template: "https://multiembed.mov/?video_id={path}&tmdb=1" },
];

const VideoPlayer: React.FC<VideoPlayerProps> = ({ media, episode, onClose, setContinueWatchingList, continueWatchingList }) => {
  const [activeSourceTemplate, setActiveSourceTemplate] = useState(sources[0].template);
  const [showServerMenu, setShowServerMenu] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  // سيرفر MultiEmbed المختار
  const [selectedMultiEmbedServer, setSelectedMultiEmbedServer] = useState(1);
  const [adblockDetected, setAdblockDetected] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // تحديد المسار الصحيح بناءً على المصدر ونوع العمل
  const getPath = (): string | { tmdb: string, season?: number, episode?: number } => {
    const isTV = media.media_type === 'tv';
    const season = episode?.season_number;
    const ep = episode?.episode_number;

    // ضمان وجود المعرفات
    const tmdb = media.id;
    const imdb = media.imdb_id;

    if (activeSourceTemplate.includes("multiembed.mov")) {
      if (!tmdb) return "";
      if (isTV) {
        return { tmdb: tmdb.toString(), season, episode: ep };
      } else {
        return { tmdb: tmdb.toString() };
      }
    }
    if (activeSourceTemplate.includes("vidsrc.to")) {
      if (!tmdb) return ""; // لا يمكن المتابعة بدون TMDB
      return isTV
        ? `tv/${tmdb}/${season}/${ep}`
        : `movie/${tmdb}`;
    } else {
      if (!imdb) return ""; // لا يمكن المتابعة بدون IMDb
      return isTV
        ? `tv/${imdb}/${season}/${ep}`
        : `movie/${imdb}`;
    }
  };

  const pathObj = getPath();

  // بناء رابط iframe لمصدر MultiEmbed بشكل ديناميكي
  let iframeSrc = "";
  if (activeSourceTemplate.includes("multiembed.mov")) {
    if (typeof pathObj === 'object' && pathObj.tmdb) {
      iframeSrc = `https://multiembed.mov/?video_id=${pathObj.tmdb}&tmdb=1`;
      if (media.media_type === 'tv' && pathObj.season && pathObj.episode) {
        iframeSrc += `&s=${pathObj.season}&e=${pathObj.episode}`;
      }
      iframeSrc += `&server=${selectedMultiEmbedServer}`;
      if (!iframeSrc.includes('autoplay=1')) {
        iframeSrc += "&autoplay=1";
      }
      if (!iframeSrc.includes('muted=1')) {
        iframeSrc += "&muted=1";
      }
    }
  } else {
    const path = typeof pathObj === 'string' ? pathObj : '';
    const validPath = path && path.trim() !== "";
    if (validPath) {
      let base = activeSourceTemplate.replace('{path}', path);
      // إذا كان الرابط يحتوي مسبقاً على ? أضف &، وإلا أضف ?
      const sep = base.includes('?') ? '&' : '?';
      iframeSrc = `${base}${sep}autoplay=1&muted=1`;
    } else {
      iframeSrc = "";
    }
  }

  const title = media.media_type === 'tv'
    ? `${media.title} - S${episode?.season_number} E${episode?.episode_number}`
    : media.title;

  // تخزين حالة المشاهدة
  useEffect(() => {
    if (!media) return;
    const newItem = {
      id: media.id,
      mediaType: media.media_type,
      title: media.title,
      poster: media.poster_path,
      imdb_id: media.imdb_id,
      season: episode?.season_number,
      episode: episode?.episode_number,
      updatedAt: Date.now(),
    };
    let filtered;
    if (media.media_type === 'tv') {
      // احذف أي حلقة سابقة من نفس المسلسل (id و mediaType فقط)
      filtered = continueWatchingList.filter((item: any) => !(item.id === newItem.id && item.mediaType === newItem.mediaType));
    } else {
      // للأفلام: احذف فقط نفس الفيلم بنفس id و mediaType
      filtered = continueWatchingList.filter((item: any) => !(item.id === newItem.id && item.mediaType === newItem.mediaType));
    }
    const updated = [newItem, ...filtered].slice(0, 10);
    setContinueWatchingList(updated);
  }, [media, episode]);

  // الانترو
  useEffect(() => {
    setShowIntro(true);
    if (!activeSourceTemplate.includes("multiembed.mov")) setSelectedMultiEmbedServer(1);
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, [media, episode, activeSourceTemplate]);

  // كشف AdBlocker
  useEffect(() => {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.height = '10px';
    document.body.appendChild(testAd);
    window.setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        setAdblockDetected(true);
      }
      document.body.removeChild(testAd);
    }, 100);
  }, []);

  // محاولة إخفاء عناصر إعلانات معروفة داخل iframe (لن تعمل إلا إذا كان نفس الأصل)
  useEffect(() => {
    const hideAdsInIframe = () => {
      try {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
          const adSelectors = [
            '.ad', '.ads', '.adsbox', '#ads', '.ad-container', '.ad-banner', '[id*="ad"]', '[class*="ad"]',
            'iframe[src*="ads"]', 'iframe[src*="doubleclick"]', 'iframe[src*="googlesyndication"]',
          ];
          adSelectors.forEach(sel => {
            const ads = iframe.contentDocument?.querySelectorAll(sel);
            ads?.forEach(ad => ad.remove());
          });
        }
      } catch (e) {
        // Cross-origin, لا يمكن التحكم
      }
    };
    const interval = setInterval(hideAdsInIframe, 2000);
    return () => clearInterval(interval);
  }, []);

  // محاولة منع تحميل بعض روابط الإعلانات الشائعة (لن تعمل إلا إذا كان نفس الأصل)
  useEffect(() => {
    const blockAdRequests = (e: any) => {
      const adPatterns = [
        'doubleclick.net', 'googlesyndication.com', 'adservice.google.com', 'ads.', '/ads/', 'popads', 'adsterra',
      ];
      if (adPatterns.some(pattern => e?.url?.includes(pattern))) {
        e.preventDefault && e.preventDefault();
        return false;
      }
    };
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      try {
        // لن تعمل إلا إذا كان نفس الأصل
        iframe.contentWindow.addEventListener('beforeunload', blockAdRequests, true);
      } catch (e) {}
    }
    return () => {
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.removeEventListener('beforeunload', blockAdRequests, true);
        } catch (e) {}
      }
    };
  }, []);

  // تكبير الصفحة عند فتح المشغل وإعادتها عند الإغلاق
  useEffect(() => {
    const prevZoom = document.body.style.zoom || '';
    document.body.style.zoom = '1.8';
    return () => {
      document.body.style.zoom = prevZoom || '1';
    };
  }, []);

  if (!media.imdb_id && !media.id) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ خطأ: لا يوجد معرف صالح</h2>
        <p className="text-center mb-6">لا يمكن تشغيل هذا العمل لعدم توفر أي من IMDb أو TMDB ID.</p>
        <button onClick={onClose} className="px-6 py-2 bg-[color:var(--color-primary-dark)] rounded-full font-bold hover:bg-[color:var(--color-primary)] transition-colors">إغلاق</button>
      </div>
    );
  }

  // منطق خاص لسيرفر Vidsrc.to (IMDb)
  if (activeSourceTemplate === "IMDB_SPECIAL") {
    const EMBED_URL = "https://vidsrc.to/embed";
    const path = media.media_type === 'tv'
      ? `tv/${media.imdb_id}/${episode?.season_number}/${episode?.episode_number}`
      : `movie/${media.imdb_id}`;
    const iframeSrc = `${EMBED_URL}/${path}`;
    const title = media.media_type === 'tv' ? `${media.title} - S${episode?.season_number} E${episode?.episode_number}` : media.title;
    if (!media.imdb_id) {
      return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center text-white p-6 text-center">
            <h2 className="text-2xl font-semibold text-white mb-3">Playback Error</h2>
            <p className="text-gray-400 max-w-md mb-8">
              We couldn't find the necessary ID to play this content. It might not be available from our streaming sources.
            </p>
            <Button onClick={onClose} variant="secondary">
              Go Back
            </Button>
        </div>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50"
      >
        {/* زر تغيير السيرفرات دائماً في الأعلى يمين */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setShowServerMenu(!showServerMenu)}
            className="w-12 h-12 bg-slate-800 hover:bg-[color:var(--color-primary-dark)] text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 3.75c.38-1.14 2.12-1.14 2.5 0l.2.6a1.5 1.5 0 001.43 1.02h.63c1.2 0 1.7 1.53.73 2.23l-.52.38a1.5 1.5 0 000 2.42l.52.38c.97.7.47 2.23-.73 2.23h-.63a1.5 1.5 0 00-1.43 1.02l-.2.6c-.38 1.14-2.12 1.14-2.5 0l-.2-.6A1.5 1.5 0 008.82 9.5h-.63c-1.2 0-1.7-1.53-.73-2.23l.52-.38a1.5 1.5 0 000-2.42l-.52-.38c-.97-.7-.47-2.23.73-2.23h.63a1.5 1.5 0 001.43-1.02l.2-.6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {showServerMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">
              {sources.map(source => (
                <button
                  key={source.template}
                  onClick={() => { setActiveSourceTemplate(source.template); setShowServerMenu(false); }}
                  className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                    activeSourceTemplate === source.template ? 'bg-[color:var(--color-primary-dark)] text-white' : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {source.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* اختيار سيرفر MultiEmbed دائماً في الأعلى يمين */}

        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-11 h-11 bg-black/50 rounded-full text-white hover:bg-[color:var(--color-primary)]/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close player"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg sm:text-xl font-bold truncate mx-4 drop-shadow-md">{title}</h1>
          <div className="w-11"></div>
        </header>
        <div className="w-full h-full bg-black">
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Video Player"
          ></iframe>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* رسالة توجيهية للمستخدم لتفعيل AdBlocker */}



      {/* زر الرجوع */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onClose}
          className="w-12 h-12 bg-slate-800 hover:bg-[color:var(--color-primary-dark)] text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <ChevronLeftIcon className="w-7 h-7" />
        </button>
      </div>

      {/* عرض iframe أو رسالة خطأ */}
      {iframeSrc ? (
        <iframe
          ref={iframeRef}
          key={iframeSrc}
          src={iframeSrc}
          referrerPolicy="strict-origin-when-cross-origin"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
          className="w-full h-full"
          style={{ visibility: showIntro ? 'hidden' : 'visible' }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-red-500 text-xl font-bold bg-black">
          ⚠️ لا يمكن تحميل الفيديو - المعرف غير صالح أو غير متوفر
        </div>
      )}
    </div>
  );
};

// أنيمشن الانترو
const style = document.createElement('style');
style.innerHTML = `
@keyframes intro-fade {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes intro-scale {
  0% { transform: scale(0.7); }
  20% { transform: scale(1.1); }
  80% { transform: scale(1); }
  100% { transform: scale(0.95); }
}
@keyframes intro-bar {
  0% { width: 0; opacity: 0; }
  30% { width: 6rem; opacity: 1; }
  80% { width: 6rem; opacity: 1; }
  100% { width: 0; opacity: 0; }
}
.animate-intro-fade {
  animation: intro-fade 5s ease-in-out both;
}
.animate-intro-scale {
  animation: intro-scale 5s ease-in-out both;
}
.animate-intro-bar {
  animation: intro-bar 5s ease-in-out both;
}
`;
if (typeof window !== 'undefined' && !document.head.querySelector('style[data-intro]')) {
  style.setAttribute('data-intro', '');
  document.head.appendChild(style);
}

export default VideoPlayer;
