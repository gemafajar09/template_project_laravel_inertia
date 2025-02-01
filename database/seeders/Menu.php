<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Menu extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menus')->insert([
            'name' => 'Configuration',
            'url' => ''
        ]);
        DB::table('menus')->insert([
            'name' => 'Dashboard',
            'url' => 'admin.home'
        ]);
    }
}
