import React from 'react';
import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'the-enduring-appeal-of-impressionism',
    title: 'The Enduring Appeal of Impressionism',
    author: 'Claude Monet (as imagined)',
    date: 'August 15, 2024',
    excerpt: 'Exploring why the fleeting moments captured by Impressionist masters continue to captivate audiences over a century later.',
    content: (
      <div className="space-y-6">
        <p>
          Ah, to capture the light! That was our obsession, our driving force. We, the Impressionists, sought not to paint a landscape, but the very sensation produced by the landscape. It was a rebellion against the stuffy, formal traditions of the Académie des Beaux-Arts. They wanted meticulous detail and historical subjects; we wanted to paint modern life as we saw it, in all its fleeting, vibrant glory.
        </p>
        <p>
          The critics, at first, were merciless. "Impression, Sunrise" — they took the title of my painting and used it as an insult! But we knew we were onto something. We painted outdoors, "en plein air," which allowed us to observe the changing effects of sunlight on color. Look at a haystack. It is not just yellow. In the morning light, it is tinged with violet and blue. In the evening, it glows with orange and red. This is what we wanted to show the world.
        </p>
        <p>
          Why does our work still resonate today? I believe it is because we captured something universal: the beauty of a passing moment. A ripple on the water, the steam from a train, the dappled sunlight through the leaves of a tree. In a world that moves ever faster, these quiet, beautiful moments are more precious than ever. We didn't just paint what we saw; we painted how it felt to see it. And that, my friends, is a feeling that never grows old.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    slug: 'decoding-the-symbols-in-dutch-still-life',
    title: 'Decoding the Symbols in Dutch Still Life',
    author: 'Artful Curator Staff',
    date: 'July 28, 2024',
    excerpt: 'A look into the hidden meanings and moral lessons embedded in the beautiful still life paintings of the Dutch Golden Age.',
    content: (
      <div className="space-y-6">
        <p>
          At first glance, a Dutch still life from the 17th century is a stunning display of technical skill—a feast for the eyes. Luscious fruits, gleaming silverware, and delicate flowers are rendered with breathtaking realism. But look closer, and you'll find these paintings are far more than just pretty pictures. They are complex allegories, rich with symbolism and moral messages, a genre known as "vanitas."
        </p>
        <p>
          The term "vanitas" comes from the opening of the Book of Ecclesiastes: "Vanity of vanities, all is vanity." These paintings were meant to be a reminder of the transience of life and the futility of earthly pleasures. Every object was carefully chosen for its symbolic meaning:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Skulls:</strong> The most direct symbol, a reminder of the certainty of death (memento mori).</li>
          <li><strong>Wilting Flowers & Decaying Fruit:</strong> Represent the fleeting nature of life and beauty.</li>
          <li><strong>Hourglasses & Snuffed-out Candles:</strong> Symbols of the passage of time.</li>
          <li><strong>Musical Instruments & Books:</strong> Represent the ephemeral nature of worldly pursuits and knowledge.</li>
          <li><strong>Peeled Lemons:</strong> Beautiful to look at but sour to the taste, a symbol that things are not always what they seem.</li>
        </ul>
        <p>
          These artworks were a reflection of the devout Calvinist society of the Dutch Golden Age. They served as a subtle, yet constant, reminder to the wealthy merchant class that their earthly riches were temporary and that they should focus on their spiritual salvation. So, the next time you admire a Dutch still life, take a moment to read the stories hidden within the details.
        </p>
      </div>
    ),
  },
];
