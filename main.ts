namespace SpriteKind {
    export const BoundingBox = SpriteKind.create()
    export const RedBlock = SpriteKind.create()
    export const YellowBlock = SpriteKind.create()
    export const BlueBlock = SpriteKind.create()
    export const GreenBlock = SpriteKind.create()
}
function createBoundBox () {
    mySprite = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.BoundingBox)
    mySprite.setPosition(90, 116)
}
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
    for (let index = 0; index <= 0; index++) {
        for (let index = 0; index <= 0; index++) {
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
function bounce (ball: Sprite) {
    if (Ball.vx < 0) {
        ballXSpeed = Ball.vx * 1
    } else if (Ball.vx > 0) {
        ballXSpeed = Ball.vx * 1
    }
    BallYSPeed = BallYSPeed * -1
    Ball.setVelocity(ballXSpeed, BallYSPeed)
}
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
sprites.onOverlap(SpriteKind.YellowBlock, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    pause(100)
    mySprite2 = sprites.create(img`
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        `, SpriteKind.RedBlock)
    mySprite2.setPosition(sprite.x, sprite.y)
})
function SpawnPaddle () {
    paddle = sprites.create(img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
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
sprites.onOverlap(SpriteKind.Food, SpriteKind.RedBlock, function (sprite, otherSprite) {
    bounce(sprite)
    sprites.destroy(otherSprite)
    BlocksOnScreen += -1
})
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
    pause(100)
    mySprite2 = sprites.create(img`
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        `, SpriteKind.YellowBlock)
    mySprite2.setPosition(sprite.x, sprite.y)
})
sprites.onOverlap(SpriteKind.GreenBlock, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    pause(100)
    mySprite2 = sprites.create(img`
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        `, SpriteKind.BlueBlock)
    mySprite2.setPosition(sprite.x, sprite.y)
})
function SpawnPowerUp (ImpactBlock: Sprite) {
    PaddleSizePowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 1 1 1 . 
        1 9 9 9 9 1 
        1 9 9 9 9 1 
        . 1 1 1 1 . 
        . . 1 1 . . 
        `, SpriteKind.Player)
    LaserBoltPowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 2 2 1 . 
        1 1 2 2 1 1 
        1 1 2 2 1 1 
        . 1 2 2 1 . 
        . . 1 1 . . 
        `, SpriteKind.Player)
    BallSpeedPowerUP = sprites.create(img`
        . . 1 1 . . 
        . 1 f f 1 . 
        1 f 1 1 f 1 
        1 f 1 1 f 1 
        . 1 f f 1 . 
        . . 1 1 . . 
        `, SpriteKind.Player)
    PowerUPChooser = randint(0, 31)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    otherSprite.setPosition(otherSprite.x, sprite.top - 1)
})
let PowerUPChooser = 0
let BallSpeedPowerUP: Sprite = null
let LaserBoltPowerUP: Sprite = null
let PaddleSizePowerUP: Sprite = null
let PickBlockVariable = 0
let paddleSpeed = 0
let paddle: Sprite = null
let BallYSPeed = 0
let ballXSpeed = 0
let Ball: Sprite = null
let mySprite2: Sprite = null
let CurrentBlock: Sprite = null
let gap = 0
let BlockY = 0
let BlockX = 0
let BlocksOnScreen = 0
let BluePercent = 0
let YellowPercent = 0
let RedPercent = 0
let GreenBlock: Sprite = null
let BlueBlock: Sprite = null
let YellowBlock: Sprite = null
let RedBlock: Sprite = null
let mySprite: Sprite = null
let DifficultyModifier = 0
let StartRed = 50
let StartYellow = 85
let StartBlue = 100
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
