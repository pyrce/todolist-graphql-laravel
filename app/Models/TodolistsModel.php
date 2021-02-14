<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodolistsModel extends Model
{
    use HasFactory;
    protected $table = 'Todolists';
    public $timestamps = false;
    public function priorites(){
        return $this->belongsTo(PrioritesModel::class,'priorite_id');
    }
}
