<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataRoleMenu extends Model
{
    protected $table = 'data_role_menu';
    protected $fillable = ['role_id', 'subrole_id','data'];
    
}
