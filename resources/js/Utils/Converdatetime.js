export const convertToDateTime = (timeString, dateString) => {
    // Misalkan timeString = "14:30" dan dateString = "2024-10-21"
    const [hours, minutes] = timeString.split(':');

    // Membuat objek Date
    const dateTime = new Date(`${dateString}T${hours}:${minutes}:00`);

    const waktuMasuk = new Date(`${dateString}T10:00:00`); // Misalkan keterlambatan 30 menit

    // Hitung selisih waktu dalam milidetik
    const selisih = dateTime - waktuMasuk;

    // Jika tidak terlambat
    if (selisih <= 0) {
        return ""
    } else {
        // Konversi milidetik ke menit
        const menitTerlambat = Math.floor(selisih / 1000 / 60);
        return `${menitTerlambat} menit`;
    }
}

export const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);  // Mendapatkan jumlah jam
    const remainingMinutes = minutes % 60;  // Mendapatkan sisa menit

    return `${hours} jam ${remainingMinutes} menit`;
}