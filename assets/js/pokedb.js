/* Pokemon
Venasaur Grass
Pikachu Electric
Onix Rock
Pidgeot Flying
*/


//////////////////////////////////////// TYPES ////////////////////////////////////////

var fire = {
	name: "fire",
	effective: ["grass"],
	ineffective: ["rock", "fire", "water"]
}

var water = {
	name: "water",
	effective: ["fire", "rock"],
	ineffective: ["water", "grass"]
}

var grass = {
	name: "grass",
	effective: ["water", "rock"],
	ineffective: ["grass", "fire", "flying"]
}

var electric = {
	name: "electric",
	effective: ["water", "flying"],
	ineffective: ["grass", "electric"]
}

var flying = {
	name: "flying",
	effective: ["grass"],
	ineffective: ["rock", "electric"]
}

var rock = {
	name: "rock",
	effective: ["flying", "fire"],
	ineffective: []
}

var normal= {
	name: "normal",
	effective: [],
	ineffective: ["rock"]
}

//////////////////////////////////////// POKEMANS ////////////////////////////////////////

var Blastoise = {
	name: "Blastoise",
	hp: 154,
	atk: 113,
	def: 120,
	satk: 94,
	sdef: 125,
	spd: 98,
	type: [water], 
	move: ["Water Gun","Tackle", "Hydro Pump", "Surf"],
	img: "https://cdn.bulbagarden.net/upload/thumb/0/02/009Blastoise.png/600px-009Blastoise.png"
}

var Charizard = {
	name: "Charizard",
	hp: 153,
	atk: 114,
	def: 98,
	satk: 116,
	sdef: 105,
	spd: 120,
	type: [fire, flying],
	move: ["Flamethrower", "Fire Blast", "Scratch", "Wing Attack"],
	img: "https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/600px-006Charizard.png"
}

var Venusaur = {
	name: "Venusaur",
	hp: 155,
	atk: 112,
	def: 103,
	satk: 108,
	sdef: 120,
	spd: 100,
	type: [grass],
	move: ["Razor Leaf", "Vine Whip", "Tackle", "Take Down"],
	img: "https://cdn.bulbagarden.net/upload/thumb/a/ae/003Venusaur.png/600px-003Venusaur.png"
}

var Pikachu = {
	name: "Pikachu",
	hp: 110,
	atk: 82,
	def: 60,
	satk: 63,
	sdef: 70,
	spd: 110,
	type: [electric],
	move: ["Thunder Bolt", "Thunder", "Slam", "Spark"],
	img: "https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/600px-025Pikachu.png"
}

var Onix = {
	name: "Onix",
	hp: 110,
	atk: 71,
	def: 180,
	satk: 45,
	sdef: 65,
	spd: 90,
	type: [rock],
	move: ["Rock Throw", "Tackle", "Slam", "Stone Edge"],
	img: "https://cdn.bulbagarden.net/upload/thumb/9/9a/095Onix.png/600px-095Onix.png"
}

var Pidgeot = {
	name: "Pidgeot",
	hp: 158,
	atk: 110,
	def: 95,
	satk: 81,
	sdef: 90,
	spd: 121,
	type: [flying],
	move: ["Scratch", "Wing Attack", "Gust", "Air Slash"],
	img: "https://cdn.bulbagarden.net/upload/thumb/5/57/018Pidgeot.png/600px-018Pidgeot.png"
}

//////////////////////////////////////// MOVES ////////////////////////////////////////

var WaterGun = {
	name: "Water Gun",
	power: 40,
	type: water,
	accuracy: 100,
	physical: false
}

var Tackle = {
	name: "Tackle",
	power: 40,
	type: normal,
	accuracy: 100,
	physical: true
}

var HydroPump = {
	name: "Hydro Pump",
	power: 110,
	type: water,
	accuracy: 80,
	physical: false
}

var Surf = {
	name: "Surf",
	power: 90,
	type: water,
	accuracy: 100,
	physical: false
}

var Flamethrower = {
	name: "Flamethrower",
	power: 90,
	type: fire,
	accuracy: 100,
	physical: false
}

var FireBlast = {
	name: "Fire Blast",
	power: 110,
	type: fire,
	accuracy: 85,
	physical: false
}

var Scratch = {
	name: "Scratch",
	power: 40,
	type: normal,
	accuracy: 100,
	physical: true
}

var WingAttack = {
	name: "Wing Attack",
	power: 60,
	type: flying,
	accuracy: 100,
	physical: true
}

var RazorLeaf = {
	name: "Razor Leaf",
	power: 55,
	type: grass,
	accuracy: 95,
	physical: true
}

var VineWhip = {
	name: "Vine Whip",
	power: 45,
	type: grass,
	accuracy: 100,
	physical: true
}

var TakeDown = {
	name: "Take Down",
	power: 90,
	type: normal,
	accuracy: 85,
	physical: true,
	recoil: 25
}

var ThunderBolt = {
	name: "Thunder Bolt",
	power: 90,
	type: electric,
	accuracy: 100,
	physical: false,
}

var Thunder = {
	name: "Thunder",
	power: 110,
	type: electric,
	accuracy: 70,
	physical: false,
}

var Slam = {
	name: "Slam",
	power: 80,
	type: normal,
	accuracy: 75,
	physical: true,
}

var Spark = {
	name: "Spark",
	power: 65,
	type: electric,
	accuracy: 100,
	physical: true,
}

var RockThrow = {
	name: "Rock Throw",
	power: 50,
	type: rock,
	accuracy: 90,
	physical: true,
}

var StoneEdge = {
	name: "Stone Edge",
	power: 100,
	type: rock,
	accuracy: 80,
	physical: true,
}

var Gust = {
	name: "Gust",
	power: 40,
	type: flying,
	accuracy: 100,
	physical: false,
}

var AirSlash = {
	name: "Air Slash",
	power: 75,
	type: flying,
	accuracy: 95,
	physical: false,
}


