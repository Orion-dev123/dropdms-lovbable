
import { Conversation } from '@/utils/messageUtils';

// Sample conversation data with messages
export const conversationsData: Conversation[] = [
  {
    id: 1,
    username: 'johndoe',
    name: 'John Doe',
    platform: 'Instagram',
    lastMessage: 'Thanks for reaching out! I\'d be interested in learning more.',
    time: '2 hours ago',
    unread: true,
    avatar: null,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Hi John, I noticed your work and wanted to connect! 👋',
        time: '2023-09-01T10:30:00',
        status: 'read',
      },
      {
        id: 2,
        sender: 'contact',
        content: 'Hey there! Thanks for reaching out. What can I help you with?',
        time: '2023-09-01T10:35:00',
        status: 'read',
      },
      {
        id: 3,
        sender: 'user',
        content: 'I wanted to discuss a potential collaboration for our upcoming project. We\'re looking for someone with your expertise.',
        time: '2023-09-01T10:40:00',
        status: 'read',
      },
      {
        id: 4,
        sender: 'contact',
        content: 'That sounds interesting! I\'d be happy to learn more about it.',
        time: '2023-09-01T10:45:00',
        status: 'read',
      },
      {
        id: 5,
        sender: 'contact',
        content: 'Could you share some details about the project?',
        time: '2023-09-01T10:46:00',
        status: 'read',
      },
    ],
  },
  {
    id: 2,
    username: 'janesmith',
    name: 'Jane Smith',
    platform: 'Twitter',
    lastMessage: 'When would be a good time to schedule a call?',
    time: '3 hours ago',
    unread: false,
    avatar: null,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Hello Jane, I saw your profile and thought we might be able to collaborate.',
        time: '2023-09-02T09:15:00',
        status: 'read',
      },
      {
        id: 2,
        sender: 'contact',
        content: 'Hi there! Thanks for the message. What kind of collaboration did you have in mind?',
        time: '2023-09-02T09:20:00',
        status: 'read',
      },
      {
        id: 3,
        sender: 'user',
        content: 'We\'re launching a new product and looking for influencers to help promote it.',
        time: '2023-09-02T09:25:00',
        status: 'read',
      },
      {
        id: 4,
        sender: 'contact',
        content: 'That sounds interesting! When would be a good time to schedule a call?',
        time: '2023-09-02T09:30:00',
        status: 'read',
      },
    ],
  },
  {
    id: 3,
    username: 'robertjohnson',
    name: 'Robert Johnson',
    platform: 'LinkedIn',
    lastMessage: 'Hello, I received your message about the collaboration.',
    time: '1 day ago',
    unread: false,
    avatar: null,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Hi Robert, I noticed your LinkedIn profile and thought you might be interested in our new product.',
        time: '2023-09-03T14:10:00',
        status: 'read',
      },
      {
        id: 2,
        sender: 'contact',
        content: 'Hello, I received your message about the collaboration.',
        time: '2023-09-03T14:30:00',
        status: 'read',
      },
    ],
  },
  {
    id: 4,
    username: 'sarahwilson',
    name: 'Sarah Wilson',
    platform: 'Instagram',
    lastMessage: 'I\'m not interested at the moment, but thank you.',
    time: '2 days ago',
    unread: false,
    avatar: null,
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Hello Sarah, I saw your Instagram and thought you might be interested in our collaboration.',
        time: '2023-09-04T11:05:00',
        status: 'read',
      },
      {
        id: 2,
        sender: 'contact',
        content: 'Hi there, thanks for reaching out.',
        time: '2023-09-04T11:15:00',
        status: 'read',
      },
      {
        id: 3,
        sender: 'user',
        content: 'We're offering a 20% commission on all sales through your custom link.',
        time: '2023-09-04T11:20:00',
        status: 'read',
      },
      {
        id: 4,
        sender: 'contact',
        content: 'I\'m not interested at the moment, but thank you.',
        time: '2023-09-04T11:30:00',
        status: 'read',
      },
    ],
  },
];

// Sample data for scheduled messages
export const scheduledMessagesData = [
  {
    id: 1,
    content: 'Hey {first_name}, just following up on our conversation!',
    recipients: 15,
    scheduledFor: '2023-09-10T14:30:00',
    platform: 'Instagram',
  },
  {
    id: 2,
    content: 'Hi {first_name}, I wanted to invite you to our exclusive webinar.',
    recipients: 50,
    scheduledFor: '2023-09-15T10:00:00',
    platform: 'LinkedIn',
  },
];
