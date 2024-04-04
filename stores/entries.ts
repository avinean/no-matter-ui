import type { EventEntity } from '~/types/entities'

export const useEntriesStore = defineStore('entries', () => {
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0) // Set the start time to 8:00 AM for example
  // const _endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0, 0) // Set the end time to 5:00 PM for example

  const events = ref<EventEntity[]>([
    {
      id: 1,
      title: 'Ботокс в сраку багато',
      start: startOfToday.toISOString(),
      lastName: 'Валя',
      firstName: 'Валя',
      phone: '0636461254',
      end: new Date(startOfToday.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
      description: 'Discuss project details with the client.',
      approved: true,
      beenPaid: false,
      createdAt: '20/10/2024',
      updatedAt: '20/10/2024',
    },
    {
      id: 1,
      title: 'Ботокс в сраку багато',
      start: startOfToday.toISOString(),
      lastName: 'Валя',
      firstName: 'Валя',
      phone: '0636461254',
      end: new Date(startOfToday.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
      description: 'Discuss project details with the client.',
      approved: true,
      beenPaid: false,
      createdAt: '20/10/2024',
      updatedAt: '20/10/2024',
    },
    {
      id: 1,
      title: 'Ботокс в сраку багато',
      start: startOfToday.toISOString(),
      lastName: 'Валя',
      firstName: 'Валя',
      phone: '0636461254',
      end: new Date(startOfToday.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
      description: 'Discuss project details with the client.',
      approved: true,
      beenPaid: false,
      createdAt: '20/10/2024',
      updatedAt: '20/10/2024',
    },
    {
      id: 1,
      title: 'Ботокс в сраку багато',
      start: startOfToday.toISOString(),
      lastName: 'Валя',
      firstName: 'Валя',
      phone: '0636461254',
      end: new Date(startOfToday.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
      description: 'Discuss project details with the client.',
      approved: true,
      beenPaid: false,
      createdAt: '20/10/2024',
      updatedAt: '20/10/2024',
      allDay: true,
    },
    {
      id: 1,
      title: 'Ботокс в сраку багато',
      start: startOfToday.toISOString(),
      lastName: 'Валя',
      firstName: 'Валя',
      phone: '0636461254',
      end: new Date(startOfToday.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
      description: 'Discuss project details with the client.',
      approved: true,
      beenPaid: false,
      createdAt: '20/10/2024',
      updatedAt: '20/10/2024',
    },
    {
      id: 2,
      title: 'Губи для  качки',
      lastName: 'Галя',
      firstName: 'Галя',
      phone: '0636461254',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0).toISOString(), // 12:00 PM
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0, 0).toISOString(), // 1:00 PM
      description: 'Take a break and have lunch.',
      approved: false,
      beenPaid: false,
      createdAt: '20/10/2024',
      updatedAt: '20/10/2024',
    },
    {
      id: 2,
      title: 'Губи',
      lastName: 'Любезний',
      firstName: 'Владислав',
      phone: '0636461254',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0).toISOString(), // 12:00 PM
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0, 0).toISOString(), // 1:00 PM
      description: 'Take a break and have lunch.',
      approved: true,
      beenPaid: true,
      createdAt: '20/10/2024',
      updatedAt: '20/10/2024',
    },
  ])

  const addEvent = (event: EventEntity) => {
    events.value.push(event)
  }

  return {
    events,
    addEvent,
  }
})
