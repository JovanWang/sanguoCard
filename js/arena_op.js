$(function () {
  var room_id = 1;// sessionStorage.getItem("room_id");
  //根据room获得uer，根据user获得将领的key实例化
  var sirdar_method = new Sirdar_Method();
  var isRandom = localStorage.getItem("random_sir");
  if (isRandom == "true") {
    var user_blue_sir = [sirdar_method.random_sir(50, 1), sirdar_method.random_sir(50, 2), sirdar_method.random_sir(50, 2)];
    var user_red_sir = [sirdar_method.random_sir(50, 1), sirdar_method.random_sir(50, 2), sirdar_method.random_sir(50, 2)];
  } else {

    var blue_sir_1 = localStorage.getItem("blue_sir_1");
    var blue_sir_2 = localStorage.getItem("blue_sir_2");
    var blue_sir_3 = localStorage.getItem("blue_sir_3");
    var red_sir_1 = localStorage.getItem("red_sir_1");
    var red_sir_2 = localStorage.getItem("red_sir_2");
    var red_sir_3 = localStorage.getItem("red_sir_3");
    var user_blue_sir = [sirdar_method.create_sir(blue_sir_1), sirdar_method.create_sir(blue_sir_2), sirdar_method.create_sir(blue_sir_3)];
    var user_red_sir = [sirdar_method.create_sir(red_sir_1), sirdar_method.create_sir(red_sir_2), sirdar_method.create_sir(red_sir_3)];
  }

  var user_blue_attacking_sir = -1; //  保存蓝方选择的出战将领
  var user_red_attacking_sir = -1;  //  保存红方选择的出战将领
  var user_blue_attacked_sir = -1; //  保存蓝方锁定的出战将领
  var user_red_attacked_sir = -1;  //  保存红方锁定的出战将领
  var user_blue_sired = user_blue_sir.concat();//保存将领的遗体
  var user_red_sired = user_red_sir.concat();
  var rate_finally;                //  控制战斗的定时刷新
  var Arena_tag;  //  控制战斗进行
  var mydate = new Date();
  // var user_blue = new Array(user_blue_sir_1);
  ///
  //  初始化显示将领
  user_blue_sir.forEach(function (value, index) {
    if (user_blue_sir[index] != "") {
      $('#up_sir_' + (index)).css("display", "block");
      $('#up_sir_' + (index)).find('img').attr("src", user_blue_sir[index].imgsrc);
    }
  });
  user_red_sir.forEach(function (value, index) {
    if (user_red_sir[index] != "") {
      $('#low_sir_' + (index)).css("display", "block");
      $('#low_sir_' + (index)).find('img').attr("src", user_red_sir[index].imgsrc);
    }
  });
  ///
  //  蓝方选择将领卡片
  $('#up_sir').on('click', function (event) {
    var sir_num = event.target.getAttribute("index");
    user_blue_attacking_sir = sir_num;
    var element = $(this).children('.element');
    element.each(function (index, value) {
      if (index == parseInt(sir_num)) {
        $(this).css("border", "2px solid #0c79b1");
      } else {
        $(this).css("border", "1px dashed  rgba(127,255,255,0.25)");
      }
    });
    if (user_blue_sir[sir_num] == null) {
      $('#base_up').text("").text(user_blue_sired[sir_num].region + "-" + user_blue_sired[sir_num].name + "：" + user_blue_sired[sir_num].level);
      $('#attr_up').text("").html("力:" + user_blue_sired[sir_num].stren + "&nbsp速:" + user_blue_sired[sir_num].rate + "&nbsp体:" + user_blue_sired[sir_num].stamina + "（阵亡）");
      $('#effect_up_div').empty();
      for (var i = 0; i < user_blue_sired[sir_num].effect_num; i++) {
        $('#effect_up_div').append('<div>' + user_blue_sired[sir_num].effect_name[i] + '：' + user_blue_sired[sir_num].effect_intr[i] + '</div>');
      }
    } else {
      $('#base_up').text("").text(user_blue_sir[sir_num].region + "-" + user_blue_sir[sir_num].name + "：" + user_blue_sir[sir_num].level);
      $('#attr_up').text("").html("力:" + user_blue_sir[sir_num].stren + "&nbsp速:" + user_blue_sir[sir_num].rate + "&nbsp体:" + user_blue_sir[sir_num].stamina);
      $('#effect_up_div').empty();
      for (var i = 0; i < user_blue_sir[sir_num].effect_num; i++) {
        $('#effect_up_div').append('<div>' + user_blue_sir[sir_num].effect_name[i] + '：' + user_blue_sir[sir_num].effect_intr[i] + '</div>');
      }
    }
  });
  ///
  //  红方选择将领卡片
  $('#low_sir').on('click', function (event) {
    var sir_num = event.target.getAttribute("index");
    user_red_attacking_sir = sir_num;
    var element = $(this).children('.element_low');
    element.each(function (index, value) {
      if (index == parseInt(sir_num)) {
        $(this).css("border", "2px solid #dd514c");
      } else {
        $(this).css("border", "1px dashed  rgba(200,0,0,0.25)");
      }
    });
    if (user_red_sir[sir_num] == null) {
      $('#base_low').text("").text(user_red_sired[sir_num].region + "-" + user_red_sired[sir_num].name + "：" + user_red_sired[sir_num].level);
      $('#attr_low').text("").html("力:" + user_red_sired[sir_num].stren + "&nbsp速:" + user_red_sired[sir_num].rate + "&nbsp体:" + user_red_sired[sir_num].stamina + "（阵亡）");
      $('#effect_low_div').empty();
      for (var i = 0; i < user_red_sired[sir_num].effect_num; i++) {
        $('#effect_low_div').append('<div>' + user_red_sired[sir_num].effect_name[i] + '：' + user_red_sired[sir_num].effect_intr[i] + '</div>');
      }
    } else {
      $('#base_low').text("").text(user_red_sir[sir_num].region + "-" + user_red_sir[sir_num].name + "：" + user_red_sir[sir_num].level);
      $('#attr_low').text("").html("力:" + user_red_sir[sir_num].stren + "&nbsp速:" + user_red_sir[sir_num].rate + "&nbsp体:" + user_red_sir[sir_num].stamina);
      $('#effect_low_div').empty();
      for (var i = 0; i < user_red_sir[sir_num].effect_num; i++) {
        $('#effect_low_div').append('<div>' + user_red_sir[sir_num].effect_name[i] + '：' + user_red_sir[sir_num].effect_intr[i] + '</div>');
      }
    }
  });

  ///
  //  红方选择选择出战按钮
  $('#low_select_sir').on('click', function () {
    if (user_red_attacking_sir == -1) {
      user_red_attacked_sir = user_red_attacking_sir;
      $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：请选择出战“将领”！</div>' + '时间：' + time_now());
      return;
    } else {
      if (user_red_sir[user_red_attacking_sir] == null) {
        $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：选择“将领”不存在，请重新选择！</div>' + '时间：' + time_now());
        return;
      }
      $('#low_sir_' + user_red_attacking_sir).find('img').attr("src", "img/img_sirdar/chuzhan_red.jpg");
      $('#low_sir_attack').css("display", "inline-block");
      $('#low_attack_display').css("display", "block");
      $('#low_sir_attack').find('img').attr("src", user_red_sir[user_red_attacking_sir].imgsrc);
      $(this).addClass("am-disabled");
      $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：选择<' + user_red_sir[user_red_attacking_sir].name + '>出战成功！</div>' + '时间：' + time_now());
      user_red_attacked_sir = user_red_attacking_sir;
    }
    $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：战斗准备完毕！</div>' + '时间：' + time_now());

    ///
    //  电脑选择将领进行战斗准备
    ///
    if (user_blue_attacked_sir == -1) {
      var select_flag = true;
      while (select_flag) {
        user_blue_attacking_sir = Math.floor(Math.random() * 3);
        if (user_blue_sir[user_blue_attacking_sir] == null) {
          // $("#attack_detail_up").before('<div id="attack_detail_up">玩家2：选择“将领”不存在，请重新选择！</div>');
          continue;
        }
        $('#up_sir_' + user_blue_attacking_sir).find('img').attr("src", "img/img_sirdar/chuzhan_blue.jpg");
        $('#up_sir_attack').css("display", "inline-block");
        $('#up_attack_display').css("display", "block");
        $('#up_sir_attack').find('img').attr("src", user_blue_sir[user_blue_attacking_sir].imgsrc);
        $("#attack_detail_up").before('<div id="attack_detail_up">玩家1：选择<' + user_blue_sir[user_blue_attacking_sir].name + '>出战成功！</div>');
        user_blue_attacked_sir = user_blue_attacking_sir;
        break;
        $("#attack_detail_up").before('<div id="attack_detail_up">玩家1：战斗准备完毕！</div>');
      }
    }


    ///
    //  双方准备完毕，开始战斗
    ///
    var place = 3;  //  地形参数
    var timing = 1; //  时间参数

    if (user_blue_attacked_sir != -1 && user_red_attacked_sir != -1) {
      var arenaArr = Arena(user_blue_sir, user_blue_attacking_sir, user_blue_attacked_sir, user_red_sir, user_red_attacking_sir, user_red_attacked_sir, timing, place);
    }
    //  战斗场地
    function Arena(user_blue_sir, blue_attacking_sir, blue_attacked_sir, user_red_sir, red_attacking_sir, red_attacked_sir, timing, place) {
      //解析将领数组
      var obj1, obj2, obj1_1, obj1_2, obj2_1, obj2_2;
      user_blue_sir.forEach(function (value, index) {
        if (index == blue_attacked_sir) obj1 = value;
        else if (obj1_1 == undefined) obj1_1 = value;
        else obj1_2 = value;
      });
      user_red_sir.forEach(function (value, index) {
        if (index == user_red_attacked_sir) obj2 = value;
        else if (obj2_1 == undefined) obj2_1 = value;
        else obj2_2 = value;
      });
      var round_num = 0;
      var time_num = 0;
      var obj1_ack_num = obj1.rate; //  保存玩家1每回合的攻击数
      var obj2_ack_num = obj2.rate; //  保存玩家2每回合的攻击数
      Arena_tag = setInterval(function () {
        if (time_num % 6 == 0) { //  每隔3秒再进行一回合的战斗,每场战斗持续3秒
          round_num++;
          rate_finally = obj1_ack_num > obj2_ack_num ? obj1_ack_num : obj2_ack_num;
          // $("#up_attack_display").html("");
          // $("#low_attack_display").html("");  //  清空动态显示的效果

          $('#retime_head').attr("src", "img/img_common/retime_attack.png"); //  替换倒计时图片
          for (var i = 1; i <= rate_finally; i++) {
            //  效果处理部分，双方将领谁的攻速快谁就先发动效果
            var effect_istrue_up;
            var effect_istrue_low;
            if (obj1.rate >= obj2.rate) {
              effect_istrue_up = obj1.attack(obj2, obj1_1, obj1_2, obj2_1, obj2_2, round_num, i, timing, place);
              effect_istrue_low = obj2.attack(obj1, obj1_1, obj1_2, obj2_1, obj2_2, round_num, i, timing, place);
            } else {
              effect_istrue_low = obj2.attack(obj1, obj1_1, obj1_2, obj2_1, obj2_2, round_num, i, timing, place);
              effect_istrue_up = obj1.attack(obj2, obj1_1, obj1_2, obj2_1, obj2_2, round_num, i, timing, place);
            }
            if (obj1.rate_change > 0 || obj1.rate_change < 0) {
              obj1_ack_num += obj1.rate_change; //  更改下回合及以后的rate属性
              obj1.rate += obj1.rate_change;  //  更改本回合的rate属性
              obj1.rate_change = 0;
            }
            if (obj2.rate_change > 0 || obj2.rate_change < 0) {
              obj2_ack_num += obj2.rate_change;
              obj2.rate += obj2.rate_change;
              obj2.rate_change = 0;
            }
            rate_finally = obj1_ack_num > obj2_ack_num ? obj1_ack_num : obj2_ack_num;  // 更改攻速后重置本回合的循环次数

            if (effect_istrue_up != "") {
              //$("#up_attack_display").append(''+effect_istrue_up+'');
              effect_display("up", effect_istrue_up)
              $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>' + effect_istrue_up + '</div>');

            }
            if (effect_istrue_low != "") {
              //$("#low_attack_display").append(''+effect_istrue_low+'');
              effect_display("low", effect_istrue_low)
              $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>' + effect_istrue_low + '</div>');
            }
            //  显示效果增幅后面的属性
            $("#pivotal_up_stren").text("").text(obj1.stren);
            $("#pivotal_up_rate").text("").text(obj1_ack_num);
            $("#pivotal_up_stamina").text("").text(obj1.stamina);
            $("#pivotal_low_stren").text("").text(obj2.stren);
            $("#pivotal_low_rate").text("").text(obj2_ack_num);
            $("#pivotal_low_stamina").text("").text(obj2.stamina);
            //  对招处理（一招伤害超过15点就将产生一击必杀效果，伤害越高概率越大）
            if (obj1.rate > 0 && obj2.rate > 0) { //  用来判断对招时双方能否出招
              //  体力消耗部分
              obj1.stamina -= obj1.wear;
              obj2.stamina -= obj2.wear;
              obj1.rate -= 1;
              obj2.rate -= 1;
              //  力度差值伤害部分
              var stren_diff = Math.abs(obj2.stren - obj1.stren);
              var stren_diff_gg = false;  //判断是否触发必杀
              if (stren_diff >= 15) {
                var dice = Math.round(stren_diff / 5 + Math.random() * 13);
                if (dice < (stren_diff - 8)) {
                  stren_diff_gg = true;
                }
              }
              if (obj1.stren < obj2.stren) {
                if (stren_diff_gg) {
                  hurt_display("up", -obj1.stamina);
                  obj1.stamina = 0;
                  $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>挥出第' + i + '击：体力-' + obj1.wear + ',远不敌对手：体力-' + stren_diff + '，失手阵亡。</div>');
                  $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>挥出第' + i + '击：体力-' + obj2.wear + ',全面压制，秒杀对手。' + '</div>');
                } else {
                  hurt_display("up", -stren_diff);
                  obj1.stamina -= stren_diff;
                  $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>挥出第' + i + '击：体力-' + obj1.wear + ',受到对方重击：体力-' + stren_diff + '</div>');
                  $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>挥出第' + i + '击：体力-' + obj2.wear + ',略占上风。' + '</div>');
                }
              } else if (obj1.stren > obj2.stren) {
                if (stren_diff_gg) {
                  hurt_display("low", -obj2.stamina);
                  obj2.stamina = 0;
                  $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>挥出第' + i + '击：体力-' + obj1.wear + ',全面压制，秒杀对手。' + '</div>');
                  $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>挥出第' + i + '击：体力-' + obj2.wear + ',远不敌对手：体力-' + stren_diff + '，失手阵亡。</div>');
                } else {
                  hurt_display("low", -stren_diff);
                  obj2.stamina -= stren_diff;
                  $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>挥出第' + i + '击：体力-' + obj1.wear + ',略占上风。' + '</div>');
                  $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>挥出第' + i + '击：体力-' + obj2.wear + ',受到对方重击：体力-' + stren_diff + '</div>');
                }
              } else {
                hurt_display("up", "miss");
                $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>挥出第' + i + '击：体力-' + obj1.wear + ',与对方势均力敌！</div>');
                hurt_display("low", "miss");
                $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>挥出第' + i + '击：体力-' + obj2.wear + ',与对方势均力敌！</div>');
              }
            } else if (obj1.rate > 0 && obj2.rate <= 0) {
              //  体力消耗部分
              obj1.stamina -= obj1.wear;
              obj1.rate -= 1;
              //  力度差值伤害部分
              var stren_diff = Math.abs(obj1.stren);
              var stren_diff_gg = false;  //判断是否触发必杀
              if (stren_diff >= 15) {
                var dice = Math.round(stren_diff / 5 + Math.random() * 13);
                if (dice < (stren_diff - 9)) {
                  stren_diff_gg = true;
                }
              }
              if (stren_diff_gg) {
                hurt_display("low", -obj2.stamina);
                obj2.stamina = 0;
                $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>挥出第' + i + '击：体力-' + obj1.wear + ',全面压制，秒杀对手。' + '</div>');
                $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>招式用老，无法挥击,远不敌对手：体力-' + stren_diff + '，失手阵亡。</div>');
              } else {
                hurt_display("low", -stren_diff);
                obj2.stamina -= stren_diff;
                $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>挥出第' + i + '击：体力-' + obj1.wear + ',略占上风。' + '</div>');
                $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>招式用老，无法挥击,受到对方重击：体力-' + stren_diff + '</div>');
              }
            } else if (obj1.rate <= 0 && obj2.rate > 0) {
              //  体力消耗部分
              obj2.stamina -= obj2.wear;
              obj2.rate -= 1;
              //  力度差值伤害部分
              var stren_diff = Math.abs(obj2.stren);
              var stren_diff_gg = false;  //判断是否触发必杀
              if (stren_diff >= 15) {
                var dice = Math.round(stren_diff / 5 + Math.random() * 13);
                if (dice < (stren_diff - 8)) {
                  stren_diff_gg = true;
                }
              }
              if (stren_diff_gg) {
                hurt_display("up", -obj1.stamina);
                obj1.stamina = 0;
                $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>招式用老，无法挥击,远不敌对手：体力-' + stren_diff + '，失手阵亡。</div>');
                $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>挥出第' + i + '击：体力-' + obj2.wear + ',全面压制，秒杀对手。' + '</div>');
              } else {
                hurt_display("up", -stren_diff);
                obj1.stamina -= stren_diff;
                $("#attack_detail_up").before('<div id="attack_detail_up"><' + obj1.name + '>招式用老，无法挥击,受到对方重击：体力-' + stren_diff + '</div>');
                $("#attack_detail_low").before('<div id="attack_detail_low"><' + obj2.name + '>挥出第' + i + '击：体力-' + obj2.wear + ',略占上风。' + '</div>');
              }
            }

            //  显示决胜负的血量
            $("#pivotal_up_stamina").text("").text(obj1.stamina);
            $("#pivotal_low_stamina").text("").text(obj2.stamina);
            //  区分胜负部分
            if (obj1.stamina <= 0 || obj2.stamina <= 0) {

              obj1.rate = obj1_ack_num; //  初始化玩家1下回合开始的攻击数
              obj2.rate = obj2_ack_num; //  初始化玩家2下回合开始的攻击数
              if (obj1.stamina <= 0 && obj2.stamina > 0) {
                $("#attack_detail_up").before('<div id="attack_detail_up">己方<' + obj1.name + '>阵亡！本次战斗' + round_num + '回合</div>' + '时间：' + time_now());
                $("#attack_detail_low").before('<div id="attack_detail_low">己方<' + obj2.name + '>胜利！剩余体力：' + obj2.stamina + '本次战斗' + round_num + '回合</div>' + '时间：' + time_now());

                //  将领阵亡处理页面变化处理
                $('#up_sir_' + user_blue_attacked_sir).find('img').attr("src", "img/img_sirdar/die_blue.jpg");
                $('#up_sir_attack').css("display", "none");
                // $('#up_attack_display').css("display","none");
                user_blue_sir[user_blue_attacked_sir] = null;
                user_blue_attacked_sir = -1;
                if (user_blue_sir[0] == null && user_blue_sir[1] == null && user_blue_sir[2] == null) {
                  alert("蓝方战败！");
                }
                $('#low_retreat_sir').click();  //红方战胜后，默认进行一次战术回防
              } else if (obj2.stamina <= 0 && obj1.stamina > 0) {
                $("#attack_detail_up").before('<div id="attack_detail_up">己方<' + obj1.name + '>胜利！剩余体力：' + obj1.stamina + '本次战斗' + round_num + '回合</div>' + '时间：' + time_now());
                $("#attack_detail_low").before('<div id="attack_detail_low">己方<' + obj2.name + '>阵亡！本次战斗' + round_num + '回合</div>' + '时间：' + time_now());

                //  将领阵亡处理页面变化处理
                $('#low_sir_' + user_red_attacked_sir).find('img').attr("src", "img/img_sirdar/die_red.jpg");
                $('#low_sir_attack').css("display", "none");
                // $('#low_attack_display').css("display","none");
                user_red_sir[user_red_attacked_sir] = null;
                user_red_attacked_sir = -1;
                if (user_red_sir[0] == null && user_red_sir[1] == null && user_red_sir[2] == null) {
                  alert("红方战败！");
                }
                $('#low_select_sir').removeClass("am-disabled");
                if (obj1.stamina > 0);
                $('#up_retreat_sir').click();  //蓝方战胜后，默认进行一次战术回防
              } else {
                $("#attack_detail_up").before('<div id="attack_detail_up">己方<' + obj1.name + '>与对手同归于尽！本次战斗' + round_num + '回合</div>' + '时间：' + time_now());
                $("#attack_detail_low").before('<div id="attack_detail_low">己方<' + obj2.name + '>与对手同归于尽！本次战斗' + round_num + '回合</div>' + '时间：' + time_now());

                //  将领阵亡处理页面变化处理

                $('#up_sir_' + user_blue_attacked_sir).find('img').attr("src", "img/img_sirdar/die_blue.jpg");
                $('#up_sir_attack').css("display", "none");
                // $('#up_attack_display').css("display","none");
                user_blue_sir[user_blue_attacked_sir] = null;
                user_blue_attacked_sir = -1;

                $('#low_sir_' + user_red_attacked_sir).find('img').attr("src", "img/img_sirdar/die_red.jpg");
                $('#low_sir_attack').css("display", "none");
                // $('#low_attack_display').css("display","none");
                user_red_sir[user_red_attacked_sir] = null;
                user_red_attacked_sir = -1;
                if (user_red_sir[0] == null && user_red_sir[1] == null && user_red_sir[2] == null && user_blue_sir[0] == null && user_blue_sir[1] == null && user_blue_sir[2] == null) {
                  alert("平局！");
                }
                $('#low_select_sir').removeClass("am-disabled");
              }
              //  获胜方奖励部分
              if (obj1.stamina > 0) {
                obj1.victory(round_num, timing, place);
              } else if (obj2.stamina > 0) {
                obj2.victory(round_num, timing, place);
              }
              clearInterval(Arena_tag); //  终止循环
              break;
            } //  区分胜负部分反括号
          } //  每回合的循环反括号

          $("#attack_detail_up").before('<div id="attack_detail_up">时间：' + time_now() + '</div>');  //  显示时间
          $("#attack_detail_low").before('<div id="attack_detail_low">时间：' + time_now() + '</div>');
        } else if (time_num % 6 > 1) {
          var time_num_re = 5 - time_num % 6;
          var $retime_display = $('#retime_display');
          if (time_num_re == 3) {
            $retime_display.slideDown();
            $('#retime_head').attr("src", "img/img_common/retime_head.png"); //  替换倒计时图片
          }
          if (time_num_re == 0) $retime_display.slideUp();
          else $retime_display.find('img').attr("src", "img/img_common/retime_" + time_num_re + ".png");
          // $("#attack_detail_up").before('<div id="attack_detail_up">下回合战斗倒计时：'+time_num_re+'</div>');
          // $("#attack_detail_low").before('<div id="attack_detail_low">下回合战斗倒计时：'+time_num_re+'</div>');
        }

        time_num++;
        obj1.rate = obj1_ack_num; //  初始化玩家1下回合开始的攻击数
        obj2.rate = obj2_ack_num; //  初始化玩家2下回合开始的攻击数
      }, 1000); //  延时循环反括号
    }

  });

  ///
  //  蓝方选择战术回防按钮
  $('#up_retreat_sir').on('click', function () {
    if (user_blue_attacked_sir == -1) {
      $("#attack_detail_up").before('<div id="attack_detail_up">玩家1：没有出战“将领”！</div>' + '时间：' + time_now());
      return;
    } else {
      $('#up_sir_' + user_blue_attacked_sir).find('img').attr("src", user_blue_sir[user_blue_attacked_sir].imgsrc);
      $('#up_sir_attack').css("display", "none");
      // $('#up_attack_display').css("display","none");
      // $('#up_sir_attack').find('img').attr("src",user_blue_sir_1.imgsrc);
      $('#up_select_sir').removeClass("am-disabled");
      $("#attack_detail_up").before('<div id="attack_detail_up">玩家1：<' + user_blue_sir[user_blue_attacked_sir].name + '>回防成功！</div>' + '时间：' + time_now());
      $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：对手开始回防！</div>' + '时间：' + time_now());
      user_blue_attacked_sir = -1;
    }
    $('#retime_display').slideUp();  //  收起倒计时
    $('#retime_head').attr("src", "img/img_common/retime_wait.png"); //  替换倒计时图片
    clearInterval(Arena_tag);
    $("#attack_detail_up").before('<div id="attack_detail_up">玩家1：开启战斗准备模式！</div>' + '时间：' + time_now());

  });

  ///
  //  红方选择战术回防按钮
  $('#low_retreat_sir').on('click', function () {
    if (user_red_attacked_sir == -1) {
      $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：没有出战“将领”！</div>' + '时间：' + time_now());
      return;
    } else {
      $('#low_sir_' + user_red_attacked_sir).find('img').attr("src", user_red_sir[user_red_attacked_sir].imgsrc);
      $('#low_sir_attack').css("display", "none");
      // $('#low_attack_display').css("display","none");
      // $('#low_sir_attack').find('img').attr("src",user_red_sir_1.imgsrc);
      $('#low_select_sir').removeClass("am-disabled");
      $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：<' + user_red_sir[user_red_attacked_sir].name + '>回防成功！</div>' + '时间：' + time_now());
      $("#attack_detail_up").before('<div id="attack_detail_up">玩家1：对手开始回防！</div>' + '时间：' + time_now());
      user_red_attacked_sir = -1;
    }
    $('#retime_display').slideUp();  //  收起倒计时
    $('#retime_head').attr("src", "img/img_common/retime_wait.png"); //  替换倒计时图片
    clearInterval(Arena_tag);
    $("#attack_detail_low").before('<div id="attack_detail_low">玩家2：开启战斗准备模式！</div>' + '时间：' + time_now());

  });

});
///
//  伤害飘字特效js
///
function hurt_display(role, num) {
  var x = Math.round(15 + Math.random() * 70);
  var y = Math.round(15 + Math.random() * 70);
  var $i = $("<b>").text(num);  //  添加到页面的元素
  $i.css({
    "z-index": 99999,
    "top": y + "%",
    "left": x + "%",
    "position": "absolute",
    "color": "red"
  });
  if (role == "up") $("#up_sir_attack").append($i);
  if (role == "low") $("#low_sir_attack").append($i);
  $i.animate(
    { "top": y - 30 + "%", "opacity": 0 },
    3000,
    function () { $i.remove(); }
  );
}
///
//  效果飘字特效js
///
function effect_display(role, effect) {
  var x = 0;
  var y = 5;
  var $i = $("<div>").html(effect);  //  添加到页面的元素
  $i.css({
    "z-index": 99999,
    "left": x + "%",
    "top": y + "%",
    "position": "relative",
    "opacity": 0.1,
  });
  if (role == "up") $("#up_attack_display").append($i);
  if (role == "low") $("#low_attack_display").append($i);
  $i.animate(
    { "top": y - 5 + "%", "opacity": 1 },
    500
  );
  $i.animate(
    { "top": y + 10 + "%", "opacity": 0 },
    4000,
    function () { $i.remove(); }
  );
}
///
//  撤离战场
///
function evacuate() {
  window.location.href = "index.html";
}
