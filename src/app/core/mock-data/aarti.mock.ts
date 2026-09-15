import { Aarti } from '../models/aarti';

/**
 * Aartis, shlokas and mantras for the Aarti page.
 *
 * All are traditional devotional texts in the public domain. The Telugu lines
 * are a transliteration of the original Devanagari (Sanskrit, Hindi, Marathi)
 * so devotees can sing along in the script they read most easily; the English
 * lines are a simple phonetic reading, not a translation. `meaning` gives the
 * sense in plain English.
 *
 * To add another, append an object — the page picks it up automatically.
 */
export const MOCK_AARTIS: Aarti[] = [
  {
    id: 'vakratunda',
    kind: 'Shloka',
    language: 'Sanskrit',
    title: 'Vakratunda Mahakaya',
    titleTelugu: 'వక్రతుండ మహాకాయ',
    note: 'Recited before starting any pooja or new work.',
    meaning: 'O Lord with the curved trunk and mighty form, radiant as a million suns — remove every obstacle from all my work, always.',
    verses: [
      {
        telugu: [
          'వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ।',
          'నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా॥',
        ],
        english: [
          'Vakratunda Mahakaya Suryakoti Samaprabha',
          'Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada',
        ],
      },
    ],
  },
  {
    id: 'shuklambaradharam',
    kind: 'Shloka',
    language: 'Sanskrit',
    title: 'Shuklambaradharam',
    titleTelugu: 'శుక్లాంబరధరం',
    note: 'The opening prayer of every Vinayaka Chavithi pooja.',
    meaning: 'Meditate on the one dressed in white, all-pervading, bright as the moon, four-armed and smiling — so that every obstacle is removed.',
    verses: [
      {
        telugu: [
          'శుక్లాంబరధరం విష్ణుం శశివర్ణం చతుర్భుజమ్।',
          'ప్రసన్నవదనం ధ్యాయేత్ సర్వవిఘ్నోపశాంతయే॥',
        ],
        english: [
          'Shuklambaradharam Vishnum Shashivarnam Chaturbhujam',
          'Prasannavadanam Dhyayet Sarva Vighnopashantaye',
        ],
      },
    ],
  },
  {
    id: 'agajanana',
    kind: 'Shloka',
    language: 'Sanskrit',
    title: 'Agajanana Padmarkam',
    titleTelugu: 'అగజానన పద్మార్కం',
    note: 'A short prayer to Ganapati, recited morning and evening.',
    meaning: 'Day and night we worship the elephant-faced, single-tusked Lord — the sun that makes Parvati’s lotus face bloom, who gives abundantly to his devotees.',
    verses: [
      {
        telugu: [
          'అగజానన పద్మార్కం గజాననమహర్నిశమ్।',
          'అనేకదంతం భక్తానాం ఏకదంతముపాస్మహే॥',
        ],
        english: [
          'Agajanana Padmarkam Gajananam Aharnisham',
          'Anekadantam Bhaktanam Ekadantam Upasmahe',
        ],
      },
    ],
  },
  {
    id: 'ganesh-gayatri',
    kind: 'Mantra',
    language: 'Sanskrit',
    title: 'Ganesh Gayatri Mantra',
    titleTelugu: 'గణేశ గాయత్రీ మంత్ర',
    note: 'Chanted 11, 21 or 108 times.',
    meaning: 'We meditate on the single-tusked Lord with the curved trunk; may that Lord inspire and guide us.',
    verses: [
      {
        telugu: [
          'ఓం ఏకదంతాయ విద్మహే వక్రతుండాయ ధీమహి।',
          'తన్నో దంతీ ప్రచోదయాత్॥',
        ],
        english: [
          'Om Ekadantaya Vidmahe Vakratundaya Dhimahi',
          'Tanno Danti Prachodayat',
        ],
      },
    ],
  },
  {
    id: 'jai-ganesh-deva',
    kind: 'Aarti',
    language: 'Hindi',
    title: 'Jai Ganesh Deva',
    titleTelugu: 'జయ గణేశ దేవా',
    note: 'The evening aarti — sing the chorus after every verse.',
    meaning: 'Glory to Lord Ganesha, son of Parvati and Mahadeva: the kind, single-tusked, four-armed Lord who rides the mouse, who is offered flowers, dry fruits and laddus, and who blesses the blind, the sick, the childless and the poor.',
    verses: [
      {
        chorus: true,
        telugu: [
          'జయ గణేశ జయ గణేశ జయ గణేశ దేవా।',
          'మాతా జాకీ పార్వతీ పితా మహాదేవా॥',
        ],
        english: [
          'Jai Ganesh Jai Ganesh Jai Ganesh Deva',
          'Mata Jaki Parvati Pita Mahadeva',
        ],
      },
      {
        telugu: [
          'ఏకదంత దయావంత చార భుజా ధారీ।',
          'మాథే సిందూర సోహే మూసే కీ సవారీ॥',
        ],
        english: [
          'Ek Dant Dayavant Char Bhuja Dhari',
          'Mathe Sindoor Sohe Muse Ki Savari',
        ],
      },
      {
        telugu: [
          'పాన చఢే ఫూల చఢే ఔర చఢే మేవా।',
          'లడ్డుఅన కా భోగ లగే సంత కరేం సేవా॥',
        ],
        english: [
          'Paan Chadhe Phool Chadhe Aur Chadhe Meva',
          'Ladduan Ka Bhog Lage Sant Karen Seva',
        ],
      },
      {
        telugu: [
          'అంధన కో ఆంఖ దేత కోఢిన కో కాయా।',
          'బాంఝన కో పుత్ర దేత నిర్ధన కో మాయా॥',
        ],
        english: [
          'Andhan Ko Aankh Det Kodhin Ko Kaya',
          'Banjhan Ko Putra Det Nirdhan Ko Maya',
        ],
      },
      {
        telugu: [
          'సూర శ్యామ శరణ ఆఏ సఫల కీజే సేవా।',
          'మాతా జాకీ పార్వతీ పితా మహాదేవా॥',
        ],
        english: [
          'Soor Shyam Sharan Aaye Safal Kije Seva',
          'Mata Jaki Parvati Pita Mahadeva',
        ],
      },
    ],
  },
  {
    id: 'sukhkarta-dukhharta',
    kind: 'Aarti',
    language: 'Marathi',
    title: 'Sukhkarta Dukhharta',
    titleTelugu: 'సుఖకర్తా దుఃఖహర్తా',
    note: 'By Samarth Ramdas — sing the chorus after every verse.',
    meaning: 'The giver of joy and remover of sorrow, whose grace removes every obstacle — adorned with sandal paste, a pearl necklace, a jewelled crown and ringing anklets. Merely seeing him fulfils the wishes of the heart.',
    verses: [
      {
        chorus: true,
        telugu: [
          'జయ దేవ జయ దేవ జయ మంగలమూర్తీ।',
          'దర్శనమాత్రే మనకామనా పురతీ॥ జయ దేవ జయ దేవ॥',
        ],
        english: [
          'Jai Dev Jai Dev Jai Mangalmurti',
          'Darshan Matre Mankamana Purti — Jai Dev Jai Dev',
        ],
      },
      {
        telugu: [
          'సుఖకర్తా దుఃఖహర్తా వార్తా విఘ్నాచీ।',
          'నురవీ పురవీ ప్రేమ కృపా జయాచీ॥',
          'సర్వాంగీ సుందర ఉటీ శేందురాచీ।',
          'కంఠీ ఝళకే మాళ ముక్తాఫళాంచీ॥',
        ],
        english: [
          'Sukhkarta Dukhharta Varta Vighnachi',
          'Nurvi Purvi Prem Krupa Jayachi',
          'Sarvangi Sundar Uti Shendurachi',
          'Kanthi Jhalke Mal Muktaphalanchi',
        ],
      },
      {
        telugu: [
          'రత్నఖచిత ఫరా తుజ గౌరీకుమరా।',
          'చందనాచీ ఉటీ కుంకుమకేశరా॥',
          'హిరేజడిత ముకుట శోభతో బరా।',
          'రుణఝుణతీ నూపురే చరణీ ఘాగరియా॥',
        ],
        english: [
          'Ratnakhachit Phara Tuj Gaurikumara',
          'Chandanachi Uti Kumkumkeshara',
          'Hirejadit Mukut Shobhato Bara',
          'Runjhunati Nupure Charani Ghagariya',
        ],
      },
      {
        telugu: [
          'లంబోదర పీతాంబర ఫణివరబంధనా।',
          'సరళ సోండ వక్రతుండ త్రినయనా॥',
          'దాస రామాచా వాట పాహే సదనా।',
          'సంకటీ పావావే నిర్వాణీ రక్షావే సురవరవందనా॥',
        ],
        english: [
          'Lambodar Pitambar Phanivarbandhana',
          'Saral Sond Vakratunda Trinayana',
          'Das Ramacha Vaat Pahe Sadana',
          'Sankati Pavave Nirvani Rakshave Survarvandana',
        ],
      },
    ],
  },
];
