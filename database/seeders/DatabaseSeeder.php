<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\TodolistsModel;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('Priorites')->insert([
            'libelle' =>"Faible"
        ]);
        DB::table('Priorites')->insert([
            'libelle' =>"Moyen"
        ]);
        DB::table('Priorites')->insert([
            'libelle' =>"Fort"
        ]);
         TodolistsModel::factory(10)->create();
    }
}
