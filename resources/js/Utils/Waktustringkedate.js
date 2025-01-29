export const Waktustringkedate = (timeString) => {
    // Pisahkan jam dan menit dari string
    const [hours, minutes] = timeString.split(':').map(Number);
  
    // Dapatkan tanggal hari ini
    const now = new Date();
  
    // Buat objek Date dengan waktu yang diatur
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  
    return date;
  }