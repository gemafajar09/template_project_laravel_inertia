<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Submenu extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('submenus')->insert([
            'menu_id' => 1,
            'name' => 'Role',
            'url' => 'role',
        ]);
        DB::table('submenus')->insert([
            'menu_id' => 1,
            'name' => 'Menu',
            'url' => 'menu',
        ]);
    }
}
