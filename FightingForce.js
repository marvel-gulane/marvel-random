class FightingForce {

	static Antagonists() {
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
		var MCAFEE 			= "TRUE";
		var MARVEL_MANUZA 		= "TRUE";
		var MACY_SERRAN 		= "TRUE";
		var MACEE_LAVILLES		= "TRUE";
		var VIXEN_RAMIREZ 		= "TRUE";
		var ZENG_DIACHOCOSO 		= "TRUE";
		var VOLTAGE_ANDRADA 		= "TRUE";
		var SAM_FISHER 			= "TRUE";
		var TOM_FISHER 			= "TRUE";
		var AGENT47 			= "TRUE";
		var MOSSAD 			= "TRUE";
		var MASHER			= "TRUE";
		var SNAKEY			= "TRUE";
		var SLASHER			= "TRUE";
		var DUDE			= "TRUE";
		var SKINNY			= "TRUE";
		var BASHER			= "TRUE";
		var PUNK			= "TRUE";
		var BRUISER			= "TRUE";
		var BANGER			= "TRUE";
		var SMILER			= "TRUE";
		var CRUSHER			= "TRUE";
		var MISERY			= "TRUE";
		var LORI			= "TRUE";
		var SANDY			= "TRUE";
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
		var VICTOR			= "TRUE";
		var CLYDE			= "TRUE";
		var BYRON			= "TRUE";
		var LOUIS			= "TRUE";
		var APOLLO			= "TRUE";
		var BLADE			= "TRUE";
		var JASON			= "TRUE";

		let ANTAGONIST_HEALTH 		= 100 / 100;
	}

	static Programs() {
		var CNN 			= "TRUE";
		var ALJAZEERA 			= "TRUE";
		var BBC 			= "TRUE";
		var UNTV 			= "TRUE";
		var GMA 			= "TRUE";
		var TV5 			= "TRUE";
		var CN 				= "TRUE";

		let BROADCASTER_HEALTH 		= 100 / 100;
	}

	static Programmers() {
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

class Action extends FightingForce {
	static Actions(){
		let GRAB 			= "TRUE";
		let KICK 			= "TRUE";
		let PUNCH 			= "TRUE";
		let BACK_FIST 			= "TRUE";
	}
}

class Mission extends FightingForce {
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

class Stage extends FightingForce{
	static Stages() {
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
class Events extends FightingForce {
	static NewYears() {
		let CIVILIANS 			= "TRUE";
		let VILLAGERS 			= "TRUE";
		let POLITICIANS 		= "TRUE";
		let AGENTS 			= "TRUE";
		let WORKERS 			= "TRUE";

		let NEW_YEAR 			= "Normal Good";
	}

	static Ramadans() {
		let CIVILIANS 			= "TRUE";
		let PROPHETS 			= "TRUE";
		let RABIIS 			= "TRUE";
		let FOREIGNERS 			= "TRUE";
		let VILLAGERS			= "TRUE";

		let RAMADAN 			= "Peacefull Silent";
	}

	static Festivals() {
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

	static Rewards() {
		let CIVILIANS 			= "TRUE";
		let ECONOMY 			= "TRUE";
		let NEEDS			= "TRUE";
		let WANTS 			= "TRUE";

		let REWARD 			= 80 / 100;
	}

	static Reunions() {
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


FightingForce.Antagonists();
FightingForce.Programmers();
FightingForce.Programs();
Mission.Missions();
Events.NewYears();
Events.Ramadans();
Events.Festivals();
Events.Rewards();
Events.Reunions();
