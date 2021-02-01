<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrioritesModel extends Model
{
    use HasFactory;
    protected $table = 'priorites';
    public $timestamps = false;
    public function priorites(){
        return $this->hasMany(TodolistsModel::class,'priorite_id');
    }
}
