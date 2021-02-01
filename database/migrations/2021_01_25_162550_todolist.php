<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Todolist extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Todolists', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->date('deadline');
            $table->string('description');
            $table->boolean('etat')->nullable();
            $table->integer('priorite_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Todolists');
    }
}
