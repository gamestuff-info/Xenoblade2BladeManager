<?php

return [
  \App\Entity\User::class => [
    'user_entity_admin' => [
      'username' => 'Test Admin',
      'password' => '<(password_hash("password_admin", PASSWORD_BCRYPT))>',
      'email' => 'admin@test.com',
      '__calls' => [
        ['activate' => []],
        ['addRole' => ['@role_entity_user']],
        ['addRole' => ['@role_entity_admin']],
      ],
    ],
    'user_entity_normal' => [
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
