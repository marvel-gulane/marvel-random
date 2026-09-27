class Foods {
	
	static LechonPaksiws() {
			var monosodium = "True";
			var salts = "True";
			var sugars = "True";
			var spicesIndia = "True";
			var lemonGrass = "True";
			const paksow  = [{Ingredients:'monosodium'}, {Ingredients:'salts'}, {Ingredients:'sugars'}, {Ingredients:'spicesIndia'}, {Ingredients:'lemonGrass'}];
			console.table(paksow, ['Ingredients']);
	}
	
	static Hotdogs() {
		var monosodium = "True";
		var sugar = "True";
		var salt = "True";
		var flour = "True";
		var artificial = "True";
		var margarine = 2 / 4;
		const hotdog =[{Hotdog:'monosodium'}, {Hotdog:'sugar'}, {Hotdog:'salt'}, {Hotdog:'flour'}, {Hotdog:'artificial'}, {Hotdog:'margarine'}];
		console.table(hotdog,['Hotdog']);
	}
	
	static Butchis() {
		var sugar = "True";
		var flour = "True";
		var wheat = "True";
		var chocolates = "True";
		var mongos = "True";
		var coloring = "True";
		const butchi =[{Butchi:'sugar'}, {Butchi:'flour'}, {Butchi:'wheat'}, {Butchi:'chocolates'}, {Butchi:'mongos'}, {Butchi:'coloring'}];
		console.table(butchi,['Butchi']);
	}
	
	static EggFrieds() {
		var margarine = "True";
		var salt = "True";
		var monosodium = "True";
		const eggfried =[{Egg:'margarine'}, {Egg:'salt'}, {Egg:'monosodium'}];
		console.table(eggfried, ['Egg']);
	}
	
	static Lechons() {
		var porkwhole = "True";
		var sugar = "True";
		var salt = "True";
		var lemonGrass = "True";
		var tulmeric = "True";
		var condensedMilk = "True";
		var indianPepper = "True";
		var vinegar = "True";
		var galGarlic = "True";
		const lechon = [{Lechon:'porkwhole'}, {Lechon:'sugar'}, {Lechon:'salt'}, {Lechon:'lemonGrass'}, {Lechon:'tulmeric'}, {Lechon:'condensedMilk'}, {Lechon:'indianPepper'}, {Lechon:'vinegar'}, {Lechon:'galGarlic'}];
		console.table(lechon,['Lechon']);
	}
	
	static Champorados() {
		var stickyRice = "True";
		var chocolateTablea = "True";
		var brownSugar = "True";
		var condensedMilk = "True";
		var hersheyChocolate = "True";
		const champorado =[{Champorado:'stickyRice'}, {Champorado:'chocolateTablea'}, {Champorado:'brownSugar'}, {Champorado:'condensedMilk'}, {Champorado:'hersheyChocolate'}];
		console.table(champorado,['Champorado']);
	}
	
	static Breads() {
		var flour = "True";
		var egg = "True";
		var wheat = "True";
		var sugar = "True";
		var salt = "True";
		const bread =[{Bread:'flour'}, {Bread:'egg'}, {Bread:'wheat'}, {Bread:'sugar'}, {Bread:'salt'}];
		console.table(bread,['Bread']);
	}
	
	static ShangHaiPancits() {
		var dryRamens = "True";
		var salt = "True";
		var sugars = "True";
		var pork = "True";
		var vegetables = "True";
		var sauce = "True";
		var oil = "True";
		const pancit =[{Pancit:'dryRamens'}, {Pancit:'salt'}, {Pancit:'sugars'}, {Pancit:'pork'}, {Pancit:'vegetables'}];
		console.table(pancit,['Pancit']);
	}
	
	static PorkCalderetas() {
		var pork = "True";
		var sauce = "True";
		var chives = "True";
		var oils = "True";
		var onions = "True";
		var gingers = "True";
		const caldereta =[{Caldereta:'pork'}, {Caldereta:'sauce'}, {Caldereta:'chives'}, {Caldereta:'oils'}, {Caldereta:'gingers'}, {Caldereta:'onions'}];
		console.table(caldereta,['Caldereta']);
	}
	
	static ChickenAdobos() {
		var chicken = "True";
		var sautes = "Garlic & ONions";
		var sauce = "True";
		var salts = "True";
		var sugar = "True";
		const adobo =[{Adobo:'chicken'}, {Adobo:'sautes'}, {Adobo:'sauce'}, {Adobo:'salts'}, {Adobo:'sugar'}];
		console.table(adobo,['Adobo']);
	}


	static FriedFish() {
		var fish = "True";
		var salts = "True";
		var monosodium = "True";
		var margarine = "True";
		var cookingOil = "True";
		const fried =[{Fried:'fish'}, {Fried:'salts'}, {Fried:'monosodium'}, {Fried:'margarine'}, {Fried:'cookingOil'}];
		console.table(fried,['Fried']);
	}


	static Afritadas() {
		var pork = "True";
		var potatoes = "True";
		var carrots = "True";
		var garlics = "True";
		var onions = "True";
		var oils = "True";
		var saauces = "True";
		const cook = [{Afritada:'pork'}, {Afritada:'potatoes'}, {Afritada:'carrots'}, {Afritada:'garlics'}, {Afritada:'onions'}, {Afritada:'oils'}, {Afritada:'sauces'}];
		console.table(cook,['Afritada']);
	}

	static Pizzas() {
		var cheese = "True";
		var porks = "True";
		var sauces = "True";
		var flours = "True";
		var wheat = "True";
		var doughs = "True";
		const pizza = [{Pizza:'cheese'}, {Pizza:'porks'}, {Pizza:'sauces'}, {Pizza:'flours'}, {Pizza:'wheat'}, {Pizza:'doughs'}];
		console.table(pizza, ['Pizza']);
	}

	static FriedDilis() {
		var dilis = "True";
		var eggs = "True";
		var oils = "True";
		var monosodium = "True";
		const fry = [{Fried:'dilis'}, {Fried:'eggs'}, {Fried:'oils'}, {Fried:'monosodium'}];
		console.table(fry, ['Fried']);
	}

}

Foods.LechonPaksiws();
Foods.Hotdogs();
Foods.Butchis();
Foods.Lechons();
Foods.EggFrieds();
Foods.Champorados();
Foods.Breads();
Foods.ShangHaiPancits();
Foods.PorkCalderetas();
Foods.ChickenAdobos();
Foods.FriedFish();
Foods.Afritadas();
Foods.Pizzas();
Foods.FriedDilis();
