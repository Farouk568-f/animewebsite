import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoInfo, DownloadFormat } from '../types.ts';
import { DownloadIcon } from '../constants.tsx';

interface DownloadSectionProps {
  videoInfo: VideoInfo | null;
  isLoading: boolean;
}

const SkeletonLoader: React.FC = () => (
    <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 p-6 rounded-2xl animate-pulse">
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <div className="w-full aspect-video bg-slate-800 rounded-lg"></div>
            </div>
            <div className="md:col-span-2 space-y-4">
                <div className="h-8 bg-slate-800 rounded w-3/4"></div>
                <div className="h-6 bg-slate-800 rounded w-1/2"></div>
            </div>
        </div>
        <div className="mt-6 border-t border-slate-800 pt-4">
            <div className="h-6 bg-slate-800 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-slate-800 rounded-lg"></div>
                ))}
            </div>
        </div>
    </div>
);

const formatBytes = (bytes: number | null, decimals = 2) => {
    if (bytes === null) return 'N/A';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const CodecBadge: React.FC<{ codec?: string }> = ({ codec }) => {
    if (!codec) return null;
    const codecName = codec.split('.')[0];
    return <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-1 rounded">{codecName}</span>;
}

const FormatTable: React.FC<{ formats: DownloadFormat[], type: 'video' | 'audio' }> = ({ formats, type }) => {
    if (formats.length === 0) return null;
    
    return (
        <div>
            <h4 className="text-xl font-bold text-slate-200 mb-4">{type === 'video' ? 'Video Formats' : 'Audio Formats'}</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead className="text-sm text-slate-400 border-b-2 border-slate-700">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">{type === 'video' ? 'Resolution' : 'Quality'}</th>
                            <th className="p-3">Ext</th>
                            <th className="p-3 hidden sm:table-cell">Codec</th>
                            <th className="p-3">Size</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {formats.map((format) => (
                            <tr key={format.format_id} className="hover:bg-slate-800/50 transition-colors duration-200">
                                <td className="p-3 font-mono text-slate-400">{format.format_id}</td>
                                <td className="p-3 font-semibold text-slate-100">{format.note || format.resolution}</td>
                                <td className="p-3 uppercase font-semibold text-[color:var(--color-primary)]">{format.ext}</td>
                                <td className="p-3 hidden sm:table-cell">
                                    <div className="flex items-center gap-2">
                                        <CodecBadge codec={format.vcodec} />
                                        <CodecBadge codec={format.acodec} />
                                    </div>
                                </td>
                                <td className="p-3">{formatBytes(format.filesize)}</td>
                                <td className="p-3 text-right">
                                    <a href="#" download className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[color:var(--color-primary-dark)] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:bg-[color:var(--color-primary)] hover:scale-105 text-sm">
                                        <DownloadIcon className="w-5 h-5"/>
                                        <span className="hidden md:inline">Download</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const DownloadSection: React.FC<DownloadSectionProps> = ({ videoInfo, isLoading }) => {
  if (isLoading) {
      return (
          <section id="download-results" className="section pt-0">
              <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <SkeletonLoader />
              </div>
          </section>
      );
  }

  const videoFormats = videoInfo?.formats.filter(f => f.type === 'video').sort((a,b) => (b.filesize || 0) - (a.filesize || 0)) ?? [];
  const audioFormats = videoInfo?.formats.filter(f => f.type === 'audio').sort((a,b) => (b.filesize || 0) - (a.filesize || 0)) ?? [];

  return (
    <AnimatePresence>
      {videoInfo && (
        <motion.section
          id="download-results"
          className="section pt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/20">
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                <div className="md:col-span-1">
                  <img src={videoInfo.thumbnailUrl} alt={videoInfo.title} className="w-full rounded-lg aspect-video object-cover" />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 line-clamp-2" style={{ fontFamily: 'var(--heading-font)' }}>{videoInfo.title}</h3>
                  <p className="text-slate-400 mt-2 text-lg">Duration: {videoInfo.duration}</p>
                </div>
              </div>
              <div className="mt-8 border-t border-slate-700/50 pt-6 space-y-8">
                <FormatTable formats={videoFormats} type="video" />
                <FormatTable formats={audioFormats} type="audio" />
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default DownloadSection;
