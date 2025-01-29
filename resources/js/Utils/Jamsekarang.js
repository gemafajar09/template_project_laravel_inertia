export const Jamsekarang = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Konversi jam ke format 12 jam
    hours = hours % 12;
    hours = hours ? hours : 12; // Jam 0 harus ditampilkan sebagai 12

    // Menambahkan nol di depan angka jika perlu
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return  `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`

}