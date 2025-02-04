const DB_NAME = 'databases';
const DB_VERSION = 1;
const STORE_NAME = 'items';

// Membuka atau membuat IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Jika database baru atau versi berubah
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'role_id' });
      }
    };

    // Jika berhasil membuka database
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    // Jika gagal membuka database
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Fungsi untuk menambah data (Create)
const addItem = (item) => {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const existingToko = store.get(item.role_id);

    console.log(item);
    
    const request = existingToko ? store.put(item) : store.add(item);

    // const request = store.add(item);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  });
};

// Fungsi untuk mendapatkan semua data (Read)
const getAllItems = () => {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  });
};

// Fungsi untuk mendapatkan semua data (Read)
const getItemsById = (id) => {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  });
};

// Fungsi untuk memperbarui data (Update)
const updateItem = (item) => {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(item);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  });
};

// Fungsi untuk menghapus data (Delete)
const deleteItem = (id) => {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(id);
      request.onerror = (event) => reject(event.target.error);
    });
  });
};

export { addItem, getAllItems, getItemsById, updateItem, deleteItem };
