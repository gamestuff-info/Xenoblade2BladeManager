<?php

return [
  \App\Entity\MercMission::class => [
    'merc_mission_entity_{1..50}' => [
      'name' => '<words(3, true)>',
      'nation' => '@nation_entity_*',
      'prerequisites' => '<numberBetween(0, 1)>x @merc_mission_prerequisite_entity_*',
      'duration' => '<dateTimeBetween("@0", "@5400")>',
      'repeatable' => '<boolean()>',
    ],
  ],
];
