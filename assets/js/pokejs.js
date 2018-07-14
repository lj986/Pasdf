function initializeBattle(p, o){
	audio.play();
	$("li").fadeIn();	
	
	$("#player .name").text(p.name);
	$("#player .currentHP").text(p.hp)
	$("#player .maxHP").text(p.hp)
	$("#player img").attr("src", p.img)
	
	$("#opponent .name").text(o.name);
	$("#opponent .currentHP").text(o.hp)
	$("#opponent .maxHP").text(o.hp)
	$("#opponent img").attr("src", o.img)
	
	toggleContent();
	
	$("#msg").text("");
	$("#msg").text("What should " + $("#player .name").text() + " do?")
	defaultMenu();
}

function strToVar(moveStr){ return eval(moveStr.replace(/\s+/g, '')); }

function menu(command){
	//executes command based on button text
	click.play();
	switch (command){
		case "Fight":
			messageBox("What should " + plrPoke.name + " do?")
			$("#msg").clearQueue();
			fightMenu(plrPoke, oppPoke); break;
		case "Pokemon":
			messageBox("You have no Pokemon!"); break;
		case "Bag":
			messageBox("You have no items!"); break;
		case "Run":
			messageBox("You can't escape from this fight!"); break;
		default:
			//sets a variable move to the move object based on menu string
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
	$("#pick").fadeToggle(0);
	$("#battle").fadeToggle(0);
}

function messageBox(str){
	$("#msg").queue(function(){
		$("#container").one("click", function(){
			click.play();
			$("#msg").text(""); 
			$("#msg").text(str); 
			$("#msg").dequeue();
		})
	})
}

function moveFirst(p, o){return (p.spd >= o.spd)};

function round(p, o, m){
	toggleMenu();
	if ( moveFirst(p, o) ){
		playerMove(p, o, m);
		if(!gameOver){
			opponentMove(p, o);
		}
	} else {
		opponentMove(p, o);
		if(!gameOver){
			playerMove(p, o, m); 
		}
	}

	//starts a new round by resetting the menu
	if(!gameOver){
		$("#msg").queue(function(){
			$("#container").one("click", function(){
				$("#msg").text("What should " + $("#player .name").text() + " do?")
				toggleMenu();
				$("#msg").dequeue();
			})
		})
	}
}

function playerMove(p, o, m){
	$("#opponent img").removeClass("ouch")
	moveMessage(effectiveness(m, o), p, m)
	
	$("#msg").queue(function(){
		dealDamage("opponent", calcDamage(o, m, p))
		$("#msg").dequeue();
	})
		
}

function opponentMove(p, o){
	//randomly generate opponent's move
	moveNum = Math.round(Math.random() * 3) 
	var mov = eval(o.move[moveNum].replace(/\s+/g, ''));

	$("#player img").removeClass("ouch")
	moveMessage(effectiveness(mov, p), o, mov)
	
	$("#msg").queue(function(){
		dealDamage("player", calcDamage(p, mov, o))
		$("#msg").dequeue();
	})
}

function moveMessage(multiplier, user, move){
	if (multiplier <= 0.5){
		messageBox(user.name + " used " + move.name + "! It was not very effective...");
	} else if (multiplier >= 2){
		messageBox(user.name + " used " + move.name + "! It was super effective!");
	} else {
		messageBox(user.name + " used " + move.name + "!");
	}
}

function calcDamage(target, move, source){
	//damage calculation
	var total = 0;
	var sourceAtk = 0;
	var targetDef = 0;
	var rand = (Math.random() * 16 + 85)/100;

	if (move.physical){
		sourceAtk = source.atk;
		targetDef = target.def;
	} else {
		sourceAtk = source.satk;
		targetDef = target.sdef;
	}
	
	total = ((22 * move.power * (sourceAtk/targetDef))/50) * (rand * effectiveness(move, target));
	return total;
}

function dealDamage(target, dmg){
	setTimeout(function(){
		$("#"+target+" .currentHP").text(Math.round(Number($("#"+target+" .currentHP").text()) - dmg));
		//checks if game is over by comparing the target's health
		if($("#"+target+" .currentHP").text() < 0){
			endGame(target);
		}
		$("#"+target+" img").addClass("ouch");
		hit.play();
	},100)
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

function endGame(str){
	audio.pause();
	$("#msg").clearQueue();
	$("#container").off()
	
	if (str === "opponent"){
		$("#opponent .currentHP").text(0);
		messageBox("You won!!");
		victory.play();
	} else if (str === "player"){
		$("#player .currentHP").text(0);
		messageBox("You whited out!");
	}
	
	$("li").fadeOut();
	gameOver = true;

	messageBox("Click to play again");

	
	$("#msg").queue(function() {
		$("#container").one("click", function(){
			victory.pause();
			victory.currentTime = 0;
			audio.currentTime = 0;
			gameOver = false;
			toggleContent(); 
		});
	});
}

var plrPoke;
var oppPoke;
var gameOver = false;
$("#battle").fadeToggle(0);
var n = 0;
var pokeArray = [Blastoise, Charizard, Venusaur, Pikachu, Onix, Pidgeot];

//Display list of pokemon to choose from
for(var i = 0; i < pokeArray.length; i++){
	$("form").append(
		"<input type='radio' name='pokemon' id='"+pokeArray[i].name+"' value='"+pokeArray[i].name+"'/> <label for='"+pokeArray[i].name+"'> <img src='"+ pokeArray[i].img +"'/></label>"
	);
}
	
//sets player pokemon to pokemon user clicked and opponent's pokemon to a random one
$('input:radio[name="pokemon"]').change( function(){
	if ($(this).is(':checked')) {
		plrPoke = strToVar(this.value);
		oppPoke = pokeArray[Math.floor(Math.random() * pokeArray.length)];
		initializeBattle(plrPoke, oppPoke);
		$("#battle button").on("click", function(){menu($(this).text())});
		$(this).prop("checked", false);
	}
});

var audio = new Audio('assets/audio/battletheme.mp3');
audio.volume = 0.1;
var click = new Audio('assets/audio/click.mp3');
click.volume = 0.3;
var victory = new Audio('assets/audio/victory.mp3');
victory.volume = 0.1;
var hit = new Audio('assets/audio/hit.wav');
hit.volume = 0.3;