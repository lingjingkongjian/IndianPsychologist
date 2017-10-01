

function doUserFixtures(){
	console.log('doing user fixtures');
	var users = [
		{
			'username': 'Bertha',
			'email': 'bertha@doctor.com',
			'password': 'bertha',
			'profile': {
				'public': {
					'isDoctor': true,
					'avatar': 'https://i.imgur.com/aybWVmc.png',
					'age': 52,
					'specialities': ['General Health', 'Depression', 'Feel Good Lessions'],
					'additionalInfo': 'I am the best doctor ever...',
				},
				'private': {

				}
			}
		},
		{
			'username': 'Wilhelm',
			'email': 'wilhelm@doctor.com',
			'password': 'wilhelm',
			'profile': {
				'public': {
					'isDoctor': true,
					'avatar': 'https://i.imgur.com/8n9gXqY.jpg',
					'age': 28,
					'specialities': ['Brain Care', 'Mood Enhancer Therapy'],
					'additionalInfo': 'Your Brains are in good hands with me',
				},
				'private': {
					
				}
			}
		},
	];
	users.forEach(function(user){
		Accounts.createUser(user);
	});
}

Meteor.startup(() => {
	if(Users.find().count() === 0) {
		doUserFixtures();
	}
})