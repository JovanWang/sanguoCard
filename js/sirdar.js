// 名字，简介，地区，星级，声望，经验，力量，攻速，体力
function Sirdar(name, intro, region, level, reputa, exp, stren, rate, stamina, imgsrc) {
	this.name = name; 		//名字
	this.intro = intro; 	//简介
	this.region = region; 	//地区
	this.level = level;		//星级

	this.exp = exp; 		//经验(1~5/场)
	this.reputa = reputa; 	//声望(1~10/场)
	this.stren = stren; 	//力量
	this.rate = rate; 		//攻速
	this.stamina = stamina; //体力(满值100)
	this.wear = 1;		//每次交手消耗体力（默认为1）
	this.rate_change = 0;	//攻速改变值


	this.imgsrc = imgsrc;  //将领图像

}

Sirdar.prototype.victory = function (round_n, timing, place) {//  胜利函数
	this.exp += Math.round((1 + Math.log(round_n) / Math.log(5)) + Math.random() * 2);
	// console.log(this.exp);
}
Sirdar.prototype.defeat = function (round_n, timing, place) {//  失败函数
	this.exp += Math.round(Math.log(round_n) / Math.log(10) + Math.random() * 2);
}
////**五星将领**////

///
//  角色：许褚
///
function Xu_Chu() {
	Sirdar.call(this, "许褚", "刚勇猛如虎，威风镇九州！", "谯县", "五星", 0, 0, 12, 2, 90, "img/img_sirdar/xuchu.jpg"); ///
	this.effect_num = 2;	//	英雄特效数量
	this.effect_name = ['虎痴', '裸衣'];
	this.effect_intr = ['当自己速比对方低时才有可能触发，触发后自身攻速+1。', '自己比对方力越低越易触发（最多三次），每触发一次耗体五点，力+1，且第三次触发效果变为每次挥招需要多消耗1点体力。'];

	///
	///	效果部分
	this.effect_1 = function (sir2) {//  效果一函数:虎痴
		//	当自己速比对方低时才有可能触发，触发后自身攻速+1，且挥招不消耗体力。

		if (this.effect_1_tag == undefined) this.effect_1_tag = true;//  判断效果是否可以触发
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  判断攻击加成是否生效
		// if(this.effect_1_num==undefined)this.effect_1_num = 0; //  判断效果是第几次生效
		if (this.effect_1_tag) {
			var dice = Math.round(Math.random() * 6);
			if (dice < 3 + (sir2.rate - this.rate)) {
				this.rate_change += 1;
				this.effect_1_isok = true;
				this.effect_1_tag = false;
			}
		}
	}

	this._effect_1 = function (sir2) {
		if (this.effect_1_tag) {
			this.rate_change -= 1;
		}
		this.effect_1_tag = false;
	}
	this.effect_2 = function (sir2) {//  效果二函数:裸衣
		//	自己比对方力越低越易触发（最多三次），每触发一次耗体五点，力+1，且第三次触发效果变为每次挥招需要多消耗1点体力。

		if (this.effect_2_tag == undefined) this.effect_2_tag = true;//  判断效果是否可以触发
		if (this.effect_2_isok == undefined) this.effect_2_isok = false; //  判断攻击加成是否生效
		if (this.effect_2_num == undefined) this.effect_2_num = 0; //  判断效果是第几次生效
		if (this.effect_2_tag) {
			var dice = Math.round(Math.random() * 100);
			if (dice < 50 + (sir2.stren - this.stren - this.effect_2_num) * 10) {
				this.stamina -= 5;
				this.stren += 1;
				if (this.effect_2_num == 2) { // 第三重裸衣
					this.wear += 1;
					this.effect_2_tag = false;
				}
				this.effect_2_isok = true;
				this.effect_2_num += 1; // 裸衣
			}
		}
	}

	this._effect_2 = function (sir2) {
		if (this.effect_2_tag) {
			this.stren -= this.effect_2_num;
			if (this.effect_2_num == 3) {
				this.wear -= 1;
			}
		}
		this.effect_2_tag = false;
	}
}

Xu_Chu.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	//第round_n回合，该回合中第rate_n次交手
	if (rate_n == 1) {
		if (sir2.rate > this.rate) {
			this.effect_1(sir2);
		}
		if (this.effect_1_isok) {
			msg = "<b style='color:#008B00'>效果<虎痴>激发成功！自身速+1。</b><br/>";
			this.effect_1_isok = false;
		}
		this.effect_2(sir2);
		if (this.effect_2_isok) {
			if (this.effect_2_num < 3) {
				//前一段技能达到触发条件，自己力+1
				msg += "<b style='color:#008B00'><裸衣>产生" + this.effect_2_num + "重效果！我方体-5，力+1</b><br/>";
				this.effect_2_isok = false;//清除效果
			} else if (this.effect_2_num == 3) {
				msg += "<b style='color:#008B00'><裸衣>产生" + this.effect_2_num + "重效果！挥招需要多消耗1点体力。</b><br/>";
				this.effect_2_isok = false;//清除效果
			}
		}

	}
	if (this.stamina < 0 || sir2.stamina < 0) {
		this._effect_1(sir2);
		this._effect_2(sir2);
	}
	return msg;
}

Xu_Chu.prototype.constructor = Xu_Chu;

///
//  角色：马超
///
function Ma_Chao() {
	Sirdar.call(this, "马超", "信着北土，威武并昭！", "扶风", "五星", 0, 0, 11, 3, 80, "img/img_sirdar/machao.jpg"); ///
	this.effect_num = 1;//英雄特效数量
	this.effect_name = ['践踏'];
	this.effect_intr = ['每回合均有40%的几率触发，触发后本回合自身力量增长，双方体力差越大，变化幅度越大。'];

	///
	///	效果部分
	this.effect_1 = function (sir2) {//  效果一函数:践踏
		//每回合进行效果触发判定，判定成功后力量发生改变，回合结束后重置。
		this.effect_1_tag = true;// 效果每回合都会触发判定
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  判断力量加成是否生效
		if (this.effect_1_tag) {
			this.effect_1_num = Math.round(1 + Math.abs((this.stamina - sir2.stamina) / 5));//力量提升值
			var dice = Math.floor(Math.random() * 10);//  40%的概率触发该效果
			if (dice < 4) {
				this.stren += this.effect_1_num;
				this.effect_1_isok = true;
			}
		}
	}
	this._effect_1 = function (sir2) {  //力量重置
		if (this.effect_1_isok) {
			this.stren -= this.effect_1_num;
			this.effect_1_isok = false;
		}
		this.effect_1_num = undefined;
	}
}

Ma_Chao.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	//第round_n回合，该回合中第rate_n次交手
	if (rate_n == 1) {
		this._effect_1(sir2);
		this.effect_1(sir2);
		if (this.effect_1_isok) {
			msg = "<b style='color:#008B00'>效果<践踏>激发成功！自身力+" + this.effect_1_num + "</b><br/>";
		} else if (this.effect_1_num != undefined) {
			msg = "<b style='color:#EE0000'>不妙，效果<践踏>激发失败！" + "</b><br/>";
		}
	}
	if (this.stamina < 0 || sir2.stamina < 0) {
		this._effect_1(sir2);
	}
	return msg;
}

Ma_Chao.prototype.constructor = Ma_Chao;



///
//角色：黄忠
///
function Huang_Zhong() {
	Sirdar.call(this, "黄忠", "强挚壮猛，摧峰登难！", "河南", "五星", 0, 0, 11, 3, 70, "img/img_sirdar/huangzhong.jpg");
	this.effect_num = 1;
	this.effect_1_num = 0;
	this.effect_name = ['老当益壮'];
	this.effect_intr = ['回合数越大，越易触发一段老当（速+1）,较对手生命值越低越易再次触发二段益壮（体力+15）。'];
	this.rate_change = 0;

	///
	///效果部分
	this.effect_1 = function (sir2, round_n) {//效果一函数：老当益壮
		//判断效果是否可以触发
		//if(this.effect_1_tag==undefined)this.effect_1_tag=true;
		//判断攻击加成是否生效
		if (this.effect_1_isok == undefined) this.effect_1_isok = false;
		var dice;//计算概率
		if (this.effect_1_num == 0) {
			dice = Math.round(Math.random() * 5)
			if (dice > 5 - round_n) {//
				this.effect_1_isok = true;//用来触发界面效果提示
				this.rate_change += 1;//一段老当速度+1
				this.effect_1_num = 1;
			}
		} else if (this.effect_1_num == 1) {
			this.rate_change = 0;//清除一段效果影响
			dice = Math.round(Math.random() * 100);
			var stamina_diff = sir2.stamina - this.stamina;
			if (dice > (60 - stamina_diff) && stamina_diff > 0) {//基础触发概率为2/5
				this.effect_1_isok = true;
				this.stamina += 15;//二段益壮体力+15
				this.effect_1_num = 2;
			}
		}
	}

	this._effect_1 = function () {
		this.effect_1_tag = false;
		this.rate_change -= 1;
		//this.effect_1_tag = true;
	}
}

Huang_Zhong.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {
	var msg = "";
	if (rate_n == 1) {
		this.effect_1(sir2, round_n);
	}

	if (this.effect_1_isok) {
		if (this.effect_1_num == 1) {
			//一段技能达到触发条件，乙方速度+1
			msg = "<b style='color:#008B00'><老当益壮>一段老当产生效果！我方速+" + this.rate_change + "</b><br/>";
			this.effect_1_isok = false;//清除一段效果
		} else if (this.effect_1_num == 2) {
			msg = "<b style='color:#008B00'><老当益壮>二段益壮产生效果！体力+15</b><br/>";
			this.effect_1_isok = false;//清除一段效果
		}
	}
	if (this.stamina < 0) {
		this._effect_1();//收尸阶段效果回收处理
		msg = "";
	}
	return msg;
}

Huang_Zhong.prototype.constructor = Huang_Zhong;

///
//  角色：关羽
///
function Guan_Yu() {
	Sirdar.call(this, "关羽", "忠肝义胆关云长，勇冠三军美髯公！", "河东", "五星", 0, 0, 12, 3, 75, "img/img_sirdar/guanyu.jpg"); ///
	this.effect_num = 1;
	this.effect_name = ['单刀'];
	this.effect_intr = ['第一轮第一次进攻可能会使用单刀进行突袭(秒人后可持续)，声望越高触发概率越低。'];

	///
	///	效果部分
	this.effect_1 = function () {//  效果一函数:单刀
		//每场战斗的第一次攻击会获得概率性的大幅提升10~20，与声望值负相关。
		if (this.effect_1_tag == undefined) this.effect_1_tag = true;//  判断效果是否可以触发
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  判断攻击加成是否生效
		if (this.effect_1_tag) {
			this.effect_1_num = Math.round(10 + Math.random() * 10);//力度提升值
			var dice = Math.round(Math.random() * (10 + this.reputa / 10));//  声望越高，效果出现概率越低
			if (dice < (8 - this.reputa / 20)) {
				this.stren += this.effect_1_num;
				this.effect_1_isok = true;
			}
			this.effect_1_tag = false;
		}
	}
	this._effect_1 = function () {
		if (this.effect_1_isok) {
			this.stren -= this.effect_1_num;
			this.effect_1_isok = false;
		}
		this.effect_1_num = undefined;
	}
}

Guan_Yu.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	if (round_n == 1 && rate_n == 1) {
		this.effect_1();
		if (this.effect_1_isok) {
			msg = "<b style='color:#008B00'>效果<单刀>激发成功！力+" + this.effect_1_num + "</b><br/>";
		} else if (this.effect_1_num != undefined) {
			msg = "<b style='color:#EE0000'>不妙，效果<单刀>激发失败！" + "</b><br/>";
		}
	}
	if (round_n == 1 && rate_n == 2) {
		this._effect_1();
		msg = "";
	}
	if (this.stamina < 0) {
		this.effect_1_tag = true;
	}
	return msg;
}

Guan_Yu.prototype.constructor = Guan_Yu;

///
//  角色：张飞
///
function Zhang_Fei(name, intro, region, level, reputa, exp, stren, rate, stamina, imgsrc) {
	Sirdar.call(this, "张飞", "熊虎之将，勇武敌万人！", "河北", "五星", 0, 0, 13, 2, 85, "img/img_sirdar/zhangfei.jpg");
	this.effect_num = 1;
	this.effect_name = ['断喝'];
	this.effect_intr = ['每轮战斗的开始会断喝一声，可能使对手受到干扰，对手力越低，概率越高。'];
	///
	///	效果部分
	this.effect_1 = function (sir2) {//  效果一函数:断喝
		//	每轮战斗的开始会断喝一声，可能使对手受到干扰，对手力越低干扰的概率越高。（5点便100%触发）。
		this.effect_1_tag = true;	//  用于判断效果是否已经触发过
		this.effect_1_isok = false; //  用于判断攻击加成是否生效
		this.effect_1_num = 0;	//	对手惊慌力度累计减幅
		if (sir2.stren == 0) {	//	若对手力为0则不能生效
			this.effect_1_tag = false;
		}
		if (this.effect_1_tag) {
			var stren_diff = this.stren - sir2.stren;	//  力差越大，效果出现概率越大
			var dice;
			if (stren_diff <= 0) {
				dice = Math.round(Math.random() * 10);
			} else {
				dice = stren_diff + Math.round(Math.random() * 10);
			}
			if (dice > 5) {
				sir2.stren -= 1;
				this.effect_1_num += 1;
				this.effect_1_isok = true;
			}
			//this.effect_1_tag=false; 使用次数并没有限制
		}
	}

	this._effect_1 = function (sir2) {
		if (this.effect_1_isok) {
			sir2.stren += this.effect_1_num;
			this.effect_1_isok = false;
		}
		this.effect_1_tag = true;
	}
}


Zhang_Fei.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	if (rate_n == 1) {
		this.effect_1(sir2);
		if (this.effect_1_isok) {
			msg = "<b style='color:#008B00'>效果<断喝>产生效果！敌方力-1" + "</b><br/>";
		} else {
			msg = "<b style='color:#EE0000'>很遗憾，效果<断喝>没有生效！" + "</b><br/>";
		}
	}
	if (this.stamina < 0) {
		this._effect_1(sir2);
		msg = "";
	}
	return msg;
}

Zhang_Fei.prototype.constructor = Zhang_Fei;


///
//  角色：赵云
///
function Zhao_Yun() {
	Sirdar.call(this, "赵云", "子龙一身是胆也！", "常山", "五星", 0, 0, 10, 3, 80, "img/img_sirdar/zhaoyun.jpg"); ///
	this.effect_num = 1;
	this.effect_name = ['龙胆银枪'];
	this.effect_intr = ['生命值越低，越易触发一段龙胆（速+1）,对手力越高越易再次触发二段银枪（速再+1）。'];
	this.rate_change = 0;

	///
	///	效果部分
	this.effect_1 = function (sir2) {//  效果一函数:龙胆银枪
		//	生命值越低，越容易触发龙胆（速+1）,对手力越高越容易触发银枪（速再+1）。

		if (this.effect_1_tag == undefined) this.effect_1_tag = true;//  判断效果是否可以触发
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  判断攻击加成是否生效
		if (this.effect_1_num == undefined) this.effect_1_num = 0; //  判断效果是第几次生效
		if (this.effect_1_tag && this.effect_1_num == 0) {
			var dice = Math.round(Math.random() * 100);
			if (dice < 100 - this.stamina) {
				this.rate_change += 1;
				this.effect_1_isok = true;
				this.effect_1_num = 1; // 一阶爆发：龙胆
				// this.effect_1_tag=false;
			}
		} else if (this.effect_1_tag && this.effect_1_num == 1) {
			var dice = Math.round(Math.random() * 100);
			if (dice < 10 + (sir2.stren - this.stren) * 4) {
				this.rate_change += 1;
				// this.stren += 1;
				this.effect_1_isok = true;
				this.effect_1_num = 2; // 二阶爆发：银枪
				this.effect_1_tag = false;
			}
		}
	}

	this._effect_1 = function (sir2) {
		this.effect_1_tag = false;
		if (this.effect_1_num == 1) this.rate_change -= 1;
		else if (this.effect_1_num == 2) {
			this.rate_change -= 2;
			// this.stren -=1;
		}
		this.effect_1_num = 0;
	}
}

Zhao_Yun.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	this.effect_1(sir2);
	if (this.effect_1_isok && this.effect_1_num == 1) {
		msg = "<b style='color:#008B00'><龙胆银枪>一段龙胆激发！速+" + 1 + "</b><br/>";
		this.effect_1_isok = false;
	} else if (this.effect_1_isok && this.effect_1_num == 2) {
		msg = "<b style='color:#008B00'><龙胆银枪>二段银枪爆发！速再+" + 1 + "</b><br/>";
		this.effect_1_isok = false;
	}
	if (this.stamina < 0) {
		this._effect_1(sir2);
		msg = "";
	}
	return msg;
}

Zhao_Yun.prototype.constructor = Zhao_Yun;


///
//  角色：典韦
///
function Dian_Wei() {
	Sirdar.call(this, "典韦", "古之恶来！", "陈留", "五星", 0, 0, 15, 2, 65, "img/img_sirdar/dianwei.jpg"); ///
	this.effect_num = 2;
	this.effect_name = ['恶来', '五步乃白'];
	this.effect_intr = ['攻击不消耗体力且生命值越低，越容易触发恶来效果（回复体力）。', '战斗持续的回合越后，五步乃白的触发的几率越高（额外消耗对手一次对招）。'];
	this.rate_change = 0;

	///
	///	效果部分
	this.effect_1 = function (sir2) {//  效果一函数:恶来
		//	攻击不消耗体力且生命值越低，越容易触发体力回复效果。
		this.wear = 0;
		if (this.effect_1_tag == undefined) this.effect_1_tag = true;//  判断效果是否可以触发
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  判断攻击加成是否生效
		if (this.effect_1_num == undefined) this.effect_1_num = 0;//存储回复伤害的值。
		if (this.effect_1_tag) {
			var dice = Math.round(Math.random() * (80 + this.exp));
			if (dice < 100 - this.stamina) {
				if (sir2.rate > 0 && this.stren > sir2.stren) {	//	对方速不为0且自己对比对方力大
					this.effect_1_num = this.stren - sir2.stren
					this.stamina += this.effect_1_num;
					this.effect_1_isok = true;
				}
				if (sir2.rate <= 0) {	//	自己速比对方多
					this.effect_1_num = this.stren
					this.stamina += this.effect_1_num;
					this.effect_1_isok = true;
				}
				// this.effect_1_tag=false;
			}
		}
	}
	this._effect_1 = function (sir2) {
		this.effect_1_tag = false;
		// this.wear = 1;
	}
	this.effect_2 = function (sir2, round_n) {//  效果二函数:五步乃白
		//	战斗持续的回合越后，五步乃白的触发的几率越高。
		if (this.effect_2_tag == undefined) this.effect_2_tag = true;//  判断效果是否可以触发
		if (this.effect_2_isok == undefined) this.effect_2_isok = false; //  判断攻击加成是否生效
		if (this.effect_2_tag) {
			var dice = Math.round(Math.random() * 15);
			if (dice < round_n) {
				sir2.rate -= 1;
				this.effect_2_isok = true;
				// this.effect_1_tag=false;
			}
		}
	}
	this._effect_2 = function (sir2, round_n) {
		this.effect_2_tag = false;
	}
}

Dian_Wei.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	if (this.rate > 0 && (sir2.rate <= 0 || this.stren > sir2.stren) && this.stamina < 70) {
		this.effect_1(sir2);
		if (this.effect_1_isok) {
			msg = "<b style='color:#008B00'>效果<恶来>生效！回复体+" + this.effect_1_num + "</b><br/>";
			this.effect_1_isok = false;
		} else {
			msg = "<b style='color:#EE0000'>效果<恶来>未生效！</b><br/>";
		}
	}
	if (rate_n == 1) {
		this.effect_2(sir2, round_n);
		if (this.effect_2_isok) {
			msg += "<b style='color:#008B00'><五步乃白>激发成功！减少对手一次对招。</b><br/>";
			this.effect_2_isok = false;
		}
	}

	if (this.stamina < 0) {
		this._effect_1(sir2);
		this._effect_2(sir2, round_n);
		msg = "";
	}
	return msg;
}

Dian_Wei.prototype.constructor = Dian_Wei;



////**四星将领**////

///
//  角色：夏侯惇
///
function Xia_Hou_Dun() {
	Sirdar.call(this, "夏侯惇", "父精母血，不可弃也！", "谯郡", "四星", 0, 0, 11, 2, 90, "img/img_sirdar/xiahoudun.jpg"); ///
	this.effect_num = 1;
	this.effect_name = ['啖睛'];
	this.effect_intr = ['当生命值低于20点，大概率触发低于10点一定触发啖睛效果（下回合力大幅增强）。'];
	this.rate_change = 0;

	///
	///	效果部分
	this.effect_1 = function (round_n) {//  效果一函数:啖睛
		//	当生命值低于20点，大概率触发，低于10点一定触发啖睛效果（下回合力大幅增强）。

		if (this.effect_1_tag == undefined) this.effect_1_tag = true;//  判断效果是否可以触发
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  判断攻击加成是否生效
		if (this.effect_1_clear == undefined) this.effect_1_clear = false; //  判断效果是否需要清除
		if (this.effect_1_tag) {
			var dice = Math.round(Math.random() * 15);
			if (dice < 25 - this.stamina) {
				this.stren += 15;
				this.effect_1_num = round_n + 1;//存储消除加层的时刻
				this.effect_1_tag = false;
				this.effect_1_isok = true;
				this.effect_1_clear = true;
			}
		}
	}
	this._effect_1 = function (round_n) {
		if (this.effect_1_clear == true) {
			this.stren -= 15;
			this.effect_1_clear = false;
		}
	}
}

Xia_Hou_Dun.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	if (this.stamina < 20 && this.stamina > 0 && rate_n == 1) {
		this.effect_1(round_n);
		if (this.effect_1_isok) {
			msg = "<b style='color:#008B00'>效果<啖睛>激发成功！此回合力+" + 15 + "</b><br/>";
			this.effect_1_isok = false;
			this.effect_1_tag = false;
		}
	}
	if (this.stamina < 0 || this.effect_1_num == round_n || (round_n == 1 && rate_n == 1)) {
		this._effect_1(round_n);
		msg = "";
	}
	return msg;
}

Xia_Hou_Dun.prototype.constructor = Xia_Hou_Dun;


////**三星将领**////

///
//  角色：华雄
///
function Hua_Xiong(name, intro, region, level, reputa, exp, stren, rate, stamina, imgsrc) {
	Sirdar.call(this, "华雄", "关西悍将，勇挡三军，威慑群雄！", "关西", "三星", 0, 0, 6, 4, 70, "img/img_sirdar/huaxiong.jpg");
	this.effect_num = 1;
	this.effect_name = ['快刀'];
	this.effect_intr = ['每轮战斗的都有机会使出快刀，数刀合一造成伤害，先攻使用快刀时力不受减幅影响。'];
	///
	///	效果部分
	this.effect_1 = function (round_n) {//  效果一函数:快刀
		//	每轮战斗的都有机会使出快刀，四刀合一，一起打出。（越到后面越难触发）
		// if(this.effect_1_tag==undefined)this.effect_1_tag = true;	//  用于判断效果触发是否生效
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  用于判断攻击合并是否生效
		if (this.effect_1_num == undefined) this.effect_1_num = 0;	//	保存触发前的力值
		if (this.effect_1_tag) {
			var dice;	//  回合越后越难触发
			dice = (Math.random() * 12);
			if (dice < (10 / (round_n + 2))) {
				this.effect_1_num = this.stren;
				this.stren = this.stren * this.rate;
				this.effect_1_isok = true;
			}
			this.effect_1_tag = false; //根据使用次数判断是否使用效果
		} else {
			if (this.effect_1_isok) {
				this.stren = 0;
			}
		}
	}

	this._effect_1 = function (round_n) {
		if (this.effect_1_isok) {
			this.stren = this.effect_1_num;
			this.effect_1_isok = false;
		}
		this.effect_1_tag = true;
	}
}


Hua_Xiong.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	if (rate_n == 1) {
		this._effect_1(round_n);
	}
	this.effect_1(round_n);
	if (rate_n == 1) {
		if (this.effect_1_isok) {
			msg = "<b style='color:#008B00'>效果<快刀>产生效果！" + "</b><br/>";
		} else {
			msg = "<b style='color:#EE0000'>很遗憾，效果<快刀>激发失败！" + "</b><br/>";
		}
	}
	return msg;
}

Hua_Xiong.prototype.constructor = Hua_Xiong;

///
//  角色：公孙瓒
///
function Gong_Sun_Zan(name, intro, region, level, reputa, exp, stren, rate, stamina, imgsrc) {
	Sirdar.call(this, "公孙瓒", "白马将军，勇一当十，震慑鲜卑！", "辽西", "三星", 0, 0, 7, 3, 70, "img/img_sirdar/gongsunzan.jpg");
	this.effect_num = 1;
	this.effect_name = ['白马义从'];
	this.effect_intr = ['在平原作战时，有机会增加自己的力和速和体。'];
	this.rate_change = 0;
	///
	///	效果部分
	this.effect_1 = function (place) {//  效果一函数:白马义从
		//	在平原作战时，有机会增加自己的力+1和速+1和体+10。
		if (place == 2) {
			if (this.effect_1_tag == undefined) this.effect_1_tag = true;	//  用于判断效果触发是否生效
			if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  用于判断攻击合并是否生效
			if (this.effect_1_num == undefined) this.effect_1_num = [];	//	保存触发了的状态
			if (!this.effect_1_isok) {	//	只能成功激发一次
				var dice;		//  三项加成的触发随机产生
				dice = (Math.random() * 15);
				if (dice < 10) {
					this.effect_1_num.push(1);
					this.stren += 1;
					this.effect_1_isok = true;
				}
				dice = (Math.random() * 15);
				if (dice < 10) {
					this.effect_1_num.push(2);
					this.rate_change += 1;
					this.effect_1_isok = true;
				}
				dice = (Math.random() * 15);
				if (dice < 10) {
					this.effect_1_num.push(3);
					this.stamina += 10;
					this.effect_1_isok = true;
				}
				// this.effect_1_tag=false; //只能激发一次
			}
		}
	}

	this._effect_1 = function (place) {
		if (this.effect_1_isok) {
			this.effect_1_isok = false;
		}
		this.effect_1_tag = true;
	}
}


Gong_Sun_Zan.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	if (rate_n == 1) {
		this.effect_1(place);
		if (this.effect_1_isok && this.effect_1_tag) {
			msg = "<b style='color:#008B00'>平原效果<白马义从>激发成功！";
			$.each(this.effect_1_num, function (index, val) {
				switch (val) {
					case 1:
						msg += "力+1";
						break;
					case 2:
						msg += "速+1";
						break;
					case 3:
						msg += "体+10";
						break;
					default:
						msg = "错误！";
				}
			});
			msg += "</b><br/>";
			this.effect_1_tag = false; //只能显示激发信息一次
		}
	}
	if (this.stamina < 0) {
		this._effect_1(place);
	}
	return msg;
}

Gong_Sun_Zan.prototype.constructor = Gong_Sun_Zan;

////**二星将领**////
function Zhou_Cang(name, intro, region, level, reputa, exp, stren, rate, stamina, imgsrc) {
	Sirdar.call(this, "周仓", "莽勇忠烈，臂有千斤！", "山西", "二星", 0, 0, 13, 1, 70, "img/img_sirdar/zhoucang.jpg");
	this.effect_num = 1;
	this.effect_name = ['莽力扛刀'];
	this.effect_intr = ['每回合都有可能打出额外的一招，与敌方速度差越大，概率越高,敌方力越高，第二招伤害越高，最高为第一招的力值。'];
	this.rate_change = 0;
	///
	///	效果部分
	this.effect_1 = function (sir2, round_n) {//  效果一函数:莽力扛刀
		//	每回合都有可能打出额外的一招，与敌方速度差越大，概率越高,敌方力越高，第二招伤害越高，最高为第一招的力值。
		if (this.effect_1_tag == undefined) this.effect_1_tag = true;	//  用于判断效果触发是否生效
		if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  用于判断攻击合并是否生效
		if (this.effect_1_num == undefined) this.effect_1_num = this.stren;	//	保存原始力的值
		if (this.stren_num == undefined) this.stren_num = 0;	//	保存加层力的值
		if (this.effect_1_tag && this.round != round_n) {
			var dice = Math.floor(Math.random() * 10);
			this.stren_num = Math.floor(4 + Math.random() * ((sir2.stren - 3) > 10 ? 10 : (sir2.stren - 3)) * ((this.effect_1_num - 4) / 10));
			if (dice < 3 + (sir2.rate - this.rate)) {
				this.rate += 1;
				this.stren = this.stren_num;
				this.effect_1_isok = true;
			}
			this.round = round_n;
		}
	}

	this._effect_1 = function () {
		if (this.effect_1_tag == false) {
			this.stren = this.effect_1_num;
			this.effect_1_tag = true;
		}
	}
}


Zhou_Cang.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {	//  战斗函数
	var msg = "";
	if (rate_n == 1) {
		this._effect_1();
	}
	if (this.rate == 0) {
		// this._effect_1();
		this.effect_1(sir2, round_n);
		if (this.effect_1_isok) {
			msg += "<b style='color:#008B00'>效果<莽力扛刀>激发成功！可多挥出力为" + this.stren_num + "的一招</b><br/>";
			this.effect_1_tag = false;
			this.effect_1_isok = false; //只能显示激发信息一次
		} else if (this.stren_num != 0) {
			msg += "<b style='color:#EE0000'>效果<莽力扛刀>激发失败！</b><br/>";
		}
		this.stren_num = 0;
	}
	if (this.stamina < 0) {
		this._effect_1();
	}
	return msg;
}

Zhou_Cang.prototype.constructor = Zhou_Cang;

////**一星将领**////
function Pei_Yuan_Shao(name, intro, region, level, reputa, exp, stren, rate, stamina, imgsrc) {
	Sirdar.call(this, "裴元绍", "匹夫无知，贪婪行事！", "河南", "一星", 0, 0, 6, 2, 45, "img/img_sirdar/peiyuanshao.jpg");
	this.effect_num = 1;
	this.effect_name = ['山林掩伏'];
	this.effect_intr = ['在山林中战斗时，在山林战斗的第一回合力+1，且有1/2概率触发速+1。只能触发一次。'];
	this.rate_change = 0;
	///
	///	效果部分
	this.effect_1 = function (place, round_n) {//  效果一函数:山林掩伏
		//	在山林中战斗时，则速+1。且在山林战斗的第一回合力+1，只能触发一次。
		if (place == 3) {
			if (this.effect_1_tag == undefined) this.effect_1_tag = true;	//  用于判断效果触发是否生效
			if (this.effect_1_isok == undefined) this.effect_1_isok = false; //  用于判断攻击合并是否生效
			if (this.effect_1_num == undefined) this.effect_1_num = 0;	//	保存固有效果力+1的状态
			if (round_n == 1 && this.effect_1_num == 0) {
				this.stren += 1;	//力+1
				this.effect_1_num = 1;
			} else if (round_n != 1 && this.effect_1_num == 2) {
				this.stren -= 1;	//	第一回合过后清除效果
				this.effect_1_num = 3;
			}
			if (!this.effect_1_isok) {	//	只能成功激发一次
				var dice = Math.floor(Math.random() * 20);
				if (dice < 10) {
					this.rate_change += 1;
					this.effect_1_isok = true;
				}
			}
		}
	}

	this._effect_1 = function (place) {
		if (place == 3) {
			if (this.effect_1_isok) {
				this.rate_change -= 1;
				this.effect_1_isok = false;
			}
			this.stren -= 1;
			this.effect_1_tag = true;
		}
	}
}


Pei_Yuan_Shao.prototype.attack = function (sir2, sir1_1, sir1_2, sir2_1, sir2_2, round_n, rate_n, timing, place) {//  战斗函数
	var msg = "";
	if (rate_n == 1) {
		this.effect_1(place, round_n);
		if (this.effect_1_num == 1 && this.effect_1_tag) {
			msg = "<b style='color:#008B00'>效果<山林掩伏>效果发动！力+1</b><br/>";
			this.effect_1_num = 2; //只能显示激发信息一次
		}
		if (this.effect_1_isok && this.effect_1_tag) {
			msg += "<b style='color:#008B00'>效果<山林掩伏>激发成功！速+1</b><br/>";
			this.effect_1_tag = false; //只能显示激发信息一次
		}
	}
	if (this.stamina < 0) {
		this._effect_1(place);
	}
	return msg;
}

Pei_Yuan_Shao.prototype.constructor = Pei_Yuan_Shao;