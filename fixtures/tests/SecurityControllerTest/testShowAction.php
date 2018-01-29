<?php

return [
  \App\Entity\User::class => [
    'user_entity_new' => [
      'username' => 'Test New Admin',
      'password' => '<(password_hash("password_old", PASSWORD_BCRYPT))>',
      'email' => 'newguy@test.com',
      '__calls' => [
        ['activate' => []],
        ['addRole' => ['@role_entity_user']],
        ['addRole' => ['@role_entity_admin']],
      ],
    ],
  ],
  \App\Entity\Blade::class => [
    'blade_entity_{1..50}' => [
      'user' => '@user_entity_new',
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
