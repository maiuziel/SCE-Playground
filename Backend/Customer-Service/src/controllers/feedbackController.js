import { Feedback } from '../data-access/feedback.model.js';
import { Notification } from '../data-access/notification.model.js';

export async function submitFeedback(req, res) {
  const { rating, comment, supportRequestId } = req.body;

  try {
    await Feedback.create({ rating, comment, supportRequestId });

    await Notification.update(
      { read: true },
      { where: { supportRequestId, type: 'feedback_prompt' } }
    );

    await Notification.create({
      type: 'new_feedback',
      supportRequestId,
      message: `⭐ לקוח דירג את הבקשה מספר ${supportRequestId}`,
      rating,    
      comment,   
      read: false
    });

    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
}

export async function getUnreadFeedbackNotifications(req, res) {
  try {
    const notifications = await Notification.findAll({
      where: { type: 'new_feedback', read: false },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (err) {
    console.error('Failed to fetch feedback notifications:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
}

export async function markFeedbackNotificationAsRead(req, res) {
  const { id } = req.params;

  try {
    await Notification.update({ read: true }, { where: { id } });
    res.json({ message: 'Marked as read' });
  } catch (err) {
    console.error('Failed to mark feedback notification:', err);
    res.status(500).json({ message: 'Failed to update notification' });
  }
}
