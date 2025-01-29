<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index(){
        return Inertia::render('Auth/Login');
    }

    public function login(Request $r){
        try {
            if(Auth::guard('web')->attempt(['email' => $r->email, 'password' => $r->password])){                
                // 
                return Redirect::route('admin.home');
            }
            
            return Redirect::back()->withErrors('Invalid Emaik or Password');
            
        } catch (\Throwable $th) {
            return back()->withErrors($th);
        }
    }

    public function logout(Request $r){
        Auth::logout();
        
        $r->session()->invalidate();
        $r->session()->regenerateToken();
        return redirect('/');
    }
}
