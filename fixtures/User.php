<?php

return [
  \App\Entity\User::class => [
    'user_entity (template)' => [
      'nations' => '@nation_entity_{1..7}',
      'drivers' => '@driver_entity_{1..5}',
    ],
    'user_entity_admin (extends user_entity)' => [
      'username' => 'Test Admin',
      'password' => '<(password_hash("password_admin", PASSWORD_BCRYPT))>',
      'email' => 'admin@test.com',
      '__calls' => [
        ['activate' => []],
        ['addRole' => ['@role_entity_user']],
        ['addRole' => ['@role_entity_admin']],
      ],
    ],
    'user_entity_normal (extends user_entity)' => [
      'username' => 'Test User',
      'password' => '<(password_hash("password_user", PASSWORD_BCRYPT))>',
      'email' => 'user@test.com',
      '__calls' => [
        ['activate' => []],
        ['addRole' => ['@role_entity_user']],
      ],
    ],
  ],
];
