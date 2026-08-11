import Blog from '../models/Blog.js';

export const autoSeedBlogs = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      const defaultBlogs = [
        {
          title: 'Russian Escorts Agency in Jaipur – The Seductive Charm of Russian Models',
          slug: 'russian-escorts-agency-in-jaipur-the-seductive-charm-of-russian-models',
          coverImage: '/images/hero-lovepartners-banner.jpg',
          excerpt:
            'Introduction to Russian Escorts Agency in Jaipur. Jaipur is one of the cities that is known for its royal heritage, luxurious hospitality, and lively nightlife. In addition to its international lifestyle, the demand for high class international Russian ladies has risen substantially.',
          content: `
            <h2>Introduction to Russian Escorts Agency in Jaipur</h2>
            <p>Jaipur is renowned for its royal heritage, luxurious hospitality, and lively nightlife. In addition to its international lifestyle, the need of international ladies has risen substantially. This is why a Russian Escorts Agency in Jaipur is a favorite option for those who are awed by the beauty, elegance and an elegant company.</p>
            
            <h3>Why Russian Companions are in High Demand</h3>
            <p>Russian companions bring a unique blend of elegance, tall stature, striking features, and refined dinner etiquette. Whether attending exclusive high-society events or private luxury suite gatherings, foreign models add unmatched glamour.</p>
            
            <p>Our agency guarantees 100% verified identities, complete privacy, and direct communication without middleman interference.</p>
          `,
          tags: ['Russian Escorts', 'Jaipur', 'VIP Models'],
          author: 'LovePartners Editorial',
          readTime: '4 min read',
          status: 'PUBLISHED',
          views: 1420,
        },
        {
          title: 'Independent Escorts Services in Jaipur VIP Nights with Beautiful Models',
          slug: 'independent-escorts-services-in-jaipur-vip-nights-with-beautiful-models',
          coverImage: '/images/cat-vip.jpg',
          excerpt:
            'Introduction to Independent Escorts Services in Jaipur. Jaipur is renowned for its regal charm as well as its luxurious lifestyle and lively nightlife. Recent years have seen demand for high-end companionship increase substantially.',
          content: `
            <h2>Introduction to Independent Escorts Services in Jaipur</h2>
            <p>Jaipur is renowned for its regal charm as well as its luxurious lifestyle and lively nightlife. Recent years have seen demand for high-end companionship increase substantially, making Independent Escorts Services in Jaipur an option for those who are looking for the privacy of their choice, freedom, and a stylish companion.</p>
            
            <p>In contrast to traditional agency arrangements, independent companions in Jaipur are usually preferred by clients who are looking for a more personalized and flexible relationship. A lot of businesspeople, elite visitors and tourists seek brave, confident partners who can bring exuberance and glamour to their evenings in Jaipur, Pink City.</p>

            <h3>Why Independent Escorts Services in Jaipur Are Becoming Popular</h3>
            <p>The increasing popularity of Independent Escorts Services in Jaipur is due to the flexibility and intimacy these ladies provide. Independent models typically provide an enjoyable and relaxed experience and make clients feel at ease and valued.</p>

            <ul>
              <li>A more intimate companionship experience</li>
              <li>Hot and sexy friends</li>
              <li>Discipline and Privacy</li>
              <li>Flexible arrangements for meetings</li>
              <li>A glamorous and exciting company</li>
            </ul>

            <h3>The Glamour of Stunning Independent Models</h3>
            <p>One of the major advantages that is a major draw for Independent Escorts Services in Jaipur is the sheer number of gorgeous models who add elegance and a sense of dynamism to every occasion. They are renowned for their stunning fashion, stylish fashion, and charismatic personalities.</p>
          `,
          tags: ['Independent Escorts', 'Jaipur VIP', '5-Star Hotel'],
          author: 'LovePartners Editorial',
          readTime: '6 min read',
          status: 'PUBLISHED',
          views: 2890,
        },
        {
          title: 'Top Reasons Choose Bollywood Celebrity Escorts for VIP Experience',
          slug: 'top-reasons-choose-bollywood-celebrity-escorts-for-vip-experience',
          coverImage: '/images/cat-call-girls.jpg',
          excerpt:
            'Modern luxury life moves very fast today. Bollywood Celebrity Escorts are becoming a popular choice among rich people who want premium experiences and elite-level companionship.',
          content: `
            <h2>Top Reasons Choose Bollywood Celebrity Escorts for VIP Experience</h2>
            <p>Modern luxury life moves very fast today. Bollywood Celebrity Escorts are becoming a popular choice among rich people who want premium experiences and elite-level companionship. Wealthy clients do not settle for average things; they always search for class, glamour, and unforgettable moments that match their high-status lifestyle.</p>

            <h3>Elite Charm and Celebrity Stature</h3>
            <p>Celebrity companions are trained in social grace, media etiquette, and high-fashion styling. When you walk into a 5-star hotel restaurant or private VIP party with a celebrity model, every eye turns in admiration.</p>

            <p>LovePartners connects verified high-profile clients with verified celebrity companions under 256-bit SSL confidentiality and private WhatsApp booking.</p>
          `,
          tags: ['Bollywood Escorts', 'Celebrity VIP', 'Luxury'],
          author: 'LovePartners Editorial',
          readTime: '5 min read',
          status: 'PUBLISHED',
          views: 3100,
        },
      ];

      await Blog.insertMany(defaultBlogs);
      console.log('📰 Default SEO Blog Posts auto-seeded into MongoDBAtlas.');
    }
  } catch (err) {
    console.error('Error auto seeding blogs:', err.message);
  }
};
