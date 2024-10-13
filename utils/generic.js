export const checkYouTubeVideoExists = async (videoId) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=id`;
  const response = await fetch(url);
  const data = await response.json();

  return data.items && data.items.length > 0;
};

export const getYouTubeVideoTitle = async (videoId) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.title;
    } else {
      throw new Error('Video not found');
    }
  } catch (error) {
    console.error(error);
  }
};

export const capitaliseString = (s) =>{
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getSeconds = (s) =>{
  const li=s.split(":");
  return parseInt(li[0])*60+parseInt(li[1]);
}