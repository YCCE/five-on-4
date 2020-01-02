
export const users = [
    {
        user_id: 1,
        user_name: "karlo",
        user_email: "karlo@gmail.com",
        user_password: "karlo"
    },    
    {
        user_id: 2,
        user_name: "ivan",
        user_email: "ivan@gmail.com",
        user_password: "ivan"
    },
]

export const matches_static = [
    {
        match_id: 1,
        match_name: "finished 5-a-side",
        date_start: "2020-01-01T14:30",
        date_end: "2020-01-01T16:00",
        venue: "the school pitch",
    },
    {
        match_id: 2,
        match_name: "upcoming 5-a-side",
        date_start: "2020-01-03T14:30",
        date_end: "2020-01-03T16:00",
        venue: "the school pitch",
    },
    {
        match_id: 3,
        match_name: "now 5-a-side",
        date_start: "2020-01-02T09:30",
        date_end: "2020-01-02T21:00",
        venue: "the school pitch",
    },
    {
        match_id: 4,
        match_name: "finished 2 5-a-side",
        date_start: "2020-01-01T14:30",
        date_end: "2020-01-01T15:30",
        venue: "the school pitch",
    },
    {
        match_id: 5,
        match_name: "upcoming 2 5-a-side",
        date_start: "2020-01-07T14:30",
        date_end: "2020-01-07T16:00",
        venue: "the school pitch",
    },
    {
        match_id: 6,
        match_name: "now 2 5-a-side",
        date_start: "2020-01-08T09:30",
        date_end: "2020-01-08T18:00",
        venue: "the school pitch",
    },
    {
        match_id: 7,
        match_name: "finished 3 5-a-side",
        date_start: "2020-01-01T14:30",
        date_end: "2020-01-01T14:31",
        venue: "the school pitch",
    },
    {
        match_id: 8,
        match_name: "upcoming 3 5-a-side",
        date_start: "2020-01-05T14:30",
        date_end: "2020-01-05T16:00",
        venue: "the school pitch",
    },
    {
        match_id: 9,
        match_name: "now 3 5-a-side",
        date_start: "2020-01-02T09:30",
        date_end: "2020-01-02T19:00",
        venue: "the school pitch",
    },
    {
        match_id: 10,
        match_name: "finished 4 5-a-side",
        date_start: "2020-01-01T14:30",
        date_end: "2020-01-01T15:00",
        venue: "the school pitch",
    },
    {
        match_id: 11,
        match_name: "upcoming 4 5-a-side",
        date_start: "2020-01-04T14:30",
        date_end: "2020-01-04T16:00",
        venue: "the school pitch",
    },
    {
        match_id: 12,
        match_name: "now 4 5-a-side",
        date_start: "2020-01-02T09:30",
        date_end: "2020-01-02T20:00",
        venue: "the school pitch",
    },
]

export const matches_dynamic = [
    {
        match_id: 1,
        users_signed_up: [
            {user_id: 1, user_signed_up: true, plus: 2}
        ],
        users_attended: [
            {user_id: 1, user_attended: true, plus: 2}
        ],
        match_score: {
            home: {
                goals: 0,
                scorers: [0],
            },
            away: {
                goals: 0,
                scorers: [],
            }
        }
    },
    {
        match_id: 2,
        users_signed_up: [
            {user_id: 1, user_signed_up: true, plus: 1}
        ],
        users_attended: [
            {user_id: 1, user_attended: true, plus: 1}
        ],
        match_score: {
            home: {
                goals: 0,
                scorers: [],
            },
            away: {
                goals: 0,
                scorers: [],
            }
        }
    },

]

/* export const matches = [
    {
        match_id: 1,
        match_name: "pre x-mas 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 1},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 22 2019 14:30",
        date_end: "Dec 22 2019 16:00",
        venue: "hooks bridge",
        description: "Let's play last game before X-mas!",
        score: {home: 0, away: 3},
        report_submitted: true,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
    {
        match_id: 2,
        match_name: "post x-mas 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 31 2019 14:30",
        date_end: "Dec 31 2019 16:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: true,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
    {
        match_id: 3,
        match_name: "now 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 26 2019 11:30",
        date_end: "Dec 31 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 18,
        match_name: "tut 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 26 2020 11:30",
        date_end: "Dec 31 2020 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 4,
        match_name: "set 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Jan 26 2019 11:30",
        date_end: "Jan 31 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 5,
        match_name: "gone 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 12 2019 11:30",
        date_end: "Dec 12 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 6,
        match_name: "oi 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Nov 26 2019 11:30",
        date_end: "Nov 31 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 7,
        match_name: "tur 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Feb 26 2019 11:30",
        date_end: "Feb 31 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 8,
        match_name: "now more 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 29 2019 2:30",
        date_end: "Dec 31 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 9,
        match_name: "nope 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Feb 12 2019 11:30",
        date_end: "Dec 12 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 10,
        match_name: "nope nope 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Jan 2 2019 11:30",
        date_end: "Jan 2 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 11,
        match_name: "mar 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Mar 26 2019 11:30",
        date_end: "Mar 31 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 12,
        match_name: "now 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Oct 26 2020 11:30",
        date_end: "Oct 31 2020 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 13,
        match_name: "guh 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Jan 26 2020 11:30",
        date_end: "Jan 31 2020 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 14,
        match_name: "sda 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Jan 18 2020 11:30",
        date_end: "Jan 18 2020 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
	{
        match_id: 15,
        match_name: "jany 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Jan 3 2019 11:30",
        date_end: "Jan 3 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },	
    {
        match_id: 16,
        match_name: "more more now 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 29 2019 6:30",
        date_end: "Dec 29 2019 23:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },    
    {
        match_id: 17,
        match_name: "more more more now 5-a-side",
        image_url: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 2},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        date_start: "Dec 29 2019 6:30",
        date_end: "Dec 29 2019 14:00",
        venue: "hooks bridge",
        description: "Let's play a game after X-mas!",
        score: {home: 0, away: 0},
        report_submitted: false,
        author: "karlo",
        date_created: "Dec 12 2019 14:30"
    },
]
export const users = [
    {
        name: "karlo",
        email: "karlo@gmail.com",
        password: "karlo",
        joined_matches: [
            {
                match_id: 12,
                plus: 3,
                attended: true,
                scored: 3
            },
            {
                match_id: 2,
                plus: 1,
                attended: true,
                scored: 0
            }
        ]
    }
] */

/* export const matches = [
    {
        matchId:1,
        matchName: "pre x-mas 5-a-side",
        image: "https://www.ecopetit.cat/wpic/mpic/6-67119_bliss-2015-merry-christmas-wallpapers-hd-happy-xmas.jpg",
        players: [
            {name: "santa", plus: 0},
            {name: "rudolph", plus: 0},
            {name: "ned", plus: 1},
            {name: "jane", plus: 3},
            {name: "liz", plus: 0},
        ],
        min_players: 10,
        max_players: 12, - mozda cak i bez ovog?
        dateStart: "Dec 22 2019 14:30",
        dateEnd: "Dec 22 2019 16:00",
        venue: "locks primary school",
        score: {
            home: 0,
            away: 3,
        },
        description: "",
        matchReport: {
            submitted: false,
            scorers: []
            score: {home: 0, away: 3}
        },
        createdOn: "",
    },
    */