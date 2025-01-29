import { Waktustringkedate } from "./Waktustringkedate";

export const selisihwaktu = (waktubooking) => {
    const bataswaktu = Waktustringkedate(waktubooking)
    const now = new Date();
      
    const difference = bataswaktu.getTime() - now.getTime()
    const wakktu2jam = 2 * 60 * 60 * 1000;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    if (difference > 0 && difference < wakktu2jam) {
        return `${hours}jam%20${minutes}menit`
    } else{
        return "waktu expire"
    }

};