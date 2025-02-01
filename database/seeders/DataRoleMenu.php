<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use stdClass;

class DataRoleMenu extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('data_role_menu')->insert([
            'role_id' => 1,
            'subrole_id' => 0,
            'data' =>   '[
                            {"id":1,"name":"Configuration","url":null,"submenu":[
                                    {"id":1,"name":"Role","url":"role","submenu":[]},
                                    {"id":2,"name":"Menu","url":"menu","submenu":[]}
                                ]
                            }
                        ]',
        ]);
    }
}
