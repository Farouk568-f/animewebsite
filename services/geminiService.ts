import { VideoInfo, ChatMessage } from './types.ts';

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
}

const mockVideoInfo: (id: string) => VideoInfo = (id) => ({
  id: id,
  title: "A Great Example Video - Fun and Informative!",
  thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  duration: "4:20",
  formats: [
    // Video + Audio
    { format_id: "22", resolution: "1280x720", ext: "mp4", vcodec: "avc1.64001F", acodec: "mp4a.40.2", filesize: 47990000, type: 'video', note: '720p' },
    { format_id: "18", resolution: "640x360", ext: "mp4", vcodec: "avc1.42001E", acodec: "mp4a.40.2", filesize: 16000000, type: 'video', note: '360p' },

    // Video only
    { format_id: "137", resolution: "1920x1080", ext: "mp4", vcodec: "avc1.640028", filesize: 92500000, type: 'video', note: '1080p' },
    { format_id: "248", resolution: "1920x1080", ext: "webm", vcodec: "vp9", filesize: 51200000, type: 'video', note: '1080p' },
    { format_id: "303", resolution: "2560x1440", ext: "webm", vcodec: "vp9", filesize: 102400000, type: 'video', note: '1440p' },
    { format_id: "313", resolution: "3840x2160", ext: "webm", vcodec: "vp9", filesize: 235500000, type: 'video', note: '2160p, 4K' },

    // Audio only
    { format_id: "140", resolution: "audio only", ext: "m4a", acodec: "mp4a.40.2", filesize: 3350000, type: 'audio', note: '128k' },
    { format_id: "251", resolution: "audio only", ext: "webm", acodec: "opus", filesize: 2000000, type: 'audio', note: '160k' },
    { format_id: "249", resolution: "audio only", ext: "webm", acodec: "opus", filesize: 980000, type: 'audio', note: '50k' },
  ],
});


export const fetchVideoInfo = async (url: string): Promise<VideoInfo> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        resolve(mockVideoInfo(videoId));
      } else if (url.trim() === "") {
        reject(new Error("Please enter a YouTube URL."));
      }
      else {
        reject(new Error("Invalid YouTube URL. Please enter a valid link."));
      }
    }, 1500); // Simulate network delay
  });
};

export const getChatResponse = async (history: ChatMessage[], prompt: string): Promise<string> => {
    console.log("Chat history:", history);
    console.log("User prompt:", prompt);

    return new Promise((resolve) => {
        setTimeout(() => {
            if (prompt.includes("زيت")) {
                resolve("لدينا مجموعة واسعة من زيوت المحركات. لأي سيارة تبحث؟ يرجى تزويدي بنوع السيارة والموديل.");
            } else if (prompt.includes("فرامل")) {
                resolve("بالتأكيد. هل تبحث عن فحمات فرامل أم هوبات؟ وما هو موديل سيارتك؟");
            } else {
                resolve("أنا هنا للمساعدة في كل ما يتعلق بقطع غيار السيارات. كيف يمكنني خدمتك بشكل أفضل؟");
            }
        }, 1000); // Simulate API response time
    });
};