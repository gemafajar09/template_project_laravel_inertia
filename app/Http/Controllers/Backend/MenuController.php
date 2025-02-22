<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Core\CoreController;
use App\Models\DataRoleMenu;
use App\Models\Menu;
use App\Models\Role;
use App\Models\Submenu;
use App\Models\Submenudua;
use App\Models\SubRole;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index(){
        // Ambil menu berdasarkan role
        $menus = DB::table('menus')
            ->select('menus.id', 'menus.name', 'menus.url')
            ->get();

        // Ambil submenu berdasarkan role
        $submenus = DB::table('submenus')
            ->select('submenus.id', 'submenus.name', 'submenus.url', 'submenus.menu_id')
            ->get()->map(function ($submenu) {
                $submenu->submenu = DB::table('submenuduas')
                ->where('submenuduas.submenu_id', $submenu->id)
                ->select('submenuduas.id', 'submenuduas.name', 'submenuduas.url', 'submenuduas.menu_id', 'submenuduas.submenu_id')
                ->get() ?? [];
                return $submenu;
            });
            
        // Menata submenu dalam struktur yang lebih mudah digunakan
        $menusWithSubmenus = $menus->map(function ($menu) use ($submenus) {
            $menu->submenu = $submenus->where('menu_id', $menu->id)->values();
            return $menu;
        });
        
        $data['menus'] = $menusWithSubmenus;
        $data['roles'] = Role::all();
        $data['subroles'] = SubRole::all();

        return Inertia::render('Backend/Menu/Index',$data);
    }

    public function store(Request $request){
        DB::beginTransaction();
        try {
            DataRoleMenu::where('role_id', $request->role_id)->where('subrole_id', $request->subrole_id)->delete();
            DataRoleMenu::create([
                'role_id' => $request->role_id,
                'subrole_id' => $request->subrole_id,
                'data' => json_encode($request->data)
            ]);

            DB::commit();
            return back()->withErrors('Data berhasil disimpan');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->withErrors($th->getMessage());
        }

    }

    public function getdatamenu($role_id, $subrole_id){
        $query = DataRoleMenu::whereRoleId($role_id)->whereSubroleId($subrole_id)->first();

        if(!$query){
            return response()->json(['menu' => [
                'role_id' => $role_id,
                'subrole_id' => $subrole_id,
                'data' => [],
            ]]);
        }

        $data['menu'] = array(
            'role_id' => $role_id,
            'subrole_id' => $subrole_id,
            'data' => json_decode($query->data)
        ) ?? [];
        return response()->json($data);
    }

    public function listmenu(){
        $user = Auth::user();
        $menu = DataRoleMenu::where('role_id', $user->role_id)->where('subrole_id', $user->subrole_id ?? 0)->first();
        if($menu){
            $array = json_decode($menu->data);
        }else{
            $array = [];
        }
        $data['menu'] = $array;

        return response()->json($data);
    }

    public function tambahmenu(){
        return Inertia::render('Backend/Menu/Post');
    }

    public function simpan(Request $r){
        DB::beginTransaction();
        try {
            //code...
            if($r->menu_id != null){
                if($r->submenu_id != null){
                    Submenudua::create([
                        'menu_id' => $r->menu_id,
                        'submenu_id' => $r->submenu_id,
                        'name' => $r->submenudua_name,
                        'url' => $r->submenudua_url,
                    ]);
                }else{
                    Submenu::create([
                        'menu_id' => $r->menu_id,
                        'name' => $r->submenu_name,
                        'url' => $r->submenu_url,
                    ]);
                }
            }else{
                Menu::create([
                    'name' => $r->menu_name,
                    'url' => $r->menu_url,
                ]);
            }

            DB::commit();
            return back()->withErrors("Data Berhasil Disimpan");
        } catch (\Throwable $th) {
            //throw $th;
            return back()->withErrors(throw $th);
            DB::rollBack();
        }
    }

    public function hapus($menu_id, $submenu_id = null, $submenudua_id = null){
        DB::beginTransaction();
        try {
            //code...
            if($menu_id != null && $submenu_id != null && $submenudua_id != null){
                Submenudua::whereId($submenudua_id)->delete();
            }elseif($menu_id != null && $submenu_id != null){
                Submenu::whereId($submenu_id);
                Submenudua::whereSubmenuId($submenu_id)->delete();
            }elseif($menu_id != null){
                Menu::whereId($menu_id)->delete();
                Submenu::whereMenuId($submenu_id);
                Submenudua::whereSubmenuId($submenu_id)->delete();
            }
            DB::commit();
            return back()->withErrors('Berhasil Dihapus');
        } catch (\Throwable $th) {
            //throw $th;
            return back()->withErrors(throw $th);
        }
    }

}
