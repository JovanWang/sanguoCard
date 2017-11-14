document.write("<script src='js/sirdar.js'></script>");
function Sirdar_Method() {
	//  五星武将，四星武将，三星武将，二星武将，一星武将
	this.sir_list = [[], [], [], [], []];
	this.sir_list[0].push("Xu_Chu");
	this.sir_list[0].push("Ma_Chao");
	this.sir_list[0].push("Huang_Zhong");
	this.sir_list[0].push("Guan_Yu");
	this.sir_list[0].push("Zhang_Fei");
	this.sir_list[0].push("Zhao_Yun");
	this.sir_list[0].push("Dian_Wei");
	this.sir_list[1].push("Xia_Hou_Dun");
	this.sir_list[2].push("Hua_Xiong");
	this.sir_list[2].push("Gong_Sun_Zan");
	this.sir_list[3].push("Zhou_Cang");
	this.sir_list[4].push("Pei_Yuan_Shao");
	this.sirdaring = [];

	this.create_sir = function (sir_key) {
		/*
		// 不允许出现相同角色
		if(this.sirdaring.indexOf(sir_key) >= 0){
			return null;
		}else{
			this.sirdaring.push(sir_key);
		}
		*/
		switch (sir_key) {
			////*五星*////
			case "Xu_Chu":
				return new Xu_Chu();
			case "Ma_Chao":
				return new Ma_Chao();
			case "Huang_Zhong":
				return new Huang_Zhong();
			case "Guan_Yu":
				return new Guan_Yu();
			case "Zhang_Fei":
				return new Zhang_Fei();
			case "Zhao_Yun":
				return new Zhao_Yun();
			case "Dian_Wei":
				return new Dian_Wei();
			////*四星*////
			case "Xia_Hou_Dun":
				return new Xia_Hou_Dun();
			////*三星*////
			case "Hua_Xiong":
				return new Hua_Xiong();
			case "Gong_Sun_Zan":
				return new Gong_Sun_Zan();
			////*二星*////
			case "Zhou_Cang":
				return new Zhou_Cang();
			////*三星*////
			case "Pei_Yuan_Shao":
				return new Pei_Yuan_Shao();
		}
	};
	///
	//	招募将领受到将领名望和招募的类型来影响
	this.random_sir = function (renown, type) {
		var renown_dice = Math.round((renown - 50) / 5);
		var type_dice;
		var get_sirdar = null;
		switch (type) {
			case 1:
				type_dice = 0;	//	纳士榜
				break;
			case 2:
				type_dice = 20;	//	招贤榜
				break;
			case 3:
				type_dice = 80 + renown_dice;	//	英杰榜
				break;
			default:
				return get_sirdar;
		}
		var star1 = 10;	//	出现一星将领所占比例 
		var star2 = 20;	//	出现二星将领所占比例 
		var star3 = 30;	//	出现三星将领所占比例 
		var star4 = 20 + renown_dice;	//	出现四星将领所占比例 
		var star5 = 35 + renown_dice * 2;//100 - star1 - star2 - star3 - star4; //	出现五星将领所占比例 
		var dice = Math.round(type_dice + Math.random() * (70 + type_dice + renown_dice));
		switch (true) {
			case (dice < star1):
				type_num = Math.floor(Math.random() * this.sir_list[4].length);	//	一星中随机产生将领
				get_sirdar = this.create_sir(this.sir_list[4][type_num]);
				if (get_sirdar == null) get_sirdar = this.random_sir(renown, type);
				break;
			case (dice < star1 + star2):
				type_num = Math.floor(Math.random() * this.sir_list[3].length); //	二星中随机产生将领
				get_sirdar = this.create_sir(this.sir_list[3][type_num]);
				if (get_sirdar == null) get_sirdar = this.random_sir(renown, type);
				break;
			case (dice < star1 + star2 + star3):
				type_num = Math.floor(Math.random() * this.sir_list[2].length); //	三星中随机产生将领
				get_sirdar = this.create_sir(this.sir_list[2][type_num]);
				if (get_sirdar == null) get_sirdar = this.random_sir(renown, type);
				break;
			case (dice < star1 + star2 + star3 + star4):
				type_num = Math.floor(Math.random() * this.sir_list[1].length); //	四星中随机产生将领
				get_sirdar = this.create_sir(this.sir_list[1][type_num]);
				if (get_sirdar == null) get_sirdar = this.random_sir(renown, type);
				break;
			case (dice < star1 + star2 + star3 + star4 + star5):
				type_num = Math.floor(Math.random() * this.sir_list[0].length); //	五星中随机产生将领
				get_sirdar = this.create_sir(this.sir_list[0][type_num]);
				if (get_sirdar == null) get_sirdar = this.random_sir(renown, type);
				break;

		}
		return get_sirdar;
	};
}
// Sirdar_Method.prototype.constructor = Sirdar_Method;