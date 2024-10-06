namespace SpriteKind {
    export const BoundingBox = SpriteKind.create()
    export const RedBlock = SpriteKind.create()
    export const YellowBlock = SpriteKind.create()
    export const BlueBlock = SpriteKind.create()
    export const GreenBlock = SpriteKind.create()
}
/**
 * Look at SpawnRowOfBlocks function in Araknoid clone
 */
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
function createBoundBox () {
    mySprite = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.BoundingBox)
    mySprite.setPosition(90, 116)
}
function SpawnBlocks (Difficulty: number) {
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
    Red = 0
    Yellow = 0
    Blue = 0
    BlocksOnScreen = 0
    BlockX = 10
    BlockY = 15
    gap = 1
    for (let index = 0; index <= 2; index++) {
        for (let index = 0; index <= 14; index++) {
            CurrentBlock = pickblock(75, 85, 99)
            mySprite2 = sprites.create(CurrentBlock.image, CurrentBlock.kind())
            mySprite2.setPosition(BlockX, BlockY)
            BlockX += 10
            BlocksOnScreen += 1
        }
        BlockY += BlueBlock.height + gap
        BlockX = 10
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
    ballXSpeed = 50
    BallYSPeed = 150
    Ball.setPosition(65, 56)
    Ball.setVelocity(ballXSpeed, BallYSPeed)
    Ball.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.RedBlock, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    pause(100)
    sprites.destroy(sprite)
    BlocksOnScreen += -1
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
    PickBlockVariable = randint(0, 101)
    if (PickBlockVariable <= Red) {
        return RedBlock
    } else if (PickBlockVariable > Red && PickBlockVariable <= Yellow) {
        return YellowBlock
    } else if (PickBlockVariable > Yellow) {
        return BlueBlock
    } else if (PickBlockVariable == Blue) {
        return GreenBlock
    }
    return RedBlock
}
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
sprites.onOverlap(SpriteKind.Food, SpriteKind.BoundingBox, function (sprite, otherSprite) {
    sprites.destroy(paddle)
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    SpawnPaddle()
    pause(500)
    SpawnBall()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    otherSprite.setPosition(otherSprite.x, sprite.top - 1)
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
let PickBlockVariable = 0
let paddleSpeed = 0
let paddle: Sprite = null
let BallYSPeed = 0
let ballXSpeed = 0
let Ball: Sprite = null
let CurrentBlock: Sprite = null
let gap = 0
let BlockY = 0
let BlockX = 0
let BlocksOnScreen = 0
let Blue = 0
let Yellow = 0
let Red = 0
let GreenBlock: Sprite = null
let BlueBlock: Sprite = null
let YellowBlock: Sprite = null
let RedBlock: Sprite = null
let mySprite: Sprite = null
let mySprite2: Sprite = null
info.setLife(50)
SpawnBlocks(1)
SpawnBall()
SpawnPaddle()
createBoundBox()
let DifficultyModifier = 1
