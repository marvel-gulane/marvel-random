class Pizzas {
	
        static Pepperonis() {
                var cheese = "True";
                var flour = "True";
                var wheat = "True";
                var salts = "True";
                var peppers = "True";
                var coloring = "True";
                const peperoni = [{Peperoni:'cheese'}, {Peperoni:'flour'}, {Peperoni:'wheat'}, {Peperoni:'salts'}, {Peperoni:'peppers'}, {Peperoni:'coloring'}];
                console.table(peperoni, ['Peperoni']);
        }
        
        static Hawaians() {
                var pineapple = "True";
                var flour = "True";
                var salts = "True";
                var peppers = "True";
                var dough = "True";
				var onions = "True";
                const hawaian = [{Hawaian:'pineapple'},{Hawaian:'flour'},{Hawaian:'salts'},{Hawaian:'peppers'},{Hawaian:'dough'},{Hawaian:'onions'}];
                console.table(hawaian, ['Hawaian']);
        }
        
        static Porks() {
                var pork = "True";
                var dough = "True";
                var flour = "True";
                var pepperonis = "True";
                var salts = "True";
                var peppers = "True";
                var cheese = "True";
                const porkmeaty = [{PorkMeat:'pork'}, {PorkMeat:'dough'}, {PorkMeat:'flour'}, {PorkMeat:'pepperonis'}, {PorkMeat:'salts'}, {PorkMeat:'peppers'}, {PorkMeat:'cheese'}];
                console.table(porkmeaty,['PorkMeat']);
        }
        
        static Lasagnas() {
                var pork = "True";
                var dough = "True";
                var flours = "True";
                var peppers = "True";
                var pepperonis = "True";
                var salts = "True";
                var monosodium = "True";
                var cheese = "True";
                const lasagna = [{Lasagna:'pork'}, {Lasagna:'dough'}, {Lasagna:'flours'}, {Lasagna:'peppers'}, {Lasagna:'pepperonis'}, {Lasagna:'salts'}, {Lasagna:'monosodium'}, {Lasagna:'cheese'}];
                console.table(lasagna, ['Lasagna']);
        }
        
        static Mutserelas() {
                var pork = "True";
                var cheese = "True";
                var peppers = "True";
                var flours = "True";
                var salts = "True";
                var sugars = "True";
                var monosodium = "True";
                var dough = "True";
                const mutserela = [{Mutserela:'pork'}, {Mutserela:'cheese'}, {Mutserela:'peppers'}, {Mutserela:'flours'}, {Mutserela:'salts'}, {Mutserela:'sugars'}, {Mutserela:'monosodium'}, {Mutserela:'dough'}];
                console.table(mutserela, ['Mutserela']);
        }
        
        static Cheesy() {
                var cheese = "True";
                var pork = "True";
                var dough = "True";
                var flours = "True";
                var salts = "True";
                var flavours = "True";
                var monosodium = "True";
                const cheesy = [{Cheesy:'cheese'}, {Cheesy:'pork'}, {Cheesy:'dough'}, {Cheesy:'flours'}, {Cheesy:'salts'}, {Cheesy:'flavours'}, {Cheesy:'monosodium'}];
                console.table(cheesy, ['Cheesy']);
        }
        
        static Enseladas() {
                var cheese = "True";
                var pork = "True";
                var dough = "True";
                var flours = "True";
                var salts = "True";
                var flavours = "True";
                var monosodium = "True";
                const enselada = [{Enselada:'cheese'}, {Enselada:'pork'}, {Enselada:'dough'}, {Enselada:'flours'}, {Enselada:'salts'}, {Enselada:'monosodium'}];
                console.table(enselada, ['Enselada']);
        }
        
        static Mexicans() {
                var cheese = "True";
                var pork = "True";
                var dough = "True";
                var flours = "True";
                var salts = "True";
                var flavours = "True";
                var monosodium = "True";
                const mexican = [{Mexicans:'cheese'}, {Mexicans:'pork'}, {Mexicans:'dough'}, {Mexicans:'flours'}, {Mexicans:'salts'}, {Mexicans:'flavours'}, {Mexicans:'flavours'}];
                console.table(mexican, ['Mexicans']);
		}
		
        static Italians() {
				var cheese = "True";
				var pepperonis = "True";
				var dough = "True";
				var flours = "True";
				var salts = "True";
				var monosodium = "True";
				var flavours = "True";
				var sweeteners = "True";
				var pork = "True";
                const italian = [{Italians:'cheese'}, {Italians:'pepperonis'}, {Italians:'dough'}, {Italians:'flours'}, {Italians:'salts'}, {Italians:'monosodium'}, {Italians:'flavours'}, {Italians:'sweeteners'}, {Italians:'pork'}];
                console.table(italian, ['Italians']);
        }
}

Pizzas.Pepperonis();
Pizzas.Hawaians();
Pizzas.Porks();
Pizzas.Lasagnas();
Pizzas.Enseladas();
Pizzas.Cheesy();
Pizzas.Mutserelas();
Pizzas.Mexicans();
Pizzas.Italians();
