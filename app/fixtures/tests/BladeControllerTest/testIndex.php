<?php

return [
  \App\Entity\Blade::class => [
    'blade_entity_{1..50}' => [
      'user' => '@user_entity_*',
      'name (unique)' => '<word()>',
      'isMerc' => '90%? true : false',
      'mercTeamName' => '10%? <words(2, true)>',
      'element' => '@element_entity_*',
      'gender' => '@gender_entity_*',
      'battleRole' => '@battle_role_entity_*',
      'weaponClass' => '@weapon_class_entity_*',
      'rarity' => '<numberBetween(1, 5)>',
      'affinity' => '<numberBetween(5, 20)>',
      'affinityTotal' => '<numberBetween(20, 45)>',
      'trust' => '@trust_rank_*',
      'strength' => '<numberBetween(10,35)>',
      'driver' => '@driver_entity_*',
      'canBeReleased' => '<boolean()>',
    ],
  ],
];
