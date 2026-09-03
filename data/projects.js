/* ---------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE THE SITE.
   Everything on the site is generated from what's below.

   To add a project: copy an existing { ... } block, paste it, change the text.
   To reorder: move the block up or down.
   To feature a project on the homepage: featured: true  (keep it to 3)

   STILLS — optional process images shown under the notes:
     stills: [ { src: 'assets/img/process/name.jpg', caption: 'what it shows' } ]

   VIDEO — two options per project:
     video: { type: 'youtube', id: 'dQw4w9WgXcQ' }        <- unlisted YouTube
     video: { type: 'file', src: 'assets/video/name.mp4' } <- file in this repo
     video: null                                           <- shows a placeholder
   YouTube thumbnails are pulled automatically. For file videos, add
     poster: 'assets/img/name.jpg'
   See README.md for which one to use when.
--------------------------------------------------------------------------- */

window.SITE = {

  name: 'Anton Pirro',

  /* The homepage nameplate. 'statement' is optional and empty on purpose:
     fill it in only if you ever actually want a line of text up there. */
  statement: '',
  location: 'Music Technology, Georgia Tech — Atlanta, Georgia',

  contact: {
    email: 'antonpirro2@gmail.com',
    phone: '912-412-9384',
    resume: '', // e.g. 'assets/Anton-Pirro-Resume.pdf' or a Google Drive link
    // Optional: add your own, e.g. { label: 'IMDb', href: '...' }
    links: []
  },

  about: [
    "I grew up in Savannah, Georgia and I'm currently a student at the Georgia Institute of Technology in Atlanta, studying for a BS in Music Technology with a minor in film.",
    "Ever since I was a kid I've been interested in composing and arranging music using DAWs. In high school I majored in piano and played drum set on the side, which I continue to this day. I've been writing in a lot of different genres.",
    "In the future I'd like to focus on media scoring — film, TV, and video games. I think it's possible to break free from the confines of traditional, orchestral-oriented scoring, and I'm excited to be a part of that process."
  ],

  /* Shown in the About page's side column. */
  tools: [
    { group: 'Sound', items: ['Ableton Live', 'AVID Pro Tools', 'Max/MSP', 'GarageBand'] },
    { group: 'Picture', items: ['DaVinci Resolve', 'Blender', 'Autodesk Maya', 'Unreal Engine'] },
    { group: 'Playing', items: ['Piano', 'Drum set'] }
  ],

  /* Site-wide line in the footer. */
  disclaimer: 'Any and all copyrighted visuals are included for demonstration purposes only, and are not commercialized or distributed in any way.',

  groups: {
    films: 'Films & collaborations',
    studies: 'Studies & re-scores'
  },

  projects: [

    {
      slug: 'weight',
      title: 'Weight',
      kicker: 'Trailer',
      year: '2025',
      group: 'films',
      featured: true,
      blurb: 'Trailer for my upcoming short film, Weight.',
      roles: ['Direction', 'Score', 'Edit'],
      video: { type: 'youtube', id: 'mBvynOpWcww' },
      poster: '',
      notes: [],
      spec: [
        ['Goal', 'Make a trailer for my upcoming short film'],
        ['Created', '2025']
      ],
      credits: [],
      sources: [],
      links: [],
      rights: ''
    },

    {
      slug: 'departing-silence',
      title: 'Departing Silence',
      kicker: 'Opening scene',
      year: 'Winter 2025',
      group: 'films',
      featured: true,
      blurb: 'A village leaves its dead at the edge of the forest overnight. In the morning, they are gone.',
      roles: ['Story', '3D', 'Score', 'Sound design', 'Edit'],
      video: { type: 'youtube', id: 'dP1_Giz4fBU' },
      poster: '',
      notes: [
        "For one of my classes I wrote a short story screenplay about a remote village with an idiosyncratic ritual: when someone dies, they're placed in an off-limits area at the edge of the forest. They're left there overnight, and when the villagers return in the morning, the person who passed away has disappeared without a trace.",
        "Over winter break I wanted to see the introduction to that story, so I learned enough Blender to build it, then scored and cut it."
      ],
      spec: [
        ['Goal', 'Write and produce an opening scene'],
        ['Created', 'Winter 2025'],
        ['Software', 'Blender, Ableton Live, DaVinci Resolve']
      ],
      credits: ['Story, visuals, and score by Anton Pirro', 'Any other sound effects by Anton Pirro'],
      sources: [
        { label: 'Ground vegetation — Graswald Gscatter', href: 'https://gscatter.com/gscatter' },
        { label: 'Fall tree — Maxtree', href: 'https://maxtree.org/products/plant-models-vol-60/' },
        { label: 'Wind — Traian1984 (Pixabay)', href: 'https://pixabay.com/sound-effects/nature-ambience-wind-blowing-through-trees-01-186986/' },
        { label: 'Owl — LazyChillZone (Pixabay)', href: 'https://pixabay.com/sound-effects/nature-owl-hooting-223549/' },
        { label: 'Birds — Freesound (Pixabay)', href: 'https://pixabay.com/sound-effects/nature-birds-19624/' },
        { label: 'Crickets — u_uy2kad5rlq (Pixabay)', href: 'https://pixabay.com/sound-effects/nature-crickets-395138/' }
      ],
      links: [
        { label: 'Referenced script', href: 'https://drive.google.com/file/d/1ch0jFR48OXwrTDbY5QxRacUpKGiJ0RCU/view?usp=sharing' }
      ],
      stills: [
        { src: 'assets/img/process/departing-silence-1.jpg', caption: 'Blocking out the clearing' },
        { src: 'assets/img/process/departing-silence-2.jpg', caption: 'Lighting the coffin' },
        { src: 'assets/img/process/departing-silence-3.jpg', caption: 'Scattering the grass and trees' },
        { src: 'assets/img/process/departing-silence-4.jpg', caption: 'Setting up the smoke simulation' }
      ],
      rights: ''
    },

    {
      slug: 'code-name-brenda-scene-demo',
      title: 'Code Name Brenda',
      kicker: 'Scene demo',
      year: '2025',
      group: 'films',
      featured: true,
      blurb: '',
      roles: ['Sound design', 'Score', 'Foley', 'Max/MSP', 'Mo-cap', 'Unreal', 'Edit'],
      video: { type: 'youtube', id: '-bQLKJo1rY0' },
      poster: '',
      notes: [
        'I created all the sound and music you hear. The SFX were done both through Foley and through sound synthesis in Max/MSP.',
        'In Autodesk Maya I matched mo-cap data onto a rigged character, then exported those animations into Unreal Engine, positioned and sequenced them, and created the cinematic camera shots.'
      ],
      spec: [
        ['Goal', 'Design a soundscape for a scene demo'],
        ['Created', 'Spring – Fall 2025'],
        ['DAW', 'Ableton Live']
      ],
      credits: ['Editing, cinematography, footage processing, music, and sound design by Anton Pirro'],
      sources: [],
      links: [
        { label: 'CinéInnovate Studios VIP', href: 'https://lmcfilms.lmc.gatech.edu/cineinnovate-studios-vip/' }
      ],
      stills: [
        { src: 'assets/img/process/code-name-brenda-session.jpg', caption: 'The Ableton session' }
      ],
      rights: ''
    },

    {
      slug: 'code-name-brenda-proof-of-concept',
      title: 'Code Name Brenda',
      kicker: 'Proof of concept trailer',
      year: 'Fall 2024',
      group: 'films',
      featured: false,
      blurb: '',
      roles: ['Sound design', 'Score'],
      video: { type: 'file', src: 'assets/video/code-name-brenda-proof-of-concept.mp4' },
      poster: 'assets/img/poster/code-name-brenda-proof-of-concept.jpg',
      notes: [],
      spec: [
        ['Goal', 'Design a soundscape for a proof of concept trailer'],
        ['Created', 'Fall 2024'],
        ['DAW', 'Ableton Live']
      ],
      credits: ['Sound effects and scoring by Anton Pirro'],
      sources: [],
      links: [
        { label: 'cnbtheseries', href: 'https://www.instagram.com/cnbtheseries/' }
      ],
      rights: 'All rights belong to cnbtheseries'
    },

    {
      slug: 'ripley-loves-me',
      title: 'Ripley Loves Me',
      kicker: 'Short film, dir. Pramodh Sundarshrii & Ethan Hughes',
      year: 'September 2025',
      group: 'films',
      featured: false,
      blurb: '',
      roles: ['Original score'],
      video: { type: 'youtube', id: 'TWCZitYZ8KQ' },
      poster: '',
      notes: [],
      spec: [
        ['Goal', 'Make original music for a short film'],
        ['Released', 'September 2025'],
        ['DAW', 'Ableton Live']
      ],
      credits: ['Produced by Yellow Paper Pictures', 'Directed by Pramodh Sundarshrii and Ethan Hughes'],
      sources: [],
      links: [
        { label: 'IMDb', href: 'https://www.imdb.com/title/tt38047278/' }
      ],
      rights: ''
    },

    {
      slug: 'willage-monster',
      title: 'Willage Monster',
      kicker: 'Found-footage parody',
      year: 'April 2024',
      group: 'films',
      featured: false,
      blurb: '',
      roles: ['Writing', 'Score', 'Edit'],
      video: { type: 'file', src: 'assets/video/willage-monster.mp4' },
      poster: 'assets/img/poster/willage-monster.jpg',
      notes: [],
      spec: [
        ['Goal', 'Create an introduction for a parody found footage horror film'],
        ['Created', 'April 2024'],
        ['DAW', 'GarageBand']
      ],
      credits: ['Scoring, editing, and writing by Anton Pirro', 'Sound effects not by Anton Pirro'],
      sources: [],
      links: [],
      rights: ''
    },

    {
      slug: 'blade-runner-2049',
      title: 'Blade Runner 2049',
      kicker: 'Trailer concept',
      year: 'November 2025',
      group: 'studies',
      featured: false,
      blurb: '',
      roles: ['Edit', 'Score'],
      video: { type: 'youtube', id: 'WS--4Y3L_sI' },
      poster: '',
      notes: [
        'I edited a trailer for Blade Runner 2049 (dir. Denis Villeneuve, 2017) from scratch, and wrote the music for it. At 1:04 I bring in the first four melody notes of the "Tears in Rain" theme from the original Blade Runner (dir. Ridley Scott, 1982).'
      ],
      spec: [
        ['Goal', 'Make a trailer for Blade Runner 2049 (dir. Denis Villeneuve, 2017)'],
        ['Created', '3 – 7 November 2025'],
        ['Software', 'Ableton Live, DaVinci Resolve']
      ],
      credits: ['Brass synth theme at 1:04 quotes "Tears in Rain" by Vangelis'],
      sources: [],
      links: [],
      stills: [
        { src: 'assets/img/process/blade-runner-2049-timeline.jpg', caption: 'Cutting the trailer in DaVinci Resolve' }
      ],
      rights: 'All dialogue and visuals belong to Alcon Entertainment'
    },

    {
      slug: 'cosmic-ontological-shock',
      title: 'Cosmic Ontological Shock',
      kicker: 'Scored sequence',
      year: '2024 – 2025',
      group: 'studies',
      featured: false,
      blurb: '',
      roles: ['Score', 'Edit'],
      video: { type: 'file', src: 'assets/video/cosmic-ontological-shock.mp4' },
      poster: 'assets/img/poster/cosmic-ontological-shock.jpg',
      notes: [],
      spec: [
        ['Goal', 'Tell a story by scoring an edited sequence of Arrival (2016) and Contact (1997)'],
        ['Created', 'December 2024 – January 2025'],
        ['DAW', 'Ableton Live']
      ],
      credits: ['Scoring and cut editing by Anton Pirro'],
      sources: [],
      links: [],
      rights: 'All visuals belong to Paramount Pictures (Arrival) and Warner Bros. (Contact)'
    },

    {
      slug: 'loving-vincent',
      title: 'Loving Vincent',
      kicker: 'Title card re-score',
      year: 'February 2022',
      group: 'studies',
      featured: false,
      blurb: '',
      roles: ['Score'],
      video: { type: 'file', src: 'assets/video/loving-vincent.mp4' },
      poster: 'assets/img/poster/loving-vincent.jpg',
      notes: [],
      spec: [
        ['Goal', 'Rescore the title card of Loving Vincent (2017)'],
        ['Created', 'February 2022'],
        ['DAW', 'AVID Pro Tools']
      ],
      credits: [],
      sources: [],
      links: [],
      rights: 'All visuals belong to Breakthru Films and Trademark Films'
    },

    {
      slug: 'stranger-things',
      title: 'Stranger Things',
      kicker: 'Title card re-score',
      year: 'October 2022',
      group: 'studies',
      featured: false,
      blurb: "",
      roles: ['Score'],
      video: { type: 'file', src: 'assets/video/stranger-things.mp4' },
      poster: 'assets/img/poster/stranger-things.jpg',
      notes: [],
      spec: [
        ['Goal', "Rescore the title card of Netflix's Stranger Things"],
        ['Created', 'October 2022'],
        ['DAW', 'AVID Pro Tools']
      ],
      credits: [],
      sources: [],
      links: [],
      rights: 'All visuals belong to Netflix Studios'
    }

  ]
};
