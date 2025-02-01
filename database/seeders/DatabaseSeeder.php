<?php

namespace Database\Seeders;

use Dflydev\DotAccessData\Data;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            Role::class,
            Menu::class,
            Submenu::class,
            DataRoleMenu::class,
            User::class,
        ]);
    }
}
