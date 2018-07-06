/*
Pokemon:
Name  HP  Attack  Defense  Sp.Attack  Sp.Defense  Speed  Type1  Type2  Dodge Rate  fainted? move[0,1,2,3]

Attack Move:
Power  Accuracy  Normal vs Special Attack

Buff/Debuff Move
Target(Player vs Opponent) Stat Affected  Buff Strength  Duration  Accuracy

Damage Calculations
Randomness  Effective  Non-Effective  Immune  Crit  Miss

Battle
	Click event on container to progress messages
		Commands are invisible when messages are there
	Only usable (for now) command is fight
		Replace text in command buttons with moves when fight is clicked
		After battle messages replace text in buttons with command buttons
	Speed determines who moves first
	Opponent uses preset list of moves
		Uses random(1-4) move
	Turn counter for buff/debuff moves
*/

//doCommand(buttonText, playerPokemon)
	/*
		if button text = fight
			moveReplace(buttons, pokemonMoves[])
		if button text = items/pokemon/escape
			can't do this text
		if button text = else
			player
				calcDamage(move, usingPokemon, targetPokemon)
			opponent
				calcDamage(move, usingPokemon, targetPokemon)
	*/

//moveReplace(buttons) replace button text with move text when 'fight' is clicked
	/*
		innerhtml button[n] with pokemonName.move[n]
	*/

//messageBox(message text) put message in message box
	/*	
		if move
			pokemonName used pokemonMove[n] (it was [effective, not effective])
		if opponent move
			opponentName used opponentMove[n] (it was [effective, not effective])
		if turn reset
			what will pokemonName do?	
			do not require click on container
		if win
			you won!
			thanks for playing
		if lose
			you have whited out!
			thanks for playing
	*/

//calcFirst(playerPokemon, opponentPokemon)
	/*
		playerPokemon.speed
		opponentPokemon.speed
		
		return true if player first otherwise false
	*/
	
//calcDamage(move, usingPokemon, targetPokemon) calculate damage to a pokemon based on move name
	/*
		move.accuracy
			targetPokemon.dodgerate
			crit
		move.power
			usingPokemon.atk/sp.atk
			targetPokemon.def/sp.def
		move.type
			targetPokemon.type
				effective not effective immune
			
		return damage as integer
	*/

//doDamage(calcDamage(move,pokemon.name), target) do damage to a pokemon
	/*
		subtract damage from target.hp
		faint or not? set alive true or false
	*/

/*loop battle
	player clicks fight
		doCommand(fight, playerPokemon)
	player clicks move
		doCommand(moveName, playerPokemon)
	buttons disappear
		opacity = 0
	
	speed calculation for first/second
		if(calcFirst(playerPokemon, opponentPokemon)
	
	player executes move
		damgage/debuff calculation
			calcDamage(move, usingPokemon, targetPokemon)
			doDamage(calcDamage(move, usingPokemon, targetPokemon), opponentPokemon)
		opponent health bar animation
			bar.style.css slide right
		place attack message in message box
			messageBox("player has used" moveName)
		check alive
	
	oppenent executes move
		damgage/debuff calculation
			calcDamage(move, usingPokemon, targetPokemon)
			doDamage(calcDamage(move, usingPokemon, targetPokemon), playerPokemon)
		player health bar animation
			bar.style.css slide right
		place attack message in message box
			messageBox("opponent has used" moveName)
		check alive
	
	increment turn
		turn++
	reset message
		messageBox("what will" playerPokemon "do")
	reset button menu
		opacity = 100
*/

/* Types
-normal
-fighting
		flying
-poison
-ground
		rock
-bug
-ghost
-steel
		fire
		water
		grass
		electric
-psychic
-ice
-dragon
*/

/* function scrollText(message, index, interval){
	//displays text character by character over an interval
	/* if (index < message.length) {
		$("#msg").append(message[index++]);
		timer = setTimeout(function () { scrollText(message, index, interval); }, interval);
	} 
} */