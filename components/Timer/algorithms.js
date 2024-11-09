
export const formatTime = (seconds) => {
    if(seconds < 0) return "00:00";
    let minutes = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };
