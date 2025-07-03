// FAQSection.jsx
import React from 'react';
import './FAQSection.css';

const faqs = [
  {
    question: 'How do I create my wedding website?',
    answer:
      'From your free Nyouta account, Click on Wedding Website. Creating your wedding website is simple! Choose a template, customize it with your details, and publish it. No technical skills are required.',
  },
  {
    question: 'What information can I include on my website?',
    answer:
      'You can add all your wedding details: event schedules, venue maps, dress codes, travel and accommodation information, love story, photo gallery, RSVP forms, and more!',
  },
  {
    question: 'Can I customize the look of my website?',
    answer:
      'Absolutely! You can choose a template that fits your wedding style, and customize colors, fonts, and layout to match your theme.',
  },
  {
    question: 'How can I collect RSVPs from my guests?',
    answer:
      'Guests can easily RSVP through your website, choosing which events they’ll attend and providing meal preferences. The responses are automatically synced with your guest list.',
  },
  {
    question: 'Can I add multiple wedding events?',
    answer:
      'Yes! You can add multiple events like Haldi, Mehndi, Sangeet, Reception, and more, with different details for each.',
  },
  {
    question: 'How can guests send greetings and wishes?',
    answer:
      'Guests can leave their blessings, congratulations, and messages directly on your website. It’s a beautiful keepsake for you to cherish!',
  },
  {
    question: 'Is the website mobile-friendly?',
    answer:
      'Yes, your wedding website will look great and be easy to navigate on both mobile phones and desktops.',
  },
  {
    question: "Can I update my wedding website after it's published?",
    answer:
      'Yes! You can make changes and updates to your website anytime—whether it’s a change in timing, venue, or other important details.',
  },
  {
    question: 'Can I password-protect my website?',
    answer:
      'Yes, you can secure your website with a password to ensure only your invited guests can access it.',
  },
  {
    question: 'Do I need to pay for a wedding website?',
    answer:
      'We offer both free and premium options. The free version includes essential features, while the premium version provides more customization, storage, and extra features.',
  },
  {
    question: 'Can I link my wedding registry to the website?',
    answer:
      'Yes, you can easily link your gift registry to your wedding website, allowing guests to view and purchase gifts.',
  },
  {
    question: 'Can my guests access the website after the wedding?',
    answer:
      'Yes, your guests can access the website even after the wedding. It’s a great place to share wedding photos, videos, and memories.',
  },
  {
    question: 'How do I track RSVPs and guest responses?',
    answer:
      'Your wedding website automatically tracks RSVPs, meal choices, and other guest responses. You can easily manage your guest list from your website dashboard.',
  },
  {
    question: 'Can I share the website on social media?',
    answer:
      'Yes, you can share your website link on social media platforms, making it easy for friends and family to stay updated and RSVP.',
  },
  {
    question: 'Can I add photos or videos to the website?',
    answer:
      'Absolutely! You can add photos from your engagement, pre-wedding events, and any videos you want to share with your guests.',
  },
];

const FAQSection = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <p className="faq-subtitle">Wedding website questions? We’re here to help.</p>

      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <p className="faq-question">• <strong>{faq.question}</strong></p>
            <p className="faq-answer">{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQSection;
