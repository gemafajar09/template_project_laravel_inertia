export const formatRupiah = (jumlah) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(jumlah)
}