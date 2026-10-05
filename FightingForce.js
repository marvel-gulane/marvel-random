class FIGHTINGFORCE {

	static ANTAGONISTS() {
		var BUBBA_RAMIREZ 		= "TRUE";
		var CARL_RAZON 			= "TRUE";
		var H_FABIO 			= "TRUE";
		var JUNIOR_MAKASINAZ 		= "TRUE";
		var JAY_BELT 			= "TRUE";
		var PHIL_SALVADOR 		= "TRUE";
		var SNAKE_DULA	 		= "TRUE";
		var STRANG_BUENAVENTURA 	= "TRUE";
		var HOTDOG_LELIS 		= "TRUE";
		var ANGEL_FAJARDO 		= "TRUE";
		var EXO_TAHERI 			= "TRUE";
		var DRIVER_ALARMA 		= "TRUE";
		var MAVERICK_CHRISOSTOMO	= "TRUE";
		var AGENT12_NICA 		= "TRUE";
		var JANITOR_MACABADBAD 		= "TRUE";
		var DEX_WATSONS 		= "TRUE";
		var FLOYD_AUNZO 		= "TRUE";
		var SMASHER_GUILLEMER 		= "TRUE";
		var HAWKINS_MARIVELES 		= "TRUE";
		var MCAFEE_MCAFEE 		= "TRUE";
		var MARVEL_MANUZA 		= "TRUE";
		var MACY_SERRAN 		= "TRUE";
		var MACEE_LAVILLES		= "TRUE";
		var VIXEN_RAMIREZ 		= "TRUE";
		var ZENG_DIACHOCOSO 		= "TRUE";
		var VOLTAGE_ANDRADA 		= "TRUE";
		var SAM_FISHER 			= "TRUE";
		var TOM_FISHER 			= "TRUE";
		var AGENT47_KASIMERO 		= "TRUE";
		var MOSSAD_GULANE 		= "TRUE";
		var MASHER_MUSTAFA		= "TRUE";
		var SNAKEY_BUENEVENTURA		= "TRUE";
		var SLASHER_ASUNCION		= "TRUE";
		var DUDE_ASAGI			= "TRUE";
		var SKINNY_HABURA		= "TRUE";
		var BASHER_ENCARNACION		= "TRUE";
		var PUNK_POBLACION		= "TRUE";
		var BRUISER_ZAMORA		= "TRUE";
		var BANGER_POBLETE		= "TRUE";
		var SMILER_ARIZO		= "TRUE";
		var CRUSHER_RIZAL		= "TRUE";
		var MISERY_HIDALGO		= "TRUE";
		var LORI_ABDULLAH		= "TRUE";
		var SANDY_BELEN			= "TRUE";
		var SACHA			= "TRUE";
		var KELLY			= "TRUE";
		var DANA			= "TRUE";
		var MACE			= "TRUE";
		var ALANA			= "TRUE";
		var VULKAN			= "TRUE";
		var CRYO			= "TRUE";
		var MORRIS			= "TRUE";
		var NIELSEN			= "TRUE";
		var CHUCK			= "TRUE";
		var GEORGE			= "TRUE";
		var SAMUEL			= "TRUE";
		var LEON			= "TRUE";
		var EDDIE			= "TRUE";
		var HENRY			= "TRUE";
		var MATT			= "TRUE";
		var SPANNER			= "TRUE";
		var DAVE			= "TRUE";
		var MARTINA			= "TRUE";
		var BECK			= "TRUE";
		var GINA			= "TRUE";
		var STORM			= "TRUE";
		var BLEACH			= "TRUE";
		var DISS			= "TRUE";
		var ROTTEN			= "TRUE";
		var NELSON			= "TRUE";
		var SCAR			= "TRUE";
		var LORD			= "TRUE";
		var STONEY			= "TRUE";
		var FEAR			= "TRUE";
		var SHADY			= "TRUE";
		var VICTOR_GUILLEMER		= "TRUE";
		var CLYDE_SERRAN		= "TRUE";
		var BYRON_LAGRING		= "TRUE";
		var LOUIS_MACABADBAD		= "TRUE";
		var APOLLO_HIDWANO		= "TRUE";
		var BLADE_TAHERI		= "TRUE";
		var JASON_BOURNE		= "TRUE";

		let ANTAGONIST_HEALTH 		= 100 / 100;
	}

	static PROGRAMS() {
		var CNN 			= "TRUE";
		var ALJAZEERA 			= "TRUE";
		var BBC 			= "TRUE";
		var UNTV 			= "TRUE";
		var GMA 			= "TRUE";
		var TV5 			= "TRUE";
		var CN 				= "TRUE";

		let BROADCASTER_HEALTH 		= 100 / 100;
	}

	static PROGRAMMERS() {
		var GITHUB 			= "TRUE";
		var GITLAB 			= "TRUE";
		var NASA 			= "TRUE";
		var SPACEX 			= "TRUE";
		var FACEBOOK 			= "TRUE";
		var GOOGLE 			= "TRUE";
		var YOUTUBE 			= "TRUE";

		let PROGRAMMER_HEALTH 		= 100 / 100;
	}
}

class ACTIONS extends FIGHTINGFORCE {
	static Actions(){
		let GRAB 			= "TRUE";
		let KICK 			= "TRUE";
		let PUNCH 			= "TRUE";
		let BACK_FIST 			= "TRUE";
	}
}

class MISSIONS extends FIGHTINGFORCE {
	static Missions() {
		const MISSION_GENESIS 		= [];
		const MISSION_EXODUS 		= [];
		const MISSION_ONE 		= [];
		const MISSION_TWO 		= [];
		const MISSION_THREE 		= [];
		const MISSION_FOUR 		= [];
		const MISSION_FIVE 		= [];
		const MISSION_SIX 		= [];
		const MISSION_SEVEN 		= [];
		const MISSION_FINALE 		= [];
	}
}

class STAGES extends FIGHTINGFORCE {
	static STAGES() {
		const RECEPTION 		= [];
		const CORRIDOR 			= [];
		const CAR_PARK 			= [];
		const AIRBASE 			= [];
		const NAVAL_BASE_01 		= [];
		const BRONX 			= [];
		const PARK_01 			= [];
		const MALL 			= [];
		const NAVAL_BASE_02 		= [];
		const HOVERCRAFT 		= [];
		const SUBWAY_STATION 		= [];
		const TRAIN 			= [];
		const BRIDGE 			= [];
		const PARK_02 			= [];
		const LIFT 			= [];
		const ISLAND_LIFT 		= [];
		const ISLAND_LAB 		= [];
		const HIGHT_STREET 		= [];
		const ZENG_OFFICE 		= [];
	}
}

class EVENTS extends FIGHTINGFORCE {
	static NEWYEARS() {
		let CIVILIANS 			= "TRUE";
		let VILLAGERS 			= "TRUE";
		let POLITICIANS 		= "TRUE";
		let AGENTS 			= "TRUE";
		let WORKERS 			= "TRUE";

		let NEW_YEAR 			= "Normal Good";
	}

	static RAMADANS() {
		let CIVILIANS 			= "TRUE";
		let PROPHETS 			= "TRUE";
		let RABIIS 			= "TRUE";
		let FOREIGNERS 			= "TRUE";
		let VILLAGERS			= "TRUE";

		let RAMADAN 			= "Peacefull Silent";
	}

	static FESTIVALS() {
		let CIVILIANS 			= "TRUE";
		let INSURGENTS 			= "TRUE";
		let POLITICIANS 		= "TRUE";
		let AGENTS 			= "TRUE";
		let POLICE			= "TRUE";
		let SOLDIERS 			= "TRUE";
		let LAWYERS 			= "TRUE";
		let MEDICS 			= "TRUE";
		let PRIESTS 			= "TRUE";
		let ENTERTAINERS 		= "TRUE";

		let FESTIVAL			= 85 / 100;
	}

	static REWARDS() {
		let CIVILIANS 			= "TRUE";
		let ECONOMY 			= "TRUE";
		let NEEDS			= "TRUE";
		let WANTS 			= "TRUE";

		let REWARD 			= 80 / 100;
	}

	static REUNIONS() {
		let CIVILIANS 			= "TRUE";
		let MEMBERS			= "TRUE";
		let POLICE 			= "TRUE";
		let INSURGENTS 			= "TRUE";
		let MILITARY 			= "TRUE";
		let AGENTS 			= "TRUE";
		let FOREIGNERS 			= "TRUE";

		let REUNION 			= "8 / 100";
	}
}

class ARMOR extends FIGHTINGFORCE {
	static EXO() {
		var ARM 			= "Anti Shock Bandana";
		var FEET 			= "Boots Of Soldiers";
		var HEAD			= "Alloy Helmet";
		var BODY			= "Bullet Proof Vest";
		var SUIT			= "Anti Radiatioactive";
		var WEAPON			= "AR-15 : 8 Magazines";
		var PISTOL			= "USP-30 : 8 Magazines";
		var MELEE			= "Mexican Machete";
	}

	static PHIL() {
		var ARM 			= "Anti Shock Bandana";
		var FEET 			= "Boots Of Soldiers";
		var HEAD			= "Alloy Helmet";
		var BODY			= "Bullet Proof Vest";
		var SUIT			= "Anti Radiatioactive";
		var WEAPON			= "Bazooka / RPG";
		var PISTOL			= "USP-30 : 8 Magazines";
		var MELEE			= "Mexican Machete";
	}
}


class HOTDOGS extends FIGHTINGFORCE {
	static Kresha_Mangansilo() {
		let HAIR 			= "BLACK";
		let TEETH			= "CLEAN";
		let BODY 			= "10/10";
		let SKINTONE 			= "WHITE";
		let SCENT 			= "CHOCOFUDGE";
		let EYES 			= "GREEN";
		let FACE 			= "MS. THEA BONIPEA";
	}
}

class PIZZAS extends FIGHTINGFORCE{
	
        static PEPPERONIS() {
                var CHEESE = "True";
                var FLOUR = "True";
                var WHEAT = "True";
                var SALTS = "True";
                var PEPPERS = "True";
                var COLORING = "True";
                const PEPERONI = [{PEPERONI:'CHEESE'}, {PEPERONI:'FLOUR'}, {PEPERONI:'WHEAT'}, {PEPERONI:'SALTS'}, {PEPERONI:'PEPPERS'}, {PEPERONI:'COLORING'}];
                console.table(PEPERONI, ['PEPERONI']);
        }
        
        static HAWAIANS() {
                var PINEAPPLE = "True";
                var FLOUR = "True";
                var SALTS = "True";
                var PEPPERS = "True";
                var DOUGH = "True";
		var ONIONS = "True";
                const HAWAIAN = [{HAWAIAN:'PINEAPPLE'},{HAWAIAN:'FLOUR'},{HAWAIAN:'SALTS'},{HAWAIAN:'PEPPERS'},{HAWAIAN:'DOUGH'},{HAWAIAN:'ONIONS'}];
                console.table(HAWAIAN, ['HAWAIAN']);
        }
        
        static PORKS() {
                var PORK = "True";
                var DOUGH = "True";
                var FLOUR = "True";
                var PEPPERONI = "True";
                var SALTS = "True";
                var PEPPERS = "True";
                var CHEESE = "True";
                const PORKMEATY = [{PORKMEAT:'PORK'}, {PORKMEAT:'DOUGH'}, {PORKMEAT:'FLOUR'}, {PORKMEAT:'PEPPERONI'}, {PORKMEAT:'SALTS'}, {PORKMEAT:'PEPPERS'}, {PORKMEAT:'CHEESE'}];
                console.table(PORKMEATY,['PORKMEAT']);
        }
        
        static LASAGNAS() {
                var PORK = "True";
                var DOUGH = "True";
                var FLOURS = "True";
                var PEPPERS = "True";
                var PEPPERONI = "True";
                var SALTS = "True";
                var MONOSODIUM = "True";
                var CHEESE = "True";
                const LASAGNA = [{LASAGNA:'PORK'}, {LASAGNA:'DOUGH'}, {LASAGNA:'FLOURS'}, {LASAGNA:'PEPPERS'}, {LASAGNA:'PEPPERONI'}, {LASAGNA:'SALTS'}, {LASAGNA:'MONOSODIUM'}, {LASAGNA:'CHEESE'}];
                console.table(LASAGNA, ['LASAGNA']);
        }
        
        static MUTSERELAS() {
                var PORK = "True";
                var CHEESE = "True";
                var PEPPERS = "True";
                var FLOURS = "True";
                var SALTS = "True";
                var SUGARS = "True";
                var MONOSODIUM = "True";
                var DOUGH = "True";
                const MUTSERELAS = [{MUTSERELAS:'PORK'}, {MUTSERELAS:'CHEESE'}, {MUTSERELAS:'PEPPERS'}, {MUTSERELAS:'FLOURS'}, {MUTSERELAS:'SALTS'}, {MUTSERELAS:'SUGARS'}, {MUTSERELAS:'MONOSODIUM'}, {MUTSERELAS:'DOUGH'}];
                console.table(MUTSERELAS, ['MUTSERELAS']);
        }
        
        static CHEESY() {
                var CHEESE = "True";
                var PORK = "True";
                var DOUGH = "True";
                var FLOURS = "True";
                var SALTS = "True";
                var FLAVOURS = "True";
                var MONOSODIUM = "True";
                const CHEESY = [{CHEESY:'CHEESE'}, {CHEESY:'PORK'}, {CHEESY:'DOUGH'}, {CHEESY:'FLOURS'}, {CHEESY:'SALTS'}, {CHEESY:'FLAVOURS'}, {CHEESY:'MONOSODIUM'}];
                console.table(CHEESY, ['CHEESY']);
        }
        
        static ENSELADAS() {
                var CHEESE = "True";
                var PORK = "True";
                var DOUGH = "True";
                var FLOURS = "True";
                var SALTS = "True";
                var FLAVOURS = "True";
                var MONOSODIUM = "True";
                const ENSELADA = [{ENSELADA:'CHEESE'}, {ENSELADA:'PORK'}, {ENSELADA:'DOUGH'}, {ENSELADA:'FLOURS'}, {ENSELADA:'SALTS'}, {ENSELADA:'MONOSODIUM'}];
                console.table(ENSELADA, ['ENSELADA']);
        }
        
        static MEXICANS() {
                var CHEESE = "True";
                var PORK = "True";
                var DOUGH = "True";
                var FLOURS = "True";
                var SALTS = "True";
                var FLAVOURS = "True";
                var MONOSODIUM = "True";
                const MEXICAN = [{MEXICANS:'CHEESE'}, {MEXICANS:'PORK'}, {MEXICANS:'DOUGH'}, {MEXICANS:'FLOURS'}, {MEXICANS:'SALTS'}, {MEXICANS:'FLAVOURS'}, {MEXICANS:'FLAVOURS'}];
                console.table(MEXICAN, ['MEXICANS']);
	}
		
        static ITALIANS() {
		var CHEESE = "True";
		var PEPPERONI = "True";
		var DOUGH = "True";
		var FLOURS = "True";
		var SALTS = "True";
		var MONOSODIUM = "True";
		var FLAVOURS = "True";
		var SWEETENERS = "True";
		var PORK = "True";
                const ITALIAN = [{ITALIANS:'CHEESE'}, {ITALIANS:'PEPPERONI'}, {ITALIANS:'DOUGH'}, {ITALIANS:'FLOURS'}, {ITALIANS:'SALTS'}, {ITALIANS:'MONOSODIUM'}, {ITALIANS:'FLAVOURS'}, {ITALIANS:'SWEETENERS'}, {ITALIANS:'PORK'}];
                console.table(ITALIAN, ['ITALIANS']);
        }
}

class DRINKS extends FIGHTINGFORCE {

	static SODAS() {
		var COLAS = "TRUE";
		var DRPEPPERS = "TRUE";
		var PEPSIES = "TRUE";
		var ROOTBEERS = "TRUE";
		var MOUNTAINDEWS = "TRUE";
		var FANTAS = "TRUE";
		const SODA = [{FRIDGE:'COLA'}, {FRIDGE:'DRPEPPER'}, {FRIDGE:'PEPSI'} , {FRIDGE:'ROOTBEER'}, {FRIDGE:'MOUNTAINDEW'}, {FRIDGE:'FANTA'}];
		console.table(SODA, ['FRIDGE']);
	}

	static WATERS() {
		var MINERALS = "TRUE";
		var POCARIS = "TRUE";
		const WATER = [{FRIDGE:'MINERAL'}, {FRIDGE:'POCARIS'}];
		console.table(WATER, ['FRIDGE']);
	}

}

class FOODS extends FIGHTINGFORCE {
	
	static LECHONPAKSIWS() {
		var MONOSODIUM = "True";
		var SALTS = "True";
		var SUGARS = "True";
		var INDIANSPICES = "True";
		var LEMONGRASS = "True";
		const PAKSIW  = [{INGREDIENTS:'MONOSODIUM'}, {INGREDIENTS:'SALTS'}, {INGREDIENTS:'SUGARS'}, {INGREDIENTS:'spicesIndia'}, {INGREDIENTS:'lemonGrass'}];
		console.table(PAKSIW, ['INGREDIENTS']);
	}
	
	static HOTDOGS() {
		var MONOSODIUM = "True";
		var SUGARS = "True";
		var SALTS = "True";
		var FLOURS = "True";
		var ARTIFICIAL = "True";
		var MARGARINE = 2 / 4;
		const HOTDOG =[{HOTDOG:'MONOSODIUM'}, {HOTDOG:'sugar'}, {HOTDOG:'salt'}, {HOTDOG:'FLOUR'}, {HOTDOG:'artificial'}, {HOTDOG:'margarine'}];
		console.table(HOTDOG,['HOTDOG']);
	}
	
	static BUTCHIS() {
		var SUGARS = "True";
		var FLOURS = "True";
		var WHEAT = "True";
		var CHOCOLATES = "True";
		var MONGOS = "True";
		var COLORINGS = "True";
		const BUTCHI =[{BUTCHI:'sugar'}, {BUTCHI:'FLOUR'}, {BUTCHI:'WHEAT'}, {BUTCHI:'chocolates'}, {BUTCHI:'mongos'}, {BUTCHI:'COLORING'}];
		console.table(BUTCHI,['BUTCHI']);
	}
	
	static EGGFRIEDS() {
		var MARGARINE = "True";
		var SALTS = "True";
		var MONOSODIUM = "True";
		const FRIED =[{EGG:'margarine'}, {EGG:'salt'}, {EGG:'MONOSODIUM'}];
		console.table(FRIED, ['EGG']);
	}
	
	static LECHONS() {
		var PORKWHOLE = "True";
		var SUGARS = "True";
		var SALTS = "True";
		var LEMONGRASSES = "True";
		var TULMERIC = "True";
		var CONDENSEDMILK = "True";
		var PEPPERS = "True";
		var VINEGAR = "True";
		var GARLICS = "True";
		const LECHON = [{LECHON:'PORKwhole'}, {LECHON:'sugar'}, {LECHON:'salt'}, {LECHON:'lemonGrass'}, {LECHON:'tulmeric'}, {LECHON:'condensedMilk'}, {LECHON:'indianPepper'}, {LECHON:'vinegar'}, {LECHON:'galGarlic'}];
		console.table(LECHON,['LECHON']);
	}
	
	static CHAMPORADOS() {
		var STICKYRICE = "True";
		var CHOCOLATETABLEA = "True";
		var SUGARS = "True";
		var CONDENSEDMILK = "True";
		var HERSHEYCHOCOLATES = "True";
		const CHAMPORADO =[{CHAMPORADO:'stickyRice'}, {CHAMPORADO:'chocolateTablea'}, {CHAMPORADO:'brownSugar'}, {CHAMPORADO:'condensedMilk'}, {CHAMPORADO:'hersheyChocolate'}];
		console.table(CHAMPORADO,['CHAMPORADO']);
	}
	
	static BREADS() {
		var FLOURS = "True";
		var EGG = "True";
		var WHEAT = "True";
		var SUGARS = "True";
		var SALTS = "True";
		const BREAD =[{BREAD:'FLOUR'}, {BREAD:'egg'}, {BREAD:'WHEAT'}, {BREAD:'sugar'}, {BREAD:'salt'}];
		console.table(BREAD,['BREAD']);
	}
	
	static SHANGHAIPANCITS() {
		var RAMENS = "True";
		var SALTS = "True";
		var SUGARS = "True";
		var PORK = "True";
		var VEGETABLES = "True";
		var SAUCE = "True";
		var OIL = "True";
		const PANCIT =[{PANCIT:'dryRamens'}, {PANCIT:'salt'}, {PANCIT:'SUGARS'}, {PANCIT:'PORK'}, {PANCIT:'vegetables'}];
		console.table(PANCIT,['PANCIT']);
	}
	
	static PORKCALDERETAS() {
		var PORK = "True";
		var SAUCE = "True";
		var CHIVES = "True";
		var OIL = "True";
		var ONIONS = "True";
		var GINGERS = "True";
		const CALDERETA =[{CALDERETA:'PORK'}, {CALDERETA:'sauce'}, {CALDERETA:'chives'}, {CALDERETA:'oils'}, {CALDERETA:'gingers'}, {CALDERETA:'ONIONS'}];
		console.table(CALDERETA,['CALDERETA']);
	}
	
	static CHICKENADOBOS() {
		var CHICKEN = "True";
		var GARLICS = "True";
		var ONIONS = "True";
		var SAUCES = "True";
		var SALTS = "True";
		var SUGARS = "True";
		const ADOBO =[{ADOBO:'chicken'}, {ADOBO:'sautes'}, {ADOBO:'sauce'}, {ADOBO:'SALTS'}, {ADOBO:'sugar'}];
		console.table(ADOBO,['ADOBO']);
	}


	static FRIEDFISH() {
		var FISH = "True";
		var SALTS = "True";
		var MONOSODIUM = "True";
		var MARGARINE = "True";
		var COOKINGOIL = "True";
		const FRY =[{FRY:'fish'}, {FRY:'SALTS'}, {FRY:'MONOSODIUM'}, {FRY:'margarine'}, {FRY:'COOKingOil'}];
		console.table(FRY,['FRY']);
	}


	static AFRITADAS() {
		var PORK = "True";
		var POTATOES = "True";
		var CARROTS = "True";
		var GARLICS = "True";
		var ONIONS = "True";
		var OILS = "True";
		var SAUCES = "True";
		const COOK = [{AFRITADA:'PORK'}, {AFRITADA:'potatoes'}, {AFRITADA:'carrots'}, {AFRITADA:'GARLICS'}, {AFRITADA:'ONIONS'}, {AFRITADA:'oils'}, {AFRITADA:'sauces'}];
		console.table(COOK,['AFRITADA']);
	}

	static PIZZAS() {
		var CHEESE = "True";
		var PORKS = "True";
		var SAUCES = "True";
		var FLOURS = "True";
		var WHEAT = "True";
		var DOUGHS = "True";
		const PIZZA = [{PIZZA:'CHEESE'}, {PIZZA:'PORKs'}, {PIZZA:'sauces'}, {PIZZA:'FLOURS'}, {PIZZA:'WHEAT'}, {PIZZA:'DOUGHs'}];
		console.table(PIZZA, ['PIZZA']);
	}

	static FRIEDDILIS() {
		var DILIS = "True";
		var EGGS = "True";
		var OILS = "True";
		var MONOSODIUM = "True";
		const FRY = [{FRY:'dilis'}, {FRY:'eggs'}, {FRY:'oils'}, {FRY:'MONOSODIUM'}];
		console.table(FRY, ['FRY']);
	}

	static ROASTCHICKENS() {
		var CHICKEN = "True";
		var SAUCES = "True";
		var LEMONGRASS = "True";
		var GARLICS = "True";
		var ONIONS = "True";
		const ROAST = [{ROAST:'chicken'}, {ROAST:'sauces'}, {ROAST:'lemonGrass'}, {ROAST:'GARLICS'}, {ROAST:'ONIONS'}];
		console.table(ROAST, ['ROAST']);
	}

	static WHITERICE() {
		var STICKYRICE = "TRUE";
		var NFARICE = "TRUE";
		var COMMERCIALRICE = "TRUE";
		var BROWNRICE = "TRUE";
		var WHITERICE = "TRUE";
		var PANDANLEAVES = "TRUE";
		const COOK = [{RICE:'white rice'}, {RICE:'brown rice'}, {RICE:'nfa_rice'}, {RICE:'commercial_rice'}, {RICE:'pandan_leaves'}];
		console.table(COOK, ['RICE']);
	}

	static BARBECUE() {
		var PORK = "TRUE";
		var SUGARS = "TRUE";
		var SALTS = "TRUE";
		var BANANA_KETCHUP = "TRUE";
		const GRILLS = [ {GRILLS:'PORK'}, {GRILLS:'SUGARS'}, {GRILLS:'SALTS'}, {GRILLS:'BANANA_KETCHUP'}];
		console.table(GRILLS, ['GRILLS']);
	}

	static CHORISO() {
		var SALTS = "TRUE";
		var PEPPER = "TRUE";
		var MONOSODIUM = "TRUE";
		var PORK_INTESTINES = "TRUE";
		const SMOKES = [{SMOKED:'SALTS'}, {SMOKED:'PEPPER'}, {SMOKED:'MONOSODIUM'}, {SMOKED:'PORK_INTESTINES'}];
		console.table(SMOKES,['SMOKED']);
	}
}

const MATH = [{MATHEMATICS:"∫01​∫01​1−xy1​dxdy=6π2​"},{MATHEMATICS:"iℏ∂t∂​∣Ψ⟩=H^∣Ψ⟩"},{MATHEMATICS:"Multiverse(θ)⇒{Un​(xn​,yn​,zn​,tn​):1≤n≤N}"},{MATHEMATICS:"∣Ψuniverse​⟩=i∑​αi​∣Ψworld i​⟩"},];
console.table(MATH, ['MATHEMATICS']);

const MESSAGE = "reAos ayaOiov, tc'Aos KaKwv שרות מודען (שמ) - מודען צבא, בטחון שדה ורגול נגד - למם אמן.";
console.log(MESSAGE);

const {execSync} 	= require('child_process');
const PYTHON 		= execSync('python ./marvel-codewars/codewars-python/*.py ' ,{encoding:'utf-8'});
const GPLUS		= execSync('g++ ./marvel-random/Universe.cpp',{encoding:'utf-8'});
const ENGINES		= execSync('./Node/bin/node ./marvel-random/Engine.js', {encoding:'utf-8'});
const BATTERY		= execSync('php ./Codebrowser/coded/Battery.php', {encoding:'utf-8'});
//const PIZZA		= execSync('./Node/bin/node ./marvel-random/Pizzas.js', {encoding:'utf-8'});
//const FOOD		= execSync('./Node/bin/node ./marvel-random/Food.js', {encoding:'utf-8'});

