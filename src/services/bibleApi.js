/**
 * Bible API Service
 * 
 * This service provides functions to interact with Bible data,
 * either from a local dataset or an external API
 */

// Sample dataset of Bible verses related to common topics
// In a production environment, this would be replaced with a proper Bible API
const localBibleData = {
  "trust": [
    {
      reference: "PROVERBS 3:5-6",
      text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
    },
    {
      reference: "PSALM 56:3-4",
      text: "When I am afraid, I put my trust in you. In God, whose word I praise—in God I trust and am not afraid. What can mere mortals do to me?"
    },
    {
      reference: "JEREMIAH 17:7-8",
      text: "But blessed is the one who trusts in the LORD, whose confidence is in him. They will be like a tree planted by the water that sends out its roots by the stream..."
    },
    {
      reference: "PSALM 28:7",
      text: "The LORD is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him."
    },
    {
      reference: "PSALM 9:10",
      text: "Those who know your name trust in you, for you, LORD, have never forsaken those who seek you."
    },
    {
      reference: "ISAIAH 26:3-4",
      text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you. Trust in the LORD forever, for the LORD, the LORD himself, is the Rock eternal."
    },
    {
      reference: "PROVERBS 29:25",
      text: "Fear of man will prove to be a snare, but whoever trusts in the LORD is kept safe."
    }
  ],
  "faith": [
    {
      reference: "HEBREWS 11:1",
      text: "Now faith is confidence in what we hope for and assurance about what we do not see."
    },
    {
      reference: "EPHESIANS 2:8-9",
      text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast."
    },
    {
      reference: "JAMES 2:17",
      text: "In the same way, faith by itself, if it is not accompanied by action, is dead."
    },
    {
      reference: "MATTHEW 17:20",
      text: "He replied, \"Because you have so little faith. Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you.\""
    },
    {
      reference: "ROMANS 10:17",
      text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ."
    }
  ],
  "love": [
    {
      reference: "1 CORINTHIANS 13:4-7",
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres."
    },
    {
      reference: "JOHN 3:16",
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
    },
    {
      reference: "1 JOHN 4:8",
      text: "Whoever does not love does not know God, because God is love."
    },
    {
      reference: "MARK 12:31",
      text: "The second is this: 'Love your neighbor as yourself.' There is no commandment greater than these."
    }
  ],
  "hope": [
    {
      reference: "ROMANS 15:13",
      text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."
    },
    {
      reference: "HEBREWS 10:23",
      text: "Let us hold unswervingly to the hope we profess, for he who promised is faithful."
    },
    {
      reference: "PSALM 71:14",
      text: "As for me, I will always have hope; I will praise you more and more."
    }
  ],
  "forgiveness": [
    {
      reference: "EPHESIANS 4:32",
      text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."
    },
    {
      reference: "MATTHEW 6:14-15",
      text: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you. But if you do not forgive others their sins, your Father will not forgive your sins."
    },
    {
      reference: "COLOSSIANS 3:13",
      text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you."
    }
  ],
  "salvation": [
    {
      reference: "ACTS 4:12",
      text: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved."
    },
    {
      reference: "ROMANS 10:9",
      text: "If you declare with your mouth, \"Jesus is Lord,\" and believe in your heart that God raised him from the dead, you will be saved."
    },
    {
      reference: "TITUS 3:5",
      text: "He saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit."
    }
  ],
  "holy spirit": [
    {
      reference: "JOHN 14:26",
      text: "But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you."
    },
    {
      reference: "ACTS 1:8",
      text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth."
    },
    {
      reference: "GALATIANS 5:22-23",
      text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law."
    }
  ]
};

/**
 * Search for Bible verses related to a specific topic
 * @param {Object} params - Search parameters
 * @param {string} params.topic - The topic to search for
 * @param {string} params.translation - The Bible translation to use
 * @returns {Promise<Array>} - A promise that resolves to an array of verse objects
 */
export async function searchVerses({ topic, translation }) {
  console.log(`Searching for "${topic}" in ${translation} translation`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would call an actual Bible API
  // For now, we'll use our local data
  const normalizedTopic = topic.toLowerCase();
  
  // Return verses if the topic exists in our dataset, or empty array otherwise
  return localBibleData[normalizedTopic] || [];
}

/**
 * Get a list of available Bible translations
 * @returns {Promise<Array>} - A promise that resolves to an array of translation objects
 */
export async function getTranslations() {
  // In a real app, this would fetch from an API
  return [
    { id: 'NIV', name: 'New International Version' },
    { id: 'KJV', name: 'King James Version' },
    { id: 'ESV', name: 'English Standard Version' },
    { id: 'NLT', name: 'New Living Translation' },
    { id: 'NASB', name: 'New American Standard Bible' },
    { id: 'CSB', name: 'Christian Standard Bible' },
  ];
}
