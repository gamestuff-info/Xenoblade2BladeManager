<?php

namespace App\Tests\Entity;

use App\Entity\AffinityNode;
use App\Entity\BattleRole;
use App\Entity\BladeTemplate;
use App\Entity\Element;
use App\Entity\Gender;
use App\Entity\WeaponClass;
use PHPUnit\Framework\TestCase;

class BladeTemplateTest extends TestCase
{

    public function testToBlade()
    {
        $data = [
          'name' => 'Test Blade',
          'affinityTotal' => 40,
          'rarity' => 5,
          'weaponClass' => new WeaponClass(),
          'battleRole' => new BattleRole(),
          'gender' => new Gender(),
          'element' => new Element(),
          'mercTeamName' => 'Test Team Name',
          'isMerc' => true,
          'canBeReleased' => true,
          'affinityNodes' => [],
        ];

        // Generate some affinity nodes
        $data['affinityNodes'][] = [
          'affinityNode' => (new AffinityNode())->setId(1)->setName('Affinity Node 1'),
          'level' => 0,
          'maxLevel' => 1,
        ];
        $data['affinityNodes'][] = [
          'affinityNode' => (new AffinityNode())->setId(2)->setName('Affinity Node 2'),
          'level' => 1,
          'maxLevel' => 2,
        ];
        $data['affinityNodes'][] = [
          'affinityNode' => (new AffinityNode())->setId(3)->setName('Affinity Node 3'),
          'level' => 2,
          'maxLevel' => 3,
        ];

        $template = new BladeTemplate();
        $template->setName($data['name'])
          ->setAffinityTotal($data['affinityTotal'])
          ->setRarity($data['rarity'])
          ->setWeaponClass($data['weaponClass'])
          ->setBattleRole($data['battleRole'])
          ->setGender($data['gender'])
          ->setElement($data['element'])
          ->setMercTeamName($data['mercTeamName'])
          ->setIsMerc($data['isMerc'])
          ->setCanBeReleased($data['canBeReleased']);
        foreach ($data['affinityNodes'] as $affinityNodeInfo) {
            $template->setAffinityNode($affinityNodeInfo['affinityNode'], $affinityNodeInfo['level'], $affinityNodeInfo['maxLevel']);
        }

        $blade = $template->toBlade();

        self::assertEquals($data['name'], $blade->getName());
        self::assertEquals($data['affinityTotal'], $blade->getAffinityTotal());
        self::assertEquals($data['rarity'], $blade->getRarity());
        self::assertSame($data['weaponClass'], $blade->getWeaponClass());
        self::assertSame($data['battleRole'], $blade->getBattleRole());
        self::assertSame($data['gender'], $blade->getGender());
        self::assertSame($data['element'], $blade->getElement());
        self::assertEquals($data['mercTeamName'], $blade->getMercTeamName());
        self::assertEquals($data['isMerc'], $blade->isMerc());
        self::assertEquals($data['canBeReleased'], $blade->canBeReleased());
        foreach ($blade->getAffinityNodes() as $affinityNode) {
            $affinityNodeInfo = [
              'affinityNode' => $affinityNode->getAffinityNode(),
              'level' => $affinityNode->getLevel(),
              'maxLevel' => $affinityNode->getMaxLevel(),
            ];
            self::assertContains($affinityNodeInfo, $data['affinityNodes']);
        }
    }
}
