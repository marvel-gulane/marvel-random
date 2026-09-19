class Foods {

	static Hotdogs() {

		var monosodium = "True";
		var sugar = "True";
		var salt = "True";
		var flour = "True";
		var artificial = "True";
		var margarine = 2/4;

		const hotdog = [monosodium, sugar, salt, flour, artificial, margarine];
		//return hotdog;	

		let hotdog_process = [
			{Hotdog:'1. Prepare the stove and the cooking pan tray for cooking the hotdog.'},
			{Hotdog:'2. Add margarine 2/4 within the cooking pan tray.'},
			{Hotdog:'3. Put the hotdog on the cooking pan and wait for the hotdog to be golden brown.'},
		];

		console.table(hotdog_process,['Hotdog']);
	}

	static Butchis() {

		var sugar = "True";
		var flour = "True";
		var wheat = "True";
		var chocolates = "True";
		var mongos = "True";
		var coloring = "True";

		const butchi = [sugar, flour, wheat, chocolates, mongos, coloring];
		return butchi;

		let butchi_process = [
			'1. Prepare all the materials and ingredients',
			'2. Mix the flour wheat with chocolates and mongos in mixing bowl pot',
			'3. Fry the butchi using virgin coconut oil.',
			'4. Wait for butchi to be golden brown before transfering it on the baking tray.',
		];

		console.table(butchi_process);
		
	}

	static EggFrieds() {
		var margarine = "True";
		var salt = "True";
		var monosodium = "True";
		const eggfried = [margarine, salt, monosodium];
		return eggfried;
		let eggfried_process = [
			'1. Turn on the stove and put the frying cooking tool called pan',
			'2. Put 1/4 of margarine depend on your needs for frying the egg',
			'3. Cook the egg to be fried and wait for it to be golden brown and solid texture.',
			'4. Transfer the fried egg on the plate for the preparation of your morning geat great breakfast',
		];

		console.table(eggfried_process)
	}
}

Foods.Hotdogs();
