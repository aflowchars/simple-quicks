/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		chat_data: [
			{
				id: 1,
				chat_type: 'person',
				title: '109220-Naturalization',
				time_date: '01/01/2021 19:10',
				full_name: 'Cameron Phillips',
				text_content: 'Please check this out!',
				is_readed: false
			},
			{
				id: 2,
				chat_type: 'person',
				title:
					'Jeannete Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]',
				time_date: '02/06/2021 10:45',
				full_name: 'Ellen',
				text_content: 'Hey, please read.',
				is_readed: true
			},
			{
				id: 3,
				chat_type: 'person',
				title: '8405-Diana SALAZAR MUNGUI',
				time_date: '01/06/2021 12:19',
				full_name: 'Cameron Phillips',
				text_content:
					'I understand your initial concerns and thats very valid, Elizabeth. But you ignore it',
				is_readed: true
			},
			{
				id: 4,
				chat_type: 'customer_service',
				title: 'FastVisa Support',
				time_date: '01/06/2021 12:19',
				text_content: 'Hey there! Welcome to your inbox.',
				is_readed: true
			}
		],
		chat_customer_service: [
			{
				id: 1,
				align: 'start',
				variant: 'cs-in',
				date_time: '19:32',
				full_name: 'FastVisa Support',
				text_content: `Hey there. Welcome to your inbox! Contact us for more information and help about anything! We'll send you a response as soon as possible.`
			},
			{
				id: 2,
				align: 'end',
				variant: 'cs-out',
				date_time: '19:32',
				full_name: 'You',
				text_content: `Hi, I need help with something.. can you help me?`
			}
		],
		chat_user_conversation: {
			'Yesterday June 08, 2021': [
				{
					id: 1,
					align: 'start',
					variant: 'uc-in-1',
					date_time: '19:32',
					full_name: 'Mary Hilda',
					text_content: `Just fill me in for for his update yea?`
				},
				{
					id: 2,
					align: 'end',
					variant: 'uc-out',
					date_time: '19:32',
					full_name: 'You',
					text_content: `No worries. It will be completed ASAP. I've asked him yesterday.`
				}
			],
			'Today June 09, 2021': [
				{
					id: 3,
					align: 'start',
					variant: 'uc-in-1',
					date_time: '19:32',
					full_name: 'Mary Hilda',
					text_content: `Hello Obaidullah, I will be your case advisor for case #029290. I have asiggned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks`
				},
				{
					id: 4,
					align: 'end',
					variant: 'uc-out',
					date_time: '19:32',
					full_name: 'You',
					text_content: `Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.`
				},
				{
					id: 5,
					align: 'start',
					variant: 'uc-in-1',
					date_time: '19:32',
					full_name: 'Mary Hilda',
					text_content: `Sure thing, Claren.`
				}
			],
			'New Message': [
				{
					id: 6,
					align: 'start',
					variant: 'uc-in-2',
					date_time: '19:32',
					full_name: 'Obaidullah Amarkhil',
					text_content: `Morning. I'll try to do them. Thanks`
				}
			]
		},
		task_list: [
			{
				id: 1,
				is_checked: false,
				title: 'Cross-reference with Jeanne for Case #192813',
				due_date: '2 Days Left',
				created_at: '2021-06-12',
				description: ''
			},
			{
				id: 2,
				is_checked: true,
				title: 'Contact Andrew for Online Meeting and Conference',
				due_date: '',
				created_at: '2021-06-03',
				description: ''
			},
			{
				id: 3,
				is_checked: true,
				title: 'Check and Revise Homework from Andre Gonzales',
				due_date: '',
				created_at: '2021-06-11',
				description:
					'Homeworks needed to be checked are as follows: Client Profile Questionnare, Passport Requirements and Images, Personal Documents.'
			}
		]
	};
}
