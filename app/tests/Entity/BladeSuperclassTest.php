<?php

namespace App\Tests\Entity;

use App\Entity\AffinityNode;
use App\Entity\BladeAffinityNode;
use App\Entity\BladeSuperclass;
use PHPUnit\Framework\TestCase;

class BladeSuperclassTest extends TestCase
{

    public function testSetAffinityNode()
    {
        $bladeSuperclass = self::getMockForAbstractClass(BladeSuperclass::class);

        $affinityNode = (new AffinityNode())->setId(1)->setName('Test Affinity Node');
        $bladeSuperclass->setAffinityNode($affinityNode, 1, 3);
        /** @var BladeAffinityNode $bladeAffinityNode */
        $bladeAffinityNode = $bladeSuperclass->getAffinityNodes()->first();

        // Test the new BladeAffinityNode was added.
        self::assertSame($affinityNode, $bladeAffinityNode->getAffinityNode());
        self::assertEquals(1, $bladeAffinityNode->getLevel());
        self::assertEquals(3, $bladeAffinityNode->getMaxLevel());

        // Try changing the level and check that the existing BladeAffinityNode
        // was changed.
        $bladeSuperclass->setAffinityNode($affinityNode, 2, 3);
        /** @var BladeAffinityNode $newBladeAffinityNode */
        $newBladeAffinityNode = $bladeSuperclass->getAffinityNodes()->first();
        self::assertSame($bladeAffinityNode, $newBladeAffinityNode);
        self::assertSame($affinityNode, $newBladeAffinityNode->getAffinityNode());
        self::assertEquals(2, $newBladeAffinityNode->getLevel());
        self::assertEquals(3, $newBladeAffinityNode->getMaxLevel());
    }
}
