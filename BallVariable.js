// 跟球有關
const BombStatus = Object.freeze({
	"未碰撞": 0,
	"碰撞中": 1,
	"碰撞完": 2,
	"爆炸中": 3
})

// 球的模式
const NoteType = Object.freeze({ "normal": 1, "trap": 2 });

var ballSize = 12, bias = 2;
var gap = ballSize + bias;
var distance = 120;

// BALL JSON AND GROUP JS
var hasJsonFile = false;
var jsonData;