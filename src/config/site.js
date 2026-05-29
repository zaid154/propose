// import defaultMusic from '../assets/music.mp3'

function readEnvString(key, fallback) {
  const v = import.meta.env[key]

  if (typeof v === 'string' && v.trim() !== '') {
    return v
  }

  return fallback
}

export const site = {
  siteTitle: readEnvString('VITE_SITE_TITLE', 'Only For You'),

  myName: readEnvString('VITE_MY_NAME', 'Your Name'),

  herName: readEnvString('VITE_HER_NAME', 'Her Name'),

  home: {
    eyebrow: readEnvString(
      'VITE_HOME_EYEBROW',
      'FOR'
    ),

    tagline: readEnvString(
      'VITE_HOME_TAGLINE',
      'A little story I made, just for you.'
    ),

    cta: readEnvString(
      'VITE_HOME_CTA',
      'Begin'
    ),
  },

  homeTagline: readEnvString(
    'VITE_HOME_TAGLINE',
    'A little something I made, just for you.'
  ),

  proposalQuestion: readEnvString(
    'VITE_PROPOSAL_QUESTION',
    'Will you be my partner for life?'
  ),

  proposalYesReply: readEnvString(
    'VITE_PROPOSAL_YES_REPLY',
    "You've made me the happiest person."
  ),

  formspree: {
    proposalUrl: readEnvString(
      'VITE_FORMSPREE_PROPOSAL_URL',
      'https://formspree.io/f/mreznqnk'
    ),

    dateUrl: readEnvString(
      'VITE_FORMSPREE_DATE_URL',
      'https://formspree.io/f/mnjaedeb'
    ),
  },

  storyParagraphs: [
    'Aaj kal main humare baare mein kaafi sochta hoon. Jo time hum saath spend karte hain, woh mujhe sach mein acha lagta hai.',
    'Tumhare saath rehna easy lagta hai. Koi pressure nahi, bas sukoon. Tumhari company mujhe khush rakhti hai.',
    'Mujhe pasand hai jab hum choti choti baaton pe hans lete hain aur bina bole bhi ek dusre ko samajh lete hain.',
    'Tumhare saath normal din bhi special ho jaate hain. Sach bolun toh ab tumhare bina sab thoda incomplete sa lagta hai.',
    'Dil karta hai tumhare saath aur time spend karun — bahar ghoomne, walk pe jaane, kuch khane, ya bas saath baith ke baatein karne.',
    'Mujhe jo humare beech hai woh bohot important lagta hai. Main bas tumhare saath rehna chahta hoon, aaj bhi aur aage bhi.',
  ],

letterLines: [
  'Hey,',
  'I made this little surprise for you.',
  'Because you are someone special to me.',
  'And I wanted you to know that.',
],

  surprise: {
    finalMessage: readEnvString(
      'VITE_SURPRISE_FINAL_MESSAGE',
      'Today, tomorrow, always — I choose you.'
    ),

    signature: readEnvString(
      'VITE_SURPRISE_SIGNATURE',
      'Always yours,'
    ),

    // musicUrl: readEnvString(
    //   'VITE_SURPRISE_MUSIC_URL',
    //   defaultMusic
    // ),
  },

  noButtonMessages: [
    'Are you sure?',
    'Think about it again?',
    'Maybe give it another thought?',
    'I really mean it',
    'Please say yes?',
    "You know we're perfect together",
  ],
}