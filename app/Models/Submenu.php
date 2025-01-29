<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submenu extends Model
{
    protected $table = 'submenus';
    protected $fillable = ['menu_id','name','url'];
}
