const pair = {
	strategy :{
		ko: "전략"
	},
	operation: {
		ko: "운영"
	},
	product: {
		ko: "제품"
	},
	personal: {
		ko: "개인"
	},
	na: {
		ko: "미분류"
	}
};

export const map =(word, lang='ko') => {
	return pair[word][lang];
}