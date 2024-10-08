namespace SpriteKind {
    export const BoundingBox = SpriteKind.create()
    export const RedBlock = SpriteKind.create()
    export const YellowBlock = SpriteKind.create()
    export const BlueBlock = SpriteKind.create()
    export const GreenBlock = SpriteKind.create()
    export const PaddleSizePowerUP = SpriteKind.create()
    export const Display = SpriteKind.create()
    export const LaserBoltPowerUP = SpriteKind.create()
    export const BallSpeedPowerUp = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BallSpeedPowerUp, function (sprite, otherSprite) {
    DisplayPowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 f f 1 . 
        1 f 1 1 f 1 
        1 f 1 1 f 1 
        . 1 f f 1 . 
        . . 1 1 . . 
        `, SpriteKind.Display)
    DisplayPowerUP.setPosition(153, 6)
    CurrentPowerUP = 3
    sprites.destroy(otherSprite)
})
function createBoundBox () {
    mySprite = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.BoundingBox)
    mySprite.setPosition(90, 116)
    PowerUpBox = sprites.create(img`
        1 1 1 1 1 1 1 1 1 1 1 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 1 1 1 1 1 1 1 1 1 1 1 
        `, SpriteKind.Enemy)
    PowerUpBox.setPosition(153, 6)
}
sprites.onOverlap(SpriteKind.YellowBlock, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    BlocksOnScreen += -1
})
function SpawnBlocks (Difficulty: number, StartRed: number, StartYellow: number, StartBlue: number) {
    RedBlock = sprites.create(img`
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        `, SpriteKind.RedBlock)
    YellowBlock = sprites.create(img`
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        `, SpriteKind.YellowBlock)
    BlueBlock = sprites.create(img`
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        `, SpriteKind.BlueBlock)
    GreenBlock = sprites.create(img`
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        `, SpriteKind.GreenBlock)
    sprites.destroyAllSpritesOfKind(SpriteKind.RedBlock)
    sprites.destroyAllSpritesOfKind(SpriteKind.YellowBlock)
    sprites.destroyAllSpritesOfKind(SpriteKind.BlueBlock)
    sprites.destroyAllSpritesOfKind(SpriteKind.GreenBlock)
    RedPercent = StartRed - (Difficulty + 1)
    YellowPercent = StartYellow - Difficulty
    BluePercent = StartBlue - Difficulty
    BlocksOnScreen = 0
    BlockX = 5
    BlockY = 15
    gap = 1
    for (let index = 0; index <= 2; index++) {
        for (let index = 0; index <= 15; index++) {
            CurrentBlock = pickblock(RedPercent, YellowPercent, BluePercent)
            mySprite2 = sprites.create(CurrentBlock.image, CurrentBlock.kind())
            mySprite2.setPosition(BlockX, BlockY)
            BlockX += 10
            BlocksOnScreen += 1
        }
        BlockY += BlueBlock.height + gap
        BlockX = 5
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (CurrentPowerUP > 0) {
        if (CurrentPowerUP == 1) {
            paddle.scale = 3 - 0.5 * DifficultyModifier
            pause(5000)
            paddle.scale = 1
            CurrentPowerUP = 0
        } else if (CurrentPowerUP == 2) {
            projectile = sprites.createProjectileFromSprite(img`
                2 2 
                2 2 
                2 2 
                2 2 
                2 2 
                `, paddle, 0, -50)
            CurrentPowerUP = 0
        } else if (CurrentPowerUP == 3) {
            Ball.setVelocity(randint(-80, 80), randint(-80, 80))
            CurrentPowerUP = 0
        }
    }
})
function bounce (ball: Sprite) {
    ballXSpeed = Ball.vx * 1
    BallYSPeed = Ball.vy * -1
    Ball.setVelocity(ballXSpeed, BallYSPeed)
}
sprites.onOverlap(SpriteKind.BlueBlock, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    BlocksOnScreen += -1
})
function SpawnBall () {
    Ball = sprites.create(img`
        . 1 1 . 
        1 1 1 1 
        1 1 1 1 
        . 1 1 . 
        `, SpriteKind.Food)
    ballXSpeed = randint(30, 50)
    BallYSPeed = randint(80, 100)
    Ball.setPosition(65, 56)
    Ball.setVelocity(ballXSpeed, BallYSPeed)
    Ball.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.RedBlock, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    BlocksOnScreen += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.LaserBoltPowerUP, function (sprite, otherSprite) {
    DisplayPowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 2 2 1 . 
        1 1 2 2 1 1 
        1 1 2 2 1 1 
        . 1 2 2 1 . 
        . . 1 1 . . 
        `, SpriteKind.Display)
    DisplayPowerUP.setPosition(153, 6)
    CurrentPowerUP = 2
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.YellowBlock, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    sprites.destroy(sprite)
    mySprite2 = sprites.create(img`
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        `, SpriteKind.RedBlock)
    mySprite2.setPosition(sprite.x, sprite.y)
    if (randint(0, 100) <= 7) {
        SpawnPowerUp(otherSprite)
    }
})
function SpawnPaddle () {
    paddle = sprites.create(img`
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
        `, SpriteKind.Player)
    paddleSpeed = 150
    paddle.setStayInScreen(true)
    paddle.setPosition(77, 99)
    controller.moveSprite(paddle, paddleSpeed, 0)
}
function pickblock (Red: number, Yellow: number, Blue: number) {
    PickBlockVariable = randint(1, 101)
    if (PickBlockVariable <= Red) {
        return RedBlock
    } else if (PickBlockVariable > Red && PickBlockVariable <= Yellow) {
        return YellowBlock
    } else if (PickBlockVariable > Yellow && PickBlockVariable < Blue) {
        return BlueBlock
    } else if (PickBlockVariable >= Blue) {
        return GreenBlock
    }
    return RedBlock
}
sprites.onOverlap(SpriteKind.Food, SpriteKind.BoundingBox, function (sprite, otherSprite) {
    sprites.destroy(paddle)
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    SpawnPaddle()
    pause(250)
    SpawnBall()
})
sprites.onOverlap(SpriteKind.BlueBlock, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    sprites.destroy(sprite)
    mySprite2 = sprites.create(img`
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        `, SpriteKind.YellowBlock)
    mySprite2.setPosition(sprite.x, sprite.y)
    if (randint(0, 100) <= 7) {
        SpawnPowerUp(otherSprite)
    }
})
sprites.onOverlap(SpriteKind.GreenBlock, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    sprites.destroy(sprite)
    mySprite2 = sprites.create(img`
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        `, SpriteKind.BlueBlock)
    mySprite2.setPosition(sprite.x, sprite.y)
    if (randint(0, 100) <= 7) {
        SpawnPowerUp(otherSprite)
    }
})
sprites.onOverlap(SpriteKind.RedBlock, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    sprites.destroy(sprite)
    if (randint(0, 100) <= 7) {
        SpawnPowerUp(otherSprite)
    }
    BlocksOnScreen += -1
})
function SpawnPowerUp (ImpactBlock: Sprite) {
    PaddleSizePowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 1 1 1 . 
        1 9 9 9 9 1 
        1 9 9 9 9 1 
        . 1 1 1 1 . 
        . . 1 1 . . 
        `, SpriteKind.PaddleSizePowerUP)
    LaserBoltPowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 2 2 1 . 
        1 1 2 2 1 1 
        1 1 2 2 1 1 
        . 1 2 2 1 . 
        . . 1 1 . . 
        `, SpriteKind.LaserBoltPowerUP)
    BallSpeedPowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 f f 1 . 
        1 f 1 1 f 1 
        1 f 1 1 f 1 
        . 1 f f 1 . 
        . . 1 1 . . 
        `, SpriteKind.BallSpeedPowerUp)
    sprites.destroy(PaddleSizePowerUP)
    sprites.destroy(LaserBoltPowerUP)
    sprites.destroy(BallSpeedPowerUP)
    PowerUPChooser = randint(0, 31)
    if (PowerUPChooser < 11) {
        mySprite3 = sprites.create(PaddleSizePowerUP.image, PaddleSizePowerUP.kind())
        mySprite3.setPosition(ImpactBlock.x, ImpactBlock.y)
        mySprite3.setVelocity(0, 15)
    } else if (PowerUPChooser < 21) {
        mySprite3 = sprites.create(LaserBoltPowerUP.image, LaserBoltPowerUP.kind())
        mySprite3.setPosition(ImpactBlock.x, ImpactBlock.y)
        mySprite3.setVelocity(0, 15)
    } else if (PowerUPChooser < 31) {
        mySprite3 = sprites.create(BallSpeedPowerUP.image, BallSpeedPowerUP.kind())
        mySprite3.setPosition(ImpactBlock.x, ImpactBlock.y)
        mySprite3.setVelocity(0, 15)
    }
}
sprites.onOverlap(SpriteKind.GreenBlock, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    BlocksOnScreen += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    otherSprite.setPosition(otherSprite.x, sprite.top - 1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PaddleSizePowerUP, function (sprite, otherSprite) {
    DisplayPowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 1 1 1 . 
        1 9 9 9 9 1 
        1 9 9 9 9 1 
        . 1 1 1 1 . 
        . . 1 1 . . 
        `, SpriteKind.Display)
    DisplayPowerUP.setPosition(153, 6)
    CurrentPowerUP = 1
    sprites.destroy(otherSprite)
})
let mySprite3: Sprite = null
let PowerUPChooser = 0
let BallSpeedPowerUP: Sprite = null
let LaserBoltPowerUP: Sprite = null
let PaddleSizePowerUP: Sprite = null
let PickBlockVariable = 0
let paddleSpeed = 0
let BallYSPeed = 0
let ballXSpeed = 0
let Ball: Sprite = null
let projectile: Sprite = null
let paddle: Sprite = null
let mySprite2: Sprite = null
let CurrentBlock: Sprite = null
let gap = 0
let BlockY = 0
let BlockX = 0
let BluePercent = 0
let YellowPercent = 0
let RedPercent = 0
let GreenBlock: Sprite = null
let BlueBlock: Sprite = null
let YellowBlock: Sprite = null
let RedBlock: Sprite = null
let BlocksOnScreen = 0
let PowerUpBox: Sprite = null
let mySprite: Sprite = null
let DisplayPowerUP: Sprite = null
let CurrentPowerUP = 0
let DifficultyModifier = 0
DifficultyModifier = 0
let StartRed = 50
let StartYellow = 85
let StartBlue = 100
CurrentPowerUP = 0
info.setLife(50)
SpawnBlocks(DifficultyModifier, StartRed, StartYellow, StartBlue)
SpawnBall()
SpawnPaddle()
createBoundBox()
game.onUpdateInterval(100, function () {
    if (BlocksOnScreen <= 0) {
        sprites.destroy(Ball)
        sprites.destroy(paddle)
        DifficultyModifier += 1
        SpawnBlocks(DifficultyModifier, StartRed, StartYellow, StartBlue)
        pause(200)
        SpawnPaddle()
        SpawnBall()
    }
    if (info.life() <= 0) {
        game.setGameOverMessage(true, "You Lose!")
    } else if (DifficultyModifier == 10) {
        game.setGameOverMessage(true, "You Win!")
    }
})
