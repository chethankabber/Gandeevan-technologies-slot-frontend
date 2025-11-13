export const mockAdmin = {
  name: 'Admin User',
  email: 'admin@gmail.com',
};

export const mockContainers = [
  {
    id: '1',
    name: 'Rack C1',
    slots: [
      { slotNumber: 1, item: null },
      { slotNumber: 2, item: null },
      {
        slotNumber: 3,
        item: {
          id: '1',
          name: 'Laptop Dell XP5',
          status: 'occupied',
          takenBy: 'John Doe',
          takenDate: '2025-01-15',
          returnDate: '2025-01-20',
          isReturnable: true,
        },
      },
      { slotNumber: 4, item: null },
      { slotNumber: 5, item: null },
      {
        slotNumber: 6,
        item: {
          id: '2',
          name: 'iPad Pro',
          status: 'non-returnable',
          takenBy: 'Jane Smith',
          takenDate: '2025-01-10',
          returnDate: null,
          isReturnable: false,
        },
      },
      { slotNumber: 7, item: null },
      { slotNumber: 8, item: null },
      { slotNumber: 9, item: null },
      { slotNumber: 10, item: null },
      { slotNumber: 11, item: null },
      { slotNumber: 12, item: null },
    ],
  },
  {
    id: '2',
    name: 'Rack C2',
    slots: [
      {
        slotNumber: 1,
        item: {
          id: '3',
          name: 'MacBook Air',
          status: 'occupied',
          takenBy: 'Mike Johnson',
          takenDate: '2025-01-12',
          returnDate: '2025-01-18',
          isReturnable: true,
        },
      },
      { slotNumber: 2, item: null },
      { slotNumber: 3, item: null },
      { slotNumber: 4, item: null },
      { slotNumber: 5, item: null },
      {
        slotNumber: 6,
        item: {
          id: '4',
          name: 'Surface Pro',
          status: 'occupied',
          takenBy: 'Sarah Williams',
          takenDate: '2025-01-14',
          returnDate: '2025-01-19',
          isReturnable: true,
        },
      },
      { slotNumber: 7, item: null },
      { slotNumber: 8, item: null },
      { slotNumber: 9, item: null },
      { slotNumber: 10, item: null },
      { slotNumber: 11, item: null },
      {
        slotNumber: 12,
        item: {
          id: '5',
          name: 'Surface Pro',
          status: 'occupied',
          takenBy: 'Sarah Williams',
          takenDate: '2025-01-14',
          returnDate: '2025-01-19',
          isReturnable: true,
      }
    },
    ],
  },
  {
    id: '3',
    name: 'Rack C3',
    slots: [
      {
        slotNumber: 1,
        item: {
          id: '3',
          name: 'MacBook Air',
          status: 'occupied',
          takenBy: 'Mike Johnson',
          takenDate: '2025-01-12',
          returnDate: '2025-01-18',
          isReturnable: true,
        },
      },
      { slotNumber: 2, item: null },
      { slotNumber: 3, item: null },
      { slotNumber: 4, item: null },
      { slotNumber: 5, item: null },
      {
        slotNumber: 6,
        item: {
          id: '4',
          name: 'Surface Pro',
          status: 'occupied',
          takenBy: 'Sarah Williams',
          takenDate: '2025-01-14',
          returnDate: '2025-01-19',
          isReturnable: true,
        },
      },
      { slotNumber: 7, item: null },
      { slotNumber: 8, item: null },
      {
        slotNumber: 9,
        item: {
          id: '5',
          name: 'Surface Pro',
          status: 'occupied',
          takenBy: 'Sarah Williams',
          takenDate: '2025-01-14',
          returnDate: '2025-01-19',
          isReturnable: true,
        },
      },
      {
        slotNumber: 10,
        item: {
          id: '6',
          name: 'Surface Pro',
          status: 'occupied',
          takenBy: 'Sarah Williams',
          takenDate: '2025-01-14',
          returnDate: '2025-01-19',
          isReturnable: true,
        },
      },
      { slotNumber: 11, item: null },
      { slotNumber: 12, item: null }
    ],
  },
];

export const mockPendingUsers = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    registeredDate: '2025-01-10',
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    registeredDate: '2025-01-11',
  },
  {
    id: '3',
    name: 'Charlie',
    email: 'charlie@example.com',
    registeredDate: '2025-01-12',
  },

];


export const mockPermissionRequests = [
  {
    id: "101",
    userName: "Alice Johnson",
    userEmail: "alice@example.com",
    requestType: "Access Request",
    message: "Requesting permission to access Rack A12 for maintenance.",
    dateRequested: "2025-01-10",
    status: "Pending",
  },
  {
    id: "102",
    userName: "Bob Smith",
    userEmail: "bob@example.com",
    requestType: "Return Delay",
    message: "Requesting extension for returning items in Slot 5 by two days.",
    dateRequested: "2025-01-11",
    status: "Pending",
  },
  
];
