$(function () {
	var arr_sir_all = [];
	arr_sir_all.push({ name: "Xu_Chu", value: "许褚" });
	arr_sir_all.push({ name: "Ma_Chao", value: "马超" });
	arr_sir_all.push({ name: "Huang_Zhong", value: "黄忠" });
	arr_sir_all.push({ name: "Guan_Yu", value: "关羽" });
	arr_sir_all.push({ name: "Zhang_Fei", value: "张飞" });
	arr_sir_all.push({ name: "Zhao_Yun", value: "赵云" });
	arr_sir_all.push({ name: "Dian_Wei", value: "典韦" });
	arr_sir_all.push({ name: "Xia_Hou_Dun", value: "夏侯惇" });
	arr_sir_all.push({ name: "Hua_Xiong", value: "黄忠" });
	arr_sir_all.push({ name: "Gong_Sun_Zan", value: "公孙瓒" });
	arr_sir_all.push({ name: "Zhou_Cang", value: "周仓" });
	arr_sir_all.push({ name: "Pei_Yuan_Shao", value: "裴元绍" });
	for (var i = 0; i < arr_sir_all.length; i++) {
		document.getElementById('oc-blue-select-1').options[i] = new Option(arr_sir_all[i].value, arr_sir_all[i].name);
		document.getElementById('oc-blue-select-2').options[i] = new Option(arr_sir_all[i].value, arr_sir_all[i].name);
		document.getElementById('oc-blue-select-3').options[i] = new Option(arr_sir_all[i].value, arr_sir_all[i].name);
		document.getElementById('oc-red-select-1').options[i] = new Option(arr_sir_all[i].value, arr_sir_all[i].name);
		document.getElementById('oc-red-select-2').options[i] = new Option(arr_sir_all[i].value, arr_sir_all[i].name);
		document.getElementById('oc-red-select-3').options[i] = new Option(arr_sir_all[i].value, arr_sir_all[i].name);
	}
})
function fighting() {
	var blue_sir_1 = document.getElementById('oc-blue-select-1').value;
	var blue_sir_2 = document.getElementById('oc-blue-select-2').value;
	var blue_sir_3 = document.getElementById('oc-blue-select-3').value;
	var red_sir_1 = document.getElementById('oc-red-select-1').value;
	var red_sir_2 = document.getElementById('oc-red-select-2').value;
	var red_sir_3 = document.getElementById('oc-red-select-3').value;
	localStorage.setItem("blue_sir_1", blue_sir_1);
	localStorage.setItem("blue_sir_2", blue_sir_2);
	localStorage.setItem("blue_sir_3", blue_sir_3);
	localStorage.setItem("red_sir_1", red_sir_1);
	localStorage.setItem("red_sir_2", red_sir_2);
	localStorage.setItem("red_sir_3", red_sir_3);
	localStorage.setItem("random_sir", false);
	window.location.href = "arena.html";
}
function randomSir() {
	localStorage.setItem("random_sir", true);
	window.location.href = "arena.html";
}
function chooseSir() {
	$("#select-btn").css("margin-top", "10px");
	$("#chooseDiv").css("display", "block");
}
