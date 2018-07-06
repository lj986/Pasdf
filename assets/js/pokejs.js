function initializeBattle(p, o){
	audio.play();
	
	$("#player .name").text(p.name);
	$("#player .currentHP").text(p.hp)
	$("#player .maxHP").text(p.hp)
	$("#player img").attr("src", p.img)
	
	$("#opponent .name").text(o.name);
	$("#opponent .currentHP").text(o.hp)
	$("#opponent .maxHP").text(o.hp)
	$("#opponent img").attr("src", o.img)
	
	toggleContent();

	$("#msg").text("What will you do?");
	defaultMenu();
}

function strToVar(moveStr){ return eval(moveStr.replace(/\s+/g, '')); }

function menu(command){
	//executes command based on button text

	switch (command){
		case "Fight":
			messageBox("What should " + plrPoke.name + " do?")
			fightMenu(plrPoke, oppPoke); break;
		case "Pokemon":
			messageBox("You have no Pokemon!"); break;
		case "Bag":
			messageBox("You have no items!"); break;
		case "Run":
			messageBox("You can't escape from this fight!"); break;
		default:
			//sets a variable move to the pokemon move object
			var move = strToVar(command);
			round(plrPoke, oppPoke, move);	
	}
}

function defaultMenu(){
	// Replaces menu with commands
	var menu = ["Fight", "Bag", "Pokemon", "Run"];
	for (var i=1; i<5;i++){
		$("li:nth-of-type(" + i + ")").html("<button>" + menu[i-1] + "</button>");
	}
}

function fightMenu(plrPoke){
	// Replaces menu with pokemon moves
	for (var i=1; i<5;i++){
		$("li:nth-of-type(" + i + ")").html(
		"<button title='"+strToVar(plrPoke.move[i-1]).name+
		"\n Power: "+strToVar(plrPoke.move[i-1]).power+
		"\n Accuracy: "+strToVar(plrPoke.move[i-1]).accuracy+
		"\n Type: "+strToVar(plrPoke.move[i-1]).type.name+
		"'>" + plrPoke.move[i-1] + "</button>");
	}
	$("#battle button").on("click", function(){menu($(this).text())});
}

function toggleMenu(){
	//hides or shows the button menu
	defaultMenu();
	$("li").fadeToggle(0);
	$("#battle button").on("click", function(){menu($(this).text())});
}

function toggleContent(){
	$("#pick").fadeToggle();
	$("#battle").fadeToggle();
}

function messageBox(str){
	$("#msg").queue(function(){
		$("#container").one("click", function(){
			$("#msg").text(str); 
			$("#msg").dequeue();
			checkQueue();
		});
	})
}

function checkQueue(){
	//checks if the queue is in progress and creates a blinking marker for the user if it is
	var queueEmpty = $("#msg").queue()[0];
	if(queueEmpty === "inprogress"){
		$("#blinker").addClass("blinking")
	} else {
		$("#blinker").removeClass("blinking")
	}
	click.play();
}

function moveFirst(p, o){return (p.spd >= o.spd)};

function round(p, o, m){
	toggleMenu();
	if (moveFirst(p,o)){
		playerMove(p, o, m);
		if (!gameOver){
			opponentMove(p, o);
		}
	} else {
		opponentMove(p, o);
		if(!gameOver){
			playerMove(p, o, m);
		}
	}
	
	if(!gameOver){
		$("#msg").queue(function(){
			$("#container").one("click", function(){
				$("#msg").text("What will you do?");
				toggleMenu();
				$("#msg").dequeue();
				checkQueue();
			});
		})
	}
}

function playerMove(p, o, m){
	var multiplier = effectiveness(m, o);
	var dmg = calcDamage(o, m, p);
	
	if (multiplier <= 0.5){
		messageBox(p.name + " used " + m.name + "! It was not very effective...");
	} else if (multiplier >= 2){
		messageBox(p.name + " used " + m.name + "! It was super effective!");
	} else {
		messageBox(p.name + " used " + m.name + "!");
	}

	$("#opponent img").removeClass("ouch")
	
	$("#msg").queue(function(){
		setTimeout(function(){
			$("#opponent .currentHP").text(Math.floor(Number($("#opponent .currentHP").text()) - dmg))
			$("#opponent img").addClass("ouch")
			$("#msg").dequeue();
		},1500) 
	});
	
	$("#msg").queue(function(){
		setTimeout(function(){
			if ($("#opponent .currentHP").text() < 1){
				endGame("opponent");
				audio.pause()
				victory.play()
			}
			$("#msg").dequeue();
		},0) 
	});
}

function opponentMove(p, o){
	moveNum = Math.floor(Math.random() * 3) 
	m = eval(o.move[moveNum].replace(/\s+/g, ''))
	var multiplier = effectiveness(m, p);
	var dmg = calcDamage(p, m, o)
	
	if (multiplier <= 0.5){
		messageBox(o.name + " used " + m.name + "! It was not very effective...");
	} else if (multiplier >= 2){
		messageBox(o.name + " used " + m.name + "! It was super effective!");
	} else {
		messageBox(o.name + " used " + m.name + "!");
	}
	
	$("#player img").removeClass("ouch")

	$("#msg").queue(function(){
		setTimeout(function(){
			$("#player .currentHP").text(Math.floor(Number($("#player .currentHP").text()) - dmg))
			$("#player img").addClass("ouch")
			$("#msg").dequeue();
		},500) 
	});
	
	$("#msg").queue(function(){
		setTimeout(function(){
			if($("#player .currentHP").text() < 1){
				endGame("player");
				audio.pause()
			}
			$("#msg").dequeue();
		},0) 
	});
}

function endGame(str){
	$("#msg").clearQueue();
	
	if (str === "opponent"){
		$("#opponent .currentHP").text(0);
		messageBox("You won!!");
	} else if (str === "player"){
		$("#player .currentHP").text(0);
		messageBox("You whited out!");
	}
	
	$("ul").fadeToggle();
	gameOver = true;
}

function calcDamage(target, move, source){
	//damage calculation
	var total = 0;
	var sourceAtk = 0;
	var targetDef = 0;
	var type = effectiveness(move, target);
	var rand = (Math.random() * (100 - 85 + 1) + 85)/100

	if (move.physical){
		sourceAtk = source.atk;
		targetDef = target.def;
	} else {
		sourceAtk = source.satk;
		targetDef = target.sdef;
	}
	
	total = ((22 * move.power * (sourceAtk/targetDef))/50) * (rand * type);
	return total;
}

function effectiveness(move, target){
	//returns damage multiplier based on move and pokemon type
	var multiplier = 1;
	
	for (var i=0; i<target.type.length;i++){
		for (var n=0; n<move.type.ineffective.length;n++){
			if (move.type.ineffective[n] === target.type[i].name){
				multiplier *= 0.5;
			}
		}
		for (var n=0; n<move.type.effective.length;n++){
			if (move.type.effective[n] === target.type[i].name){
				multiplier *= 2;
			}
		}
	}
	return multiplier;
}

var plrPoke;
var oppPoke;
var gameOver = false;
$("#battle").fadeToggle(0);
	
var audio = new Audio('assets/audio/battletheme.mp3');
audio.volume = 0.1;
var click = new Audio('assets/audio/click.mp3');
click.volume = 0.4;
var victory = new Audio('assets/audio/victory.mp3');
victory.volume = 0.1;
	
//sets player pokemon to pokemon user clicked and opponent's pokemon to a random one
$('input:radio[name="pokemon"]').change( function(){
	if ($(this).is(':checked')) {
		plrPoke = strToVar(this.value)
		var pokeArray = [Blastoise, Charizard, Venusaur, Pikachu, Onix, Pidgeot];
		oppPoke = pokeArray[Math.floor(Math.random() * pokeArray.length)];
		initializeBattle(plrPoke, oppPoke);
		$("#battle button").on("click", function(){menu($(this).text())});
		$(this).prop("checked", false)

	}
});