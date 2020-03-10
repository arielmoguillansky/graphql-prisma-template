let authors = [{
	id: '1',
	authorname: 'Ariel',
	email: 'a@a.com',
	password: 'a123',
},
{
	id: '2',
	authorname: 'Alfredo',
	email: 'a@a.com',
	password: 'a123',
},
{
	id: '3',
	authorname: 'Lau',
	email: 'a@a.com',
	password: 'a123',
},
]

let products = [{
	id: '1',
	productname: 'Nua',
	releaseYear: 2014,
	inSotck: false,
	price: 12.3,
	author: '1',
	published: true
},
{
	id: '2',
	productname: 'Nave espacial',
	releaseYear: 2016,
	inSotck: false,
	price: 12.3,
	author: '1',
	published: true
},
{
	id: '3',
	productname: 'Pase system',
	releaseYear: 2018,
	inSotck: true,
	price: 540,
	desc: "Eiusmod ullamco culpa cillum exercitation dolor mollit est occaecat dolor aliqua. Sint nostrud laboris sit occaecat labore sint pariatur exercitation elit nostrud cupidatat enim proident aliqua. Consequat elit ipsum dolor culpa.",
	author: '3',
	published: true
},
]

let comments = [{
	id: '1',
	body: 'Laborum nulla aliqua reprehenderit sint aute nostrud dolor sunt. Enim in magna mollit qui eiusmod quis duis consequat dolore minim. Magna cillum in cillum cupidatat mollit excepteur proident aute aliqua pariatur aliquip duis laboris. Irure deserunt culpa nisi non. Proident qui cillum culpa eiusmod aliquip do qui. Et consectetur fugiat officia magna incididunt Lorem id ea.',
	author: '1',
	product: '1'
},
{
	id: '2',
	body: 'Laborum nulla aliqua reprehenderit sint aute nostrud dolor sunt. Enim in magna mollit qui eiusmod quis duis consequat dolore minim. Magna cillum in cillum cupidatat mollit excepteur proident aute aliqua pariatur aliquip duis laboris. Irure deserunt culpa nisi non. Proident qui cillum culpa eiusmod aliquip do qui. Et consectetur fugiat officia magna incididunt Lorem id ea.',
	author: '3',
	product: '3'
},
{
	id: '3',
	body: 'Laborum nulla aliqua reprehenderit sint aute nostrud dolor sunt. Enim in magna mollit qui eiusmod quis duis consequat dolore minim. Magna cillum in cillum cupidatat mollit excepteur proident aute aliqua pariatur aliquip duis laboris. Irure deserunt culpa nisi non. Proident qui cillum culpa eiusmod aliquip do qui. Et consectetur fugiat officia magna incididunt Lorem id ea.',
	author: '3',
	product: '3'
},
{
	id: '4',
	body: 'Laborum nulla aliqua reprehenderit sint aute nostrud dolor sunt. Enim in magna mollit qui eiusmod quis duis consequat dolore minim. Magna cillum in cillum cupidatat mollit excepteur proident aute aliqua pariatur aliquip duis laboris. Irure deserunt culpa nisi non. Proident qui cillum culpa eiusmod aliquip do qui. Et consectetur fugiat officia magna incididunt Lorem id ea.',
	author: '3',
	product: '3'
}]

const db = {
	authors,
	products,
	comments
}
export { db as default };