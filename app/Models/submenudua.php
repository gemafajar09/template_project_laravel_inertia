<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submenudua extends Model
{
    //
    protected $table = 'submenuduas';
    protected $fillable = ['menu_id','submenu_id','name','url'];
}
