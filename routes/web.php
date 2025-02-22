<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Backend\{
    DashboardController,
    MasterRoleController,
    MenuController,
    UserController
};

Route::middleware('belum_login')->group(function () {
    Route::get('/', [AuthController::class, 'index'])->name('/');
    Route::post('/login.action', [AuthController::class, 'login'])->name('login.action');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware('sudah_login')->group(function () {
    Route::get('/admin.home', [DashboardController::class, 'index'])->name('admin.home');
    // ##################################################################################################################
    // JANGAN DIHAPUS
    // ##################################################################################################################
    Route::get('/menu',[MenuController::class,'index'] )->name('menu');
    Route::get('/menu.tambah',[MenuController::class,'tambahmenu'] )->name('menu.tambah');
    Route::get('/menu.datamenurole/{role_id}/{subrole_id}',[MenuController::class,'getdatamenu'] )->name('menu.datamenurole');
    Route::post('/menu.store',[MenuController::class,'store'] )->name('menu.store');
    Route::get('/menu.listmenu',[MenuController::class,'listmenu'] )->name('menu.listmenu');
    Route::post('/menu.simpan',[MenuController::class,'simpan'] )->name('menu.simpan');
    Route::get('/menu.hapus/{menu_id}/{submenu_id?}/{submenudua_id?}',[MenuController::class,'hapus'] )->name('menu.hapus');

    // Data Master Role
    Route::get('/role',[MasterRoleController::class,'index'] )->name('role');
    Route::get('/role.get.id/{id}',[MasterRoleController::class,'getRoleId'] )->name('role.get.id');
    Route::get('/role.ambil',[MasterRoleController::class,'getRole'] )->name('role.ambil');
    Route::post('/role.tambah.submenu',[MasterRoleController::class,'tambahsubmenu'] )->name('role.tambah.submenu');
    Route::post('/role.update',[MasterRoleController::class,'update'] )->name('role.update');
    Route::post('/role.tambahrole',[MasterRoleController::class,'tambahrole'] )->name('role.tambahrole');
    Route::get('/role.hapus/{id}',[MasterRoleController::class,'hapus'] )->name('role.hapus');
    // ##################################################################################################################

    // Data User
    Route::get('/user',[UserController::class,'index'] )->name('user');
});
