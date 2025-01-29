<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubRole extends Model
{
    protected $table = 'sub_roles';
    protected $fillable = ['role_id','sub_role'];
}
