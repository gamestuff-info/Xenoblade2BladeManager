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
];
