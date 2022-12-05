export const getParsingRule = (organization) => {
	switch(organization) {
		case "poc":
			return {
				pos: {
					title: 1,
					date: 35,
					log: 12,
					meeting_date: new Date().getTime(),
					user_name: "poc_user",
					user_id: "poc_user",
					account_name: "poc_account",
					account_id: "poc_account"
				}
			};
			break;
		case "lsmetal":

			break;
		case "hansolhomedeco":
			/**
			 COLUMN | B(2) ... | AJ(35) ... | M(12) ... | AI(34)  ...   |  CD(17) ...
			 entity | title    | date       | log       | user_name     | account_name
			**/
			return { 
				pos: {
					title: 2,
					date: 35,
					log: 12,
					user_name: 34,
					account_name: 17,				
				}
			};
			break;
		case "theklab":
			return { 
				pos: {
					title: 2,
					date: 35,
					log: 12,
					user_name: 34,
					account_name: 17,				
				}
			};
			break;
	}
}