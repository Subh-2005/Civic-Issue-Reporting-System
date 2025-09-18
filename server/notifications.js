// Express backend for notifications
const express = require('express');
const router = express.Router();

// In-memory notifications (replace with DB in production)
let notifications = [
  {
    id: '1',
    title: 'New Issue Reported in Ward 5',
    description: 'Road damage reported by Citizen John Smith on MG Road',
    timestamp: '2 hours ago',
    status: 'unread',
    type: 'warning'
  },
  {
    id: '2',
    title: 'Issue Resolved - Street Light',
    description: 'Street light repair completed on Park Avenue, Ward 3',
    timestamp: '4 hours ago',
    status: 'unread',
    type: 'success'
  },
  // ... more notifications
];

// GET /api/notifications - fetch all notifications
router.get('/', (req, res) => {
  res.json(notifications);
});

// POST /api/notifications/:id/read - mark as read
router.post('/:id/read', (req, res) => {
  notifications = notifications.map(n => n.id === req.params.id ? { ...n, status: 'read' } : n);
  res.json({ success: true });
});

// POST /api/notifications/:id/unread - mark as unread
router.post('/:id/unread', (req, res) => {
  notifications = notifications.map(n => n.id === req.params.id ? { ...n, status: 'unread' } : n);
  res.json({ success: true });
});

// POST /api/notifications/readall - mark all as read
router.post('/readall', (req, res) => {
  notifications = notifications.map(n => ({ ...n, status: 'read' }));
  res.json({ success: true });
});

module.exports = router;
