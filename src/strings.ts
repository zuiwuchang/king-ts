// 返回 str 是否是 ipv4 xxx.xxx.xxx.xxx
export function IsIPv4(ip: string): boolean {
	if (!ip) {
		return false;
	}
	if (typeof (ip) != "string") {
		return false;
	}

	var isRange = function (str: string) {
		if (str.length == 2 && str[0] == "0") {
			return false;
		} else if (str.length == 3) {
			if (str[0] == "0") {
				return false;
			}
			return parseInt(str) < 256;
		}
		return true;
	};
	if (/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip)) {
		var arrs = [RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4];
		return isRange(arrs[0]) && isRange(arrs[1]) && isRange(arrs[2]) && isRange(arrs[3]);
	}
	return false;
};


export enum MatchGMailRS {
	//匹配 成功
	Success,

	//匹配 用戶名@主機名
	SplitLess, //沒有以 @ 分隔 用戶名 主機名
	SplitLarge,	//出現 多個 @

	//匹配用戶名
	LenLess, 	//用戶名太短
	LenLarge, 	//用戶名太長
	BadBegin,	//驗證用戶名 開始
	BadEnd,		//驗證用戶名 結尾
	PointLink,	//多個 . 相連

	//匹配主機名
	BadHost,
}
// 用戶名 長度 定義
const gmailMinLen = 6;
const gmailMaxLen = 30;
const gmailRegexBegin = /^[a-zA-Z0-9]/;
const gmailRegexEnd = /[a-zA-Z0-9]$/;
//matchUser
function gmailMatchUser(user: string): MatchGMailRS {
	if (user.length < gmailMinLen) {
		return MatchGMailRS.LenLess;
	} else if (user.length > gmailMaxLen) {
		return MatchGMailRS.LenLarge;
	}
	if (!gmailRegexBegin.test(user)) {
		return MatchGMailRS.BadBegin;
	}
	if (!gmailRegexEnd.test(user)) {
		return MatchGMailRS.BadEnd;
	}
	if (user.indexOf("..") != -1) {
		return MatchGMailRS.PointLink;
	}
	//字符長度
	var len = user.length;
	for (var i = 0; i < user.length; i++) {
		if (user[i] == ".") {
			--len;
		}
	}
	if (len < gmailMinLen) {
		return MatchGMailRS.LenLess;
	}
	return MatchGMailRS.Success;
};
const gmailRegexHostName = /^[a-zA-Z0-9\-_][a-zA-Z0-9\-_\.]*\.[a-zA-Z0-9]{2,}$/;
function gmailMatchHost(name: string): MatchGMailRS {
	if (!gmailRegexHostName.test(name)) {
		return MatchGMailRS.BadHost;
	}
	if (name.indexOf("..") != -1) {
		return MatchGMailRS.BadHost;
	}
	return MatchGMailRS.Success;
};
/*
	驗證 字符串是否符合 gmail 格式 要求

	用戶名@主機名
	用戶名
		字符[a-zA-Z0-9]長度爲 [6,30] 
		以 [a-zA-Z0-9] 開始 結束
		中間只能是 [a-zA-Z0-9\.] 且 . 和 . 不能相連
	域名
		以 .[a-zA-Z]{2,} 結尾
		不能以 . 開頭 且 . 不能相連
		由 [a-zA-Z0-9\-_\.]組成
*/
export function MatchGMail(str: string): MatchGMailRS {
	//matchSplite
	var strs = str.split("@");
	var len = strs.length;
	if (len < 2) {
		return MatchGMailRS.SplitLess;
	} else if (len > 2) {
		return MatchGMailRS.SplitLarge;
	} else if (strs[0] == "" || strs[1] == "") {
		return MatchGMailRS.SplitLess;
	}

	var rs = gmailMatchUser(strs[0]);
	if (rs != MatchGMailRS.Success) {
		return rs;
	}
	return gmailMatchHost(strs[1]);
}

//將字符串中的 html 保留字 轉義
export function HtmlEncode(str: string): string {
	if (!str || str.length == 0) {
		return "";
	}
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/ /g, "&nbsp;");
	str = str.replace(/\'/g, "&#39;");
	str = str.replace(/\"/g, "&quot;");
	return str;
};
//將 HtmlEncode 解碼
export function HtmlDecode(str: string): string {
	if (!str || str.length == 0) {
		return "";
	}
	str = str.replace(/&amp;/g, "&");
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&nbsp;/g, " ");
	str = str.replace(/&#39;/g, "\'");
	str = str.replace(/&quot;/g, "\"");
	return str;
};

/*
	將日期 Date 轉化爲指定格式的 字符串

	fmt yyyy-mm-dd HH:MM:SS
*/
export function FormatDate(d: Date, fmt: string): string {
	const o = [
		{
			l:"m+",
			r:(d.getMonth() + 1).toString(), //月
		},
		{
			l:"d+",
			r:d.getDate().toString() , //日
		},
		{
			l:"H+",
			r:d.getHours().toString(), //小時
		},
		{
			l:"M+",
			r:d.getMinutes().toString(), //分
		},
		{
			l:"S+",
			r:d.getSeconds().toString(), //秒
		},
	]

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1,
			(d.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	}
	for (let i=0;i<o.length;i++) {
		let node = o[i];
		if (new RegExp("(" + node.l + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1,
				(RegExp.$1.length == 1) ? (node.r) : (("00" + node.r).substr(("" + node.r).length))
			);
		}
	}
	return fmt;
};