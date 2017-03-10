module.exports.index = function(req, res) {
	res.render('index', {title: 'Express'});
};

module.exports.postEvent = function(req, res) {
    res.render('postLayout', {title: 'Post Event'});
};

module.exports.eventList = function(req, res) {
    res.render('eventLayout', {title: 'Browse local events near you.'});
};

module.exports.contact = function(req, res) {
    res.render('contactLayout', {title: 'Send us a message.'});
};

module.exports.eventDetail = function(req, res) {
    res.render('eventDetail', {title: 'Details for your event.'});
};

// module.exports.eventList = function(req, res) {
//     res.render('eventLayout', {
//         title: 'Browse local events near you.',
//         pageHeader: {
//             title: 'Arts in Town',
//             strapline: 'Browse local art and music events near you!'
//         },
//         sidebar: "Google Map HERE",
//         events: [{
//             date: 'Friday, February 24',
//             time: '8:00 PM',
//             event_name: 'Local Poets Reading',
//             venue: "Cute Cafe",
//             address: '125 High Street, Oakland, CA 94608',
//             cost: '$10'
//         }, {
//             date: 'Saturday, March 5',
//             time: '8:00 PM',
//             event_name: 'Noise Indie Festival',
//             venue: "Treasure Island",
//             address: '123 Main Street, Oakland, CA 94608',
//             cost: '$20'
//         }, {
//             date: 'Friday, February 24',
//             time: '8:00 PM',
//             event_name: 'Local Poets Reading',
//             venue: "Cute Cafe",
//             address: '125 High Street, Oakland, CA 94608',
//             cost: '$FREE'
//         }, {
//             date: 'Saturday, March 4',
//             time: '8:00 PM',
//             event_name: 'DJ Bluntz + Artists',
//             venue: "Pawnee Commons",
//             address: '125 High Street, San Francisco, CA 94500',
//             cost: '$15'
//         }, {
//             date: 'Sunday, March 5',
//             time: '2:00 PM',
//             event_name: 'Small Gallery Opening',
//             venue: "Cute Gallery",
//             address: '122 Dwight Street, Berkeley, CA 94608',
//             cost: '$10'
//         }]
//     });
// };
