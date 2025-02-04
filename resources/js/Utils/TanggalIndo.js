export const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    return formatter.format(date);
};

export const formatBulan = (dateString) => {    
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("id-ID", {
        month: "long",
        year: "numeric",
    });
    return formatter.format(date);
};

export const formatHari = (dateString) => {    
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("id-ID",  { weekday: 'long' });
    return formatter.format(date);
};

export const formatDate = (date) => {
    const year = date.getFullYear(); // Mendapatkan tahun (4 digit)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mendapatkan bulan (1-12) dan memastikan 2 digit
    const day = String(date.getDate()).padStart(2, '0'); // Mendapatkan hari dalam bulan dan memastikan 2 digit  
    
    return `${year}-${month}-${day}`;
};