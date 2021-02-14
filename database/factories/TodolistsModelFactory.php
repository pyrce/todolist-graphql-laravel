<?php

namespace Database\Factories;

use App\Models\TodolistsModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodolistsModelFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TodolistsModel::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'titre' => $this->faker->name,
            'description' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
            'deadline' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'priorite_id' => random_int(1,3), // password
        ];
    }
}
