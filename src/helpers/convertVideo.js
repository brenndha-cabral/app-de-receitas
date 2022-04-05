//  Referência: https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
export default function convertVideo(url) {
  const ELEVEN = 11;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === ELEVEN) ? match[2] : null;
}
