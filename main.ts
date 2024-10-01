namespace SpriteKind {
    export const BoundingBox = SpriteKind.create()
}
/**
 * Look at SpawnRowOfBlocks function in Araknoid clone
 */
function createBoundBox () {
    mySprite = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.BoundingBox)
    mySprite.setPosition(90, 116)
}
function SpawnBlocks (Difficulty: number, BlockArray: any[]) {
    CurrentBlock = 0
    BlockX = 8
    BlockY = 10
    gap = 1
    for (let index = 0; index <= 2; index++) {
        for (let index = 0; index <= 9; index++) {
            let list: Sprite[] = []
            mySprite2 = sprites.create(list[CurrentBlock].image, list[CurrentBlock].kind())
            BlockX += 10
        }
        BlockY += BlueBlock.height + gap
        BlockX = 8
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
    PickBlockVariable = randint(1, 100)
    if (PickBlockVariable <= Red) {
        SetBlock = RedBlock
    } else if (PickBlockVariable > Red && PickBlockVariable <= Yellow) {
        SetBlock = YellowBlock
    } else if (PickBlockVariable > Yellow) {
        SetBlock = BlueBlock
    } else if (PickBlockVariable == Blue) {
        SetBlock = GreenBlock
    }
    return SetBlock
}
sprites.onOverlap(SpriteKind.Food, SpriteKind.BoundingBox, function (sprite, otherSprite) {
    sprites.destroy(paddle)
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    SpawnPaddle()
    pause(500)
    SpawnBall()
})
function FillBlockArray (Red: number, Yellow: number, Blue: number) {
    RedBlock = sprites.create(img`
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 
        `, SpriteKind.Player)
    YellowBlock = sprites.create(img`
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 
        `, SpriteKind.Player)
    BlueBlock = sprites.create(img`
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 
        `, SpriteKind.Player)
    GreenBlock = sprites.create(img`
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        `, SpriteKind.Player)
    Row1 = [[
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue)
    ], [
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue)
    ], [
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue),
    pickblock(Red, Yellow, Blue)
    ]]
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    bounce(otherSprite)
    otherSprite.setPosition(otherSprite.x, sprite.top - 1)
})
let Row1: Sprite[][] = []
let GreenBlock: Sprite = null
let YellowBlock: Sprite = null
let RedBlock: Sprite = null
let SetBlock: Sprite = null
let PickBlockVariable = 0
let paddleSpeed = 0
let paddle: Sprite = null
let BallYSPeed = 0
let ballXSpeed = 0
let Ball: Sprite = null
let BlueBlock: Sprite = null
let mySprite2: Sprite = null
let gap = 0
let BlockY = 0
let BlockX = 0
let CurrentBlock = 0
let mySprite: Sprite = null
info.setLife(50)
SpawnBall()
SpawnPaddle()
createBoundBox()
let DifficultyModifier = 1
