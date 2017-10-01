import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	if(Todos.find().count() === 0) {
		var todos = [
			{
				'text': 'learn onsen',
				'picture': 'https://unsplash.it/100/100',
				'owner': 'Luca',
				'createdAt': new Date(),
				'finished': false
			},
			{
				'text': 'other stuff',
				'picture': 'https://unsplash.it/100/100',
				'owner': 'Luca',
				'createdAt': new Date(),
				'finished': false
			},
			{
				'text': 'randomshit',
				'picture': 'https://unsplash.it/100/100',
				'owner': 'Jonathan',
				'createdAt': new Date(),
				'finished': false
			}
		];
		todos.forEach(todo => {
			Todos.insert(todo);
		})
	}
});
