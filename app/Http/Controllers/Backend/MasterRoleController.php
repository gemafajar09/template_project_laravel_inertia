<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\MenuModel;
use App\Models\Role;
use App\Models\SubRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MasterRoleController extends Controller
{
    //
    public function index(){
        return Inertia::render('Backend/Role/Index');
    }

    public function getRole(){
        $data['roles'] = Role::get()->map(function ($role) {
            $role->id = $role->id;
            $role->role = $role->name;
            $role->subrole = SubRole::where('role_id', $role->id)->get()->map(function ($subrole) {
                // $sub = '';
                $sub = ' 🔘'.$subrole->sub_role. ' ';

                return $sub;
            });
            return $role;
        });

        return response()->json($data);
    }

    public function tambahsubmenu(Request $request){
      $simpan = SubRole::create([
        'role_id' => $request->role_id,
        'sub_role' => $request->sub_role
      ]);

      if ($simpan) {
        return response()->json(['success' => 'Data berhasil disimpan.']);
      }else{
        return response()->json(['error' => 'Data gagal disimpan.']);
      }
    }

    public function getRoleId($id){
        $role =Role::whereId($id)->select('id','name')->first();

        $role->subrole = SubRole::where('role_id', $role->id)->select('id','sub_role')->get() ?? [];
        $data['role'] =  $role;

        return response()->json($data);
    }

    public function update(Request $r)
    {
        // dd($r->subrole);
        DB::beginTransaction();
        try {
            Role::whereId($r->id)->update([
                'name' => $r->name
            ]);

            foreach ($r->subrole as $value) {
                SubRole::Where('id',$value['id'])->update([
                    'sub_role' => $value['sub_role']
                ]);
            }
            DB::commit();
            return response()->json(['success' => 'Data berhasil disimpan.'],200);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response()->json(['error' => throw $th],400);
        }        
    }

    public function tambahrole(Request $r){
        DB::beginTransaction();
        try {
            Role::create([
                'name' => $r->name
            ]);
            DB::commit();
            return response()->json(['success' => 'Data berhasil disimpan.'],200);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response()->json(['error' => throw $th],400);
        }
    }

    public function hapus($id)
    {
        $delete = SubRole::whereId($id)->delete();
        if ($delete) {
            return response()->json(['success' => 'Data berhasil dihapus.']);
        }else{
            return response()->json(['error' => 'Data gagal dihapus.']);
        }
    }

}
