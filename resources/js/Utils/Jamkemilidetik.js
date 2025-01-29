export const timeStringToMilliseconds = (timeString) => {
    // Pisahkan jam dan menit dari string
    const [hours, minutes] = timeString.split(':').map(Number);

    // Hitung milidetik
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}