<?php

return [
  \App\Entity\Blade::class => [
    'blade_entity_owned' => [
      'user' => '@user_entity_normal',
      'name (unique)' => 'Owned',
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
      '__calls' => [
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 3)>',
            '<numberBetween(3, 5)>',
          ],
        ],
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 3)>',
            '<numberBetween(3, 5)>',
          ],
        ],
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 3)>',
            '<numberBetween(3, 5)>',
          ],
        ],
      ],
    ],
    'blade_entity_unowned' => [
      'user' => '@user_entity_admin',
      'name (unique)' => 'Unowned',
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
      '__calls' => [
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 3)>',
            '<numberBetween(3, 5)>',
          ],
        ],
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 3)>',
            '<numberBetween(3, 5)>',
          ],
        ],
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 3)>',
            '<numberBetween(3, 5)>',
          ],
        ],
      ],
    ],
  ],
];
