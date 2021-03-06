<?php

return [
  \App\Entity\MercMission::class => [
    'merc_mission_entity_1' => [
      'name' => '<words(3, true)>',
      'nation' => '@nation_entity_*',
      'prerequisites' => '<numberBetween(0, 1)>x @merc_mission_prerequisite_entity_*',
      'duration' => '<dateTimeBetween("@0", "@5400")>',
      'repeatable' => '<(true)>',
      'mercPoints' => '<numberBetween(50, 150)>',
      'experience' => '<numberBetween(0, 1000)>',
      'gold' => '<numberBetween(0, 2000)>',
    ],
  ],
  \App\Entity\Blade::class => [
    'blade (template)' => [
      'name (unique)' => '<word()>',
      'isMerc' => 'true',
      'mercTeamName' => '10%? <words(2, true)>',
      'element' => '@element_entity_*',
      'gender' => '@gender_entity_*',
      'battleRole' => '@battle_role_entity_*',
      'weaponClass' => '@weapon_class_entity_*',
      'rarity' => '<numberBetween(1, 5)>',
      'affinity' => '<numberBetween(5, 20)>',
      'affinityTotal' => '<numberBetween(21, 45)>',
      'trust' => '@trust_rank_entity_1',
      'strength' => '<numberBetween(10,35)>',
      'driver' => '@driver_entity_*',
      'canBeReleased' => '<boolean()>',
      '__calls' => [
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 2)>',
            '<numberBetween(3, 5)>',
          ],
        ],
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 2)>',
            '<numberBetween(3, 5)>',
          ],
        ],
        [
          'setAffinityNode' => [
            '@affinity_node_entity_*',
            '<numberBetween(0, 2)>',
            '<numberBetween(3, 5)>',
          ],
        ],
      ],
    ],
    'blade_owned_entity_{1..6} (extends blade)' => [
      'user' => '@user_entity_normal',
    ],
    'blade_unowned_entity_{1..6} (extends blade)' => [
      'user' => '@user_entity_admin',
    ],
  ],
];
