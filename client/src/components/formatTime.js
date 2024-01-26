function formatTime (currenttime){
  const getTwoDigits = (num) => String(num).padStart(2, '0');
  const hours = getTwoDigits(Math.floor(currenttime / 3600));
  const minutes = getTwoDigits(Math.floor((currenttime % 3600) / 60));
  const seconds = getTwoDigits(currenttime % 60);

  return `${hours}:${minutes}:${seconds}`;

};

export default formatTime;