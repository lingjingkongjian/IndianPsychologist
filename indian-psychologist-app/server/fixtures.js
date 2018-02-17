

function doUserFixtures(){
    console.log('doing user fixtures');
    var users = [
        {
            'email': 'bertha@doctor.com',
            'password': 'bertha',
            'profile': {
                'name': 'Bertha',
                'isDoctor': true,
                'avatar': 'https://i.imgur.com/aybWVmc.png',
                'age': 52,
                'location': 'Mumbai',
                'specialities': 'General Health, Depression, Feel Good Lessions',
                'additionalInfo': 'I am the best doctor ever...'
            },
            'status': {
                'online': false,
            }
        },
        {
            'email': 'wilhelm@doctor.com',
            'password': 'wilhelm',
            'profile': {
                'name': 'Wilhelm',
                'isDoctor': true,
                'avatar': 'https://i.imgur.com/8n9gXqY.jpg',
                'age': 28,
                'location': 'Mumbai',
                'specialities': 'Brain Care, Mood Enhancer Therapy',
                'additionalInfo': 'Your Brains are in good hands with me'
            },
            'status': {
                'online': false,
            }
        },
        {
            'email': 'wilhelm@doctor.com',
            'password': 'peter',
            'profile': {
                'name': 'Peter',
                'isDoctor': true,
                'avatar': 'https://i.imgur.com/8n9gXqY.jpg',
                'age': 28,
                'location': 'Mumbai',
                'specialities': 'Brain Care, Mood Enhancer Therapy',
                'additionalInfo': 'Your Brains are in good hands with me'
            },
            'status': {
                'online': false,
            }
        },
    ];
    users.forEach(function(user){
        Accounts.createUser(user);
    });
}

Meteor.startup(() => {
	console.log(Users.find().count()+" ?");
    if(Users.find().count() <= 1) {
    	console.log("creating fixtures");
        doUserFixtures();
    }
})
